// @scripts
import {
    RESET_ACTIVE_MATCH,
    SET_ACTIVE_MATCH
} from '../actions';

const initialState = {
    matchId: 0
};

/**
 * @return {{
 *  matchId: number
 * }}
 */
const activeMatchReducer = (
    state = initialState,
    action
) => {
    switch (action.type) {
        case SET_ACTIVE_MATCH:
            return {
                ...state,
                matchId: action.matchId
            };
        case RESET_ACTIVE_MATCH:
            return {
                ...initialState
            };
        default:
            return state;
    }
};

export { activeMatchReducer };
