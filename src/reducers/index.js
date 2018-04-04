import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
// Reducers
import merchants from './merchantsReducer';
import ajaxLoading from './ajaxLoadingReducer';

const rootReducer = combineReducers({
    merchants,
    ajaxLoading,
    form: formReducer
});

export default rootReducer;