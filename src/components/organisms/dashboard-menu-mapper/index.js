// @packages
import PropTypes from 'prop-types';
import React from 'react';
import Typography from '@material-ui/core/Typography';
import { Route, Switch } from 'react-router-dom';
import { withStyles } from '@material-ui/core';
import MatchDetail from '../match-detail';
import Matchs from '../matchs';
import socketIOClient from 'socket.io-client';

// @styles
import styles from './styles';

const ENDPOINT = config.settings.services.api;

const socket = socketIOClient(ENDPOINT);

/** Create Organisms for these components, or templates/pages */
// eslint-disable-next-line react/prop-types

const Component1 = () => <Matchs socket={socket} />;
const Component2 = () => <MatchDetail socket={socket} />;

const componentMapper = {
    Component1,
    Component2
};

const MenuContent = ({
    classes,
    id,
    visible
}) => {
    if (!visible) {
        return null;
    }

    return (
        <div
            className={classes.mainContainer}
            id={id}
        >
            <Switch>
                {Object.values(config.routes.dashboard).map(route => (
                    <Route
                        component={componentMapper[route.component]}
                        exact
                        key={`route-${route.name}`}
                        path={route.url}
                    />
                ))}
                <Route path="/dashboard/*">
                    <Typography>{config.text.notFoundPage.content}</Typography>
                </Route>
            </Switch>
        </div>
    );
};

MenuContent.propTypes = {
    classes: PropTypes.object.isRequired,
    id: PropTypes.string.isRequired,
    visible: PropTypes.bool
};

MenuContent.defaultProps = {
    visible: true
};

export default withStyles(styles)(MenuContent);
