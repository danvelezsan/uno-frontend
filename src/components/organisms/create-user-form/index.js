/* eslint-disable react/jsx-props-no-spreading */
// @packages
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import Typography from '@material-ui/core/Typography';
import { FormControl, FormHelperText, withStyles } from '@material-ui/core';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { globalUI } from '../../../core';

// @styles
import styles from './styles';

// @Form
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

// @services
import Security from '../../../services/security';

const schema = yup.object().shape({
    name: yup.string().required('requerido'),
    password: yup.string().required('requerido'),
    email: yup.string().required('requerido').email()
});

const LoginForm = ({ classes, id, setStep }) => {
    const [values, setValues] = useState({
        showPassword: false
    });

    const {
        control, handleSubmit, formState: { errors }
    } = useForm({
        mode: 'onChange',
        resolver: yupResolver(schema)
    });

    const handleClickShowPassword = () => {
        setValues({ showPassword: !values.showPassword });
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const onSubmit = async (data) => {
        await Security.register(data);
        globalUI.showAlertNotificationSuccess(
            'Usuario registrado exitosamente'
        );
        setStep(0);
    };

    return (
        <Paper
            className={classes.mainContainer}
            elevation={2}
            id={id}
            square
            component="form"
            onSubmit={handleSubmit(onSubmit)}
        >
            <Typography variant="h3" className={classes.fixed}>
                Crear Usuario
            </Typography>
            <FormControl className={classes.form} variant="standard" fullWidth>
                <Typography variant="body1" className={classes.marginForm}>
                    Usuario
                </Typography>
                <Controller
                    name="name"
                    control={control}
                    shouldUnregister
                    defaultValue=""
                    render={({ field }) => (
                        <OutlinedInput
                            id="outlined-adornment-user"
                            type="text"
                            placeholder="Ejemplo123"
                            {...field}
                        />
                    )}
                />
                {errors.name && (
                    <FormHelperText error>{errors.name?.message}</FormHelperText>
                )}
            </FormControl>
            <FormControl className={classes.form} variant="standard">
                <Typography variant="body1" className={classes.marginForm}>
                    Contraseña
                </Typography>
                <Controller
                    name="password"
                    control={control}
                    shouldUnregister
                    defaultValue=""
                    render={({ field }) => (
                        <OutlinedInput
                            id="outlined-adornment-password"
                            type={values.showPassword ? 'text' : 'password'}
                            placeholder="************"
                            {...field}
                            endAdornment={(
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowPassword}
                                        onMouseDown={handleMouseDownPassword}
                                        edge="end"
                                    >
                                        {values.showPassword ? <Visibility /> : <VisibilityOff />}
                                    </IconButton>
                                </InputAdornment>
                            )}
                        />
                    )}
                />
                {errors.password && (
                    <FormHelperText error>{errors.password?.message}</FormHelperText>
                )}
            </FormControl>
            <FormControl className={classes.form} variant="standard" fullWidth>
                <Typography variant="body1" className={classes.marginForm}>
                    Correo
                </Typography>
                <Controller
                    name="email"
                    control={control}
                    shouldUnregister
                    defaultValue=""
                    render={({ field }) => (
                        <OutlinedInput
                            id="outlined-adornment-user"
                            type="email"
                            placeholder="Ejemplo123@gmail.com"
                            {...field}
                        />
                    )}
                />
                {errors.email && (
                    <FormHelperText error>{errors.email?.message}</FormHelperText>
                )}
            </FormControl>
            <Button
                className={classes.loginButton}
                color="primary"
                variant="contained"
                type="submit"
            >
                <Typography classes={{ body1: classes.bold }} variant="body1">
                    Registrar
                </Typography>
            </Button>
            <Button
                className={classes.loginButton}
                color="primary"
                onClick={() => setStep(0)}
            >
                <Typography classes={{ body1: classes.bold }} variant="body1">
                    Volver
                </Typography>
            </Button>
        </Paper>
    );
};

LoginForm.propTypes = {
    classes: PropTypes.object.isRequired,
    id: PropTypes.string.isRequired,
    setStep: PropTypes.func.isRequired
};

LoginForm.defaultProps = {};

export default withStyles(styles)(LoginForm);
