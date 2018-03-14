import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import rootReducer from 'src/js/reducers';
import { composeWithDevTools } from 'redux-devtools-extension';

const composeEnhancers = composeWithDevTools({
    // Specify name here, actionsBlacklist, actionsCreators and other options if needed
});

const loggerMiddleware = createLogger();

export const store = createStore(
    rootReducer,
    composeEnhancers(
    applyMiddleware(
        thunkMiddleware,
        loggerMiddleware
    ))
);