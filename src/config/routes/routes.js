// @packages
import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect, Route, Switch } from 'react-router-dom';

// @scripts
import DashBoard from '../../pages/dashboard';
import Login from '../../pages/login';
import routes from './routes.json';

const componentMapper = {
    DashBoard,
    Login
};

const Routes = () => {
    const { authToken, permissions } = useSelector(state => state.user.account);
    const checkPermission = (route) => route.permissions?.every(
        permissionRequired => permissions?.includes(permissionRequired)
    );

    const isLoggedIn = authToken?.length && permissions?.length;

    return (
        <Switch>
            {Object.values(routes).map((route) => (
                checkPermission(route) && (
                    <Route
                        key={route.name}
                        path={route.url}
                        component={componentMapper[route.component]}
                    />
                )
            ))}
            <Redirect
                from="/"
                to={isLoggedIn ? routes.home.url : routes.login.url}
            />
        </Switch>
    );
};

export default Routes;
