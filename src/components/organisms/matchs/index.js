/* eslint-disable react/jsx-props-no-spreading */
// @packages
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import Typography from '@material-ui/core/Typography';
import { Grid, withStyles } from '@material-ui/core';

// @molecules
import CreateMatchForm from '../../molecules/create-match-form';
import MatchList from '../../molecules/match-list';

// @styles
import styles from './styles';

const Matchs = ({ classes, socket }) => {
    const [step, setStep] = useState(0);

    return (
        <>
            {step === 0 && (
            <Grid container justify="center">
                <Paper
                    className={classes.mainContainer}
                    elevation={2}
                    square
                >
                    <Button
                        className={classes.loginButton}
                        color="primary"
                        variant="contained"
                        type="submit"
                        onClick={() => setStep(1)}
                    >
                        <Typography classes={{ body1: classes.bold }} variant="body1">
                            Crear Sala
                        </Typography>
                    </Button>
                    <Button
                        className={classes.loginButton}
                        color="primary"
                        variant="contained"
                        type="submit"
                        onClick={() => setStep(2)}
                    >
                        <Typography classes={{ body1: classes.bold }} variant="body1">
                            Listar Salas
                        </Typography>
                    </Button>
                </Paper>
            </Grid>
            )}
            {step === 1 && (
                <CreateMatchForm socket={socket} setStep={setStep} />
            )}
            {step === 2 && (
                <MatchList socket={socket} setStep={setStep} />
            )}
        </>
    );
};

Matchs.propTypes = {
    classes: PropTypes.object.isRequired,
    socket: PropTypes.object.isRequired
};

export default withStyles(styles)(Matchs);
