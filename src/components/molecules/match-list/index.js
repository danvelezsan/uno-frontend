/* eslint-disable react/jsx-props-no-spreading */
// @packages
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import Typography from '@material-ui/core/Typography';
import {
    Grid,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    withStyles
} from '@material-ui/core';
import {
    setActiveMatch
} from '../../../actions';
import { useDispatch } from 'react-redux';

// @services
import Match from '../../../services/match';

// @styles
import styles from './styles';

const MatchList = ({ classes, socket, setStep }) => {
    const [matches, setMatches] = useState([]);

    const dispatch = useDispatch();

    const getMatches = async () => {
        let res = await Match.getAllNotStarted();
        setMatches(res);
        socket.on('recMatchList', data => {
            const existingMatchIndex = res.findIndex(match => match.id === data.id);
            if (existingMatchIndex !== -1) {
                if (data.started) {
                    res = res.filter(match => match.id !== data.id);
                } else {
                    res[existingMatchIndex] = data;
                }
            } else {
                res = [...res, data];
            }
            setMatches(res);
        });
    };

    const goToDetail = async (match) => {
        dispatch(
            setActiveMatch(match.id)
        );
    };

    useEffect(() => {
        getMatches();
    }, []);

    const handleOut = async () => {
        setStep(0);
    };

    return (
        <Grid container justify="center">
            <Paper
                className={classes.mainContainer}
                elevation={2}
                square
                component="form"
            >
                <Typography variant="h3" className={classes.fixed}>
                    Lista de Salas
                </Typography>
                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>
                                    <Typography variant="body1" className={classes.marginForm}>
                                        Nombre
                                    </Typography>
                                </TableCell>
                                <TableCell>
                                    <Typography variant="body1" className={classes.marginForm}>
                                        Jugadores Actuales/Minimo
                                    </Typography>
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {matches.map(match => match.players.length > 0 && (
                            <TableRow
                                key={match.id}
                                onClick={() => goToDetail(match)}
                            >
                                <TableCell>
                                    <Typography variant="body1" className={classes.marginForm}>
                                        {`Sala ${match?.id}`}
                                    </Typography>
                                </TableCell>
                                <TableCell>
                                    <Typography variant="body1" className={classes.marginForm}>
                                    {match?.players.length}
                                    /
                                    {match?.requiredPlayers}
                                    </Typography>
                                </TableCell>
                            </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                <Button
                    className={classes.loginButton}
                    color="primary"
                    variant="contained"
                    onClick={() => handleOut()}
                >
                    <Typography classes={{ body1: classes.bold }} variant="body1">
                        Salir
                    </Typography>
                </Button>
            </Paper>
        </Grid>
    );
};

MatchList.propTypes = {
    classes: PropTypes.object.isRequired,
    socket: PropTypes.object.isRequired,
    setStep: PropTypes.func.isRequired
};

export default withStyles(styles)(MatchList);
