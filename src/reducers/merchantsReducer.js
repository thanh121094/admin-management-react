import * as types from '../actions/actionTypes';
import initialState from '../store/initialState';

export default function merchantsReducer(state = initialState.merchants, action) {
    switch (action.type) {
        case types.SET_MERCHANTS:
            return action.merchants;
        case types.ADD_MERCHANT:
            return [
                ...state,
                Object.assign({}, action.merchant)
            ];
        case types.EDIT_MERCHANT:
            return [
                ...state.filter(merchant => merchant.id !== action.merchant.id),
                Object.assign({}, action.merchant)
            ];
        case types.DELETE_MERCHANT:
            return [
                ...state.filter(merchant => merchant.id !== action.id)
            ];
        default:
            return state;
    }
}