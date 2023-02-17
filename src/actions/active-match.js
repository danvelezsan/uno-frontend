// @constants
export const RESET_ACTIVE_MATCH = 'RESET_ACTIVE_MATCH';
export const SET_ACTIVE_MATCH = 'SET_ACTIVE_MATCH';

export const setActiveMatch = (matchId) => (dispatch) => {
    dispatch({
        type: SET_ACTIVE_MATCH,
        matchId
    });
};

export const resetActiveMatch = () => (dispatch) => {
    dispatch({
        type: RESET_ACTIVE_MATCH
    });
};
