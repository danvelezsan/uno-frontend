import Security from '../services/security';

// @constants
export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';

/**
 * @param {string} authToken
 * @param {string} email
 * @param {string} name
 */
export const login = ({
    name,
    password
}) => async (dispatch) => {
    const user = await Security.login(name, password);
    user.user.permissions = ['Dashboard'];

    dispatch({
        type: LOGIN,
        payload: user.user
    });

    return user.user;
};

export const logout = () => ({
    type: LOGOUT
});
