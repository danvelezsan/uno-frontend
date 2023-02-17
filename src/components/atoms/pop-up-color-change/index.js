import React from 'react';
import { Controller } from 'react-hook-form';
import PropTypes from 'prop-types';

import {
    Button,
    Dialog,
    DialogContent,
    FormControl,
    Grid,
    MenuItem,
    Select,
    Typography,
    withStyles
} from '@material-ui/core';

// @constants
import { config } from '../../../config';

// @styles
import styles from './styles';

const texts = config.text.language;

const PopUpPayment = ({
    classes,
    open
}) => (
    <>
            <Dialog
                BackdropProps={{ style: { backgroundColor: 'rgb(0, 0, 0, 0.04)' } }}
                aria-labelledby="max-width-dialog-title"
                id="modal-table-royalties"
                onClose={(_, reason) => {
                    if (reason !== 'backdropClick') {
                        handleClose();
                    }
                }}
                open={open}
                PaperProps={{
                    style: {
                        overflow: 'inherit',
                        background: '#FFFCF5',
                        boxShadow: 'none',
                        filter: 'drop-shadow(0px 0px 16px rgba(0, 0, 0, 0.25))'
                    }
                }}
                rounded="false"
            >
                <DialogContent>
                    <Grid
                        alignItems="left"
                        aria-labelledby="content-popUp"
                        className={classes.history}
                        container
                        direction="column"
                        justifyContent="start"
                        spacing={2}
                    >
                        <Grid item xs={12} className={classes.titleContainer}>
                            <Typography variant="h3" className={classes.title}>
                                Selecciona un color
                            </Typography>
                        </Grid>
                        <Grid item>
                                        <FormControl className={classes.form} variant="standard">
                                            <Typography
                                                variant="body1"
                                                className={classes.titleList}
                                            >
                                                {texts.payment.creditType}
                                            </Typography>
                                            <Controller
                                                name="rating"
                                                control={control}
                                                shouldUnregister
                                                defaultValue=""
                                                render={({ field: { value, onChange } }) => (
                                                    <Select
                                                        variant="outlined"
                                                        type="text"
                                                        displayEmpty
                                                        value={value}
                                                        onChange={(e) => {
                                                            const { value: newValue } = e.target;
                                                            onChange(newValue);
                                                        }}
                                                        renderValue={(selected) => {
                                                            const selectedRating = ratings.find(i => selected === i.id);
                                                            setRating(selectedRating);
                                                            return selectedRating ? (
                                                                <Typography className={classes.textSelectRating}>
                                                                    $
                                                                    {selectedRating?.id === 2 ? texts.payment.PaymentType2 : texts.payment.PaymentType3}
                                                                </Typography>
                                                            ) : (
                                                                <Typography className={classes.text}>
                                                                    {texts.common.selectField}
                                                                </Typography>
                                                            );
                                                        }}
                                                    >
                                                        <MenuItem value="" disabled>
                                                            {texts.common.selectField}
                                                        </MenuItem>
                                                        {ratings.map((option) => (
                                                            <MenuItem key={option.id} value={option.id}>
                                                                <Typography className={classes.textSelectRating}>
                                                                    $
                                                                    {option?.id === 2 ? texts.payment.PaymentType2 : texts.payment.PaymentType3}
                                                                </Typography>
                                                            </MenuItem>
                                                        ))}
                                                    </Select>
                                                )}
                                            />
                                        </FormControl>
                        </Grid>
                        <Grid container spacing={3} direction="column" item>
                            <Grid container>
                                <Grid
                                    aria-label="save and cancel buttons"
                                    className={classes.buttonContainer}
                                    container
                                    item
                                >
                                    <Button
                                        className={classes.button}
                                        type="submit"
                                        variant="contained"
                                    >
                                        <Typography classes={{ body1: classes.buttons }}>
                                            Aceptar
                                        </Typography>
                                    </Button>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </DialogContent>
            </Dialog>
    </>
);

PopUpPayment.propTypes = {
    classes: PropTypes.object.isRequired,
    open: PropTypes.bool.isRequired
};

export default withStyles(styles)(PopUpPayment);
