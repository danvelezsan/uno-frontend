/* eslint-disable react/jsx-props-no-spreading */
// @packages
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import PropTypes from 'prop-types';
import React from 'react';
import Typography from '@material-ui/core/Typography';
import {
    FormControl, FormHelperText, Grid, withStyles
} from '@material-ui/core';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import {
    setActiveMatch
} from '../../../actions';

// @styles
import styles from './styles';

// @services
import Match from '../../../services/match';

// @Form
import OutlinedInput from '@material-ui/core/OutlinedInput';

const schema = yup.object().shape({
    numberOfPlayers: yup.number().required('requerido').min(2, 'la partida debe tener un minimo de 2 jugadores')
        .max(10, 'la partida debe tener un maximo de 10 jugadores')
});

const CreateMatchForm = ({ classes, socket, setStep }) => {
    const {
        control, handleSubmit, formState: { errors }
    } = useForm({
        mode: 'onChange',
        resolver: yupResolver(schema)
    });

    const userId = useSelector(state => state?.user?.account?.id);

    const dispatch = useDispatch();

    const onSubmit = async (data) => {
        const res = await Match.create(userId, data.numberOfPlayers);
        socket.emit('addMatch', res);
        dispatch(
            setActiveMatch(res?.id)
        );
    };

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
                onSubmit={handleSubmit(onSubmit)}
            >
                <Typography variant="h3" className={classes.fixed}>
                    Crear Sala
                </Typography>
                <FormControl className={classes.form} variant="standard" fullWidth>
                    <Typography variant="body1" className={classes.marginForm}>
                        Numero de Jugadores
                    </Typography>
                    <Controller
                        name="numberOfPlayers"
                        control={control}
                        shouldUnregister
                        defaultValue=""
                        render={({ field }) => (
                            <OutlinedInput
                                id="outlined-adornment-user"
                                type="number"
                                {...field}
                            />
                        )}
                    />
                    {errors.numberOfPlayers && (
                        <FormHelperText error>{errors.numberOfPlayers?.message}</FormHelperText>
                    )}
                </FormControl>
                <Button
                    className={classes.loginButton}
                    color="primary"
                    variant="contained"
                    type="submit"
                >
                    <Typography classes={{ body1: classes.bold }} variant="body1">
                        Crear
                    </Typography>
                </Button>
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

CreateMatchForm.propTypes = {
    classes: PropTypes.object.isRequired,
    socket: PropTypes.object.isRequired,
    setStep: PropTypes.func.isRequired
};

CreateMatchForm.defaultProps = {};

export default withStyles(styles)(CreateMatchForm);
