/* eslint-disable react/jsx-props-no-spreading */
// @packages
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import Typography from '@material-ui/core/Typography';
import { Box, Grid, withStyles } from '@material-ui/core';
import { useHistory } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import {
    resetActiveMatch
} from '../../../actions';

// @services
import Match from '../../../services/match';

// @styles
import styles from './styles';

const MatchDetail = ({ classes, socket }) => {
    const [actualMatch, setActualMatch] = useState();
    const [actualPlayer, setActualPlayer] = useState({});
    const history = useHistory();

    const userId = useSelector(state => state?.user?.account?.id);
    const matchId = useSelector(state => state?.activeMatch?.matchId);

    const [tookCardInTurn, setTookCardInTurn] = useState(false);
    const [threwCardInTurn, setThrewCardInTurn] = useState(false);
    const [newMatchEffect, setNewMatchEffect] = useState('');

    const hiddenDeck = actualMatch?.cards?.filter(card => !card.visible);
    const visibleDeck = actualMatch?.cards?.filter(card => card.visible);
    const isActualPlayerTurn = actualPlayer?.id === actualMatch?.turnPlayerId;

    const isDeckClickable = isActualPlayerTurn && !tookCardInTurn;
    const isCardClickable = isActualPlayerTurn && !threwCardInTurn;

    const translateColor = () => {
        const colors = {
            blue: 'Azul', red: 'Rojo', yellow: 'Amarillo', green: 'Verde'
        };
        return colors[actualMatch?.actualColor];
    };

    const dispatch = useDispatch();

    const getMatch = async () => {
        const res = await Match.findOne(matchId);
        setActualMatch(res);
        const userInMatch = res.players.find(player => player.user.id === userId);
        if (!res.started && !userInMatch) { socket.emit('addPlayer', { userId, match: res }); }
        socket.on(`recMatch/${res.id}`, data => {
            setTookCardInTurn(false);
            setThrewCardInTurn(false);
            setNewMatchEffect('');
            setActualMatch(data);
        });
    };

    useEffect(() => {
        getMatch();
    }, []);

    useEffect(() => {
        const userInMatch = actualMatch?.players.find(player => player.user.id === userId);
        if (userInMatch) {
            setActualPlayer(userInMatch);
        }
    }, [actualMatch]);

    useEffect(() => {
        if (tookCardInTurn && threwCardInTurn) {
            socket.emit('play', { ...actualMatch, actualEffect: newMatchEffect });
        }
    }, [tookCardInTurn, threwCardInTurn]);

    const handleOut = async () => {
        socket.emit('removePlayer', { playerId: actualPlayer?.id, match: actualMatch });
        dispatch(
            resetActiveMatch()
        );
        history.push('/dashboard');
    };

    const onClickCard = (cardToThrow) => {
        if (isCardClickable) {
            if (cardToThrow.cardType.color === actualMatch?.actualColor || cardToThrow.cardType.color === 'black' || cardToThrow.cardType.value === visibleDeck[visibleDeck.length - 1].cardType.value) {
                cardToThrow.playerId = null;
                cardToThrow.visible = true;
                actualMatch.cards.push(cardToThrow);
                actualPlayer.cards = actualPlayer.cards.filter(card => card.id !== cardToThrow.id);
                visibleDeck[visibleDeck.length - 1].visible = false;
                setActualMatch({ ...actualMatch });
                setActualPlayer({ ...actualPlayer });
                if (cardToThrow.cardType.value === '+2' || cardToThrow.cardType.value === 'reverse' || cardToThrow.cardType.value === 'skip') {
                    setNewMatchEffect(cardToThrow.cardType.value);
                } else if (cardToThrow.cardType.value === '+4') {
                    setNewMatchEffect(cardToThrow.cardType.value);
                } else if (cardToThrow.cardType.value === 'changeColor') {
                    setNewMatchEffect(cardToThrow.cardType.value);
                }
                setTookCardInTurn(true);
                setThrewCardInTurn(true);
            }
        }
    };

    const onClickDeck = () => {
        if (isDeckClickable) {
            const cardToTake = hiddenDeck[hiddenDeck.length - 1];
            cardToTake.playerId = actualMatch?.turnPlayerId;
            cardToTake.visible = false;
            actualPlayer.cards.push(cardToTake);
            actualMatch.cards = actualMatch.cards.filter(card => card.id !== cardToTake.id);
            setActualMatch({ ...actualMatch });
            setActualPlayer({ ...actualPlayer });
            setTookCardInTurn(true);
        }
    };

    const handleMatchEffect = () => {
        const effect = actualMatch?.actualEffect;
        if (effect === '+2') {
            if (actualPlayer?.cards.find(card => card.cardType.value === '+2' || card.cardType.value === '+4')) {
                setTookCardInTurn(true);
            } else {
                onClickDeck();
                onClickDeck();
            }
        } else if (effect === '+4') {
            if (actualPlayer?.cards.find(card => card.cardType.value === '+4')) {
                setTookCardInTurn(true);
            } else {
                onClickDeck();
                onClickDeck();
                onClickDeck();
                onClickDeck();
            }
        }
    };

    useEffect(() => {
        if (Object.keys(actualPlayer).length > 0) {
            if (actualMatch?.started && isActualPlayerTurn && !tookCardInTurn && !threwCardInTurn && actualMatch?.actualEffect && !newMatchEffect) {
                handleMatchEffect();
            }
        }
    }, [actualPlayer]);

    const getCardImage = (card) => `${process.env.PUBLIC_URL}/cards/${card?.cardType?.color}/${card?.cardType?.value}.png`;

    return (
        <>
            {actualMatch && !actualMatch.started && (
            <Grid container justify="center">
                <Paper
                    className={classes.mainContainer}
                    elevation={2}
                    square
                    component="form"
                >
                    <Typography variant="h3" className={classes.fixed}>
                        {`Sala ${actualMatch?.id}`}
                    </Typography>
                    <Grid container justify="space-between">
                        <Typography variant="body1" className={classes.marginForm}>
                            Numero de Jugadores
                        </Typography>
                        <Typography variant="body1" className={classes.marginForm}>
                            {actualMatch?.players.length}
                            /
                            {actualMatch?.requiredPlayers}
                        </Typography>
                    </Grid>
                    <Button
                        className={classes.loginButton}
                        color="primary"
                        variant="contained"
                        disabled={!actualPlayer}
                        onClick={() => handleOut()}
                    >
                        <Typography classes={{ body1: classes.bold }} variant="body1">
                            Salir
                        </Typography>
                    </Button>
                </Paper>
            </Grid>
            )}
            {actualMatch && actualMatch.started && (
                <>
                    <Grid container justify="space-between">
                        <Grid item>
                            <Grid container direction="row" spacing={1}>
                                <Grid item>
                                    <Typography>
                                        Jugador actual
                                    </Typography>
                                    <Typography>
                                        Color actual
                                    </Typography>
                                    <Typography>
                                        Jugadores
                                    </Typography>
                                    {actualMatch?.players?.map((player) => (
                                        <Typography key={player.id}>
                                            {player?.user?.name}
                                        </Typography>
                                    ))}
                                </Grid>
                                <Grid item>
                                    <Typography>
                                        {actualMatch?.players.find(player => player.id === actualMatch?.turnPlayerId)?.user?.name || 'ninguno'}
                                    </Typography>
                                    <Typography>
                                        {translateColor()}
                                    </Typography>
                                    <Typography>
                                        Cartas Restantes
                                    </Typography>
                                    {actualMatch?.players?.map((player) => (
                                        <Typography key={player.id}>
                                            {player?.cards?.length}
                                        </Typography>
                                    ))}
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item>
                            <Grid container justify="flex-end" spacing={1}>
                            {hiddenDeck?.length > 0 && (
                                <Grid item xs={2}>
                                    <Grid container direction="column">
                                        <Grid item>
                                            <Typography>
                                                Mazo
                                            </Typography>
                                        </Grid>
                                        <Grid item>
                                            <Box
                                                onClick={() => onClickDeck()}
                                            >
                                                <img
                                                    className={isDeckClickable ? classes.clickableCard : classes.unClickableCard}
                                                    src={`${process.env.PUBLIC_URL}/cards/back.png`}
                                                    alt=""
                                                />
                                            </Box>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            )}
                            {visibleDeck?.length > 0 && (
                                <Grid item xs={2}>
                                    <Grid container direction="column">
                                        <Grid item>
                                            <Typography>
                                                Cartas Tiradas
                                            </Typography>
                                        </Grid>
                                        <Grid item>
                                            <img
                                                className={classes.card}
                                                src={getCardImage(visibleDeck[visibleDeck.length - 1])}
                                                alt=""
                                            />
                                        </Grid>
                                    </Grid>
                                </Grid>
                            )}
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid container>
                        <Typography>
                            Tus Cartas
                        </Typography>
                    </Grid>
                    <Grid container spacing={1}>
                        {actualPlayer?.cards?.map((card) => (
                            <Grid
                                item
                                xs={1}
                                key={card.id}
                            >
                                <Box
                                    onClick={() => onClickCard(card)}
                                >
                                    <img
                                        className={isCardClickable ? classes.clickableCard : classes.unClickableCard}
                                        src={getCardImage(card)}
                                        alt=""
                                    />
                                </Box>
                            </Grid>
                        ))}
                    </Grid>
                </>
            )}
        </>
    );
};

MatchDetail.propTypes = {
    classes: PropTypes.object.isRequired,
    socket: PropTypes.object.isRequired
};

export default withStyles(styles)(MatchDetail);
