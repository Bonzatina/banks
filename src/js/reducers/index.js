

import { combineReducers } from 'redux';

import { transactions } from './transactions.reducer';
import { authentication } from './auth.reducer';
import { banks } from './banks.reducer';


const rootReducer = combineReducers({
    transactions,
    authentication,
    banks
});

export default rootReducer;