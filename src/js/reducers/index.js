

import { combineReducers } from 'redux';

import { transactions } from './transactions.reducer';
import { authentication } from './auth.reducer';


const rootReducer = combineReducers({
    transactions,
    authentication
});

export default rootReducer;