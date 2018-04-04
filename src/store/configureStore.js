import {createStore, applyMiddleware, compose} from 'redux';
// To handle async actions (like API calls) in store
import thunk from 'redux-thunk';
// Reducers
import reducers from '../reducers';
// Initial state
import initialState from './initialState';

const configureStore = () => {
    return createStore(
        reducers,
        initialState,
        // Apply thunk middleware and add support for Redux dev tools in Google Chrome
        process.env.NODE_ENV !== 'production' && window.devToolsExtension ?
            compose(applyMiddleware(thunk), window.devToolsExtension())
            :
            applyMiddleware(thunk)
    );
};

export default configureStore;
