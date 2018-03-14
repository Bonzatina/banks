import { combineReducers } from 'redux';

import { transactions } from 'src/js/reducers/transactions.reducer';
import { authentication } from 'src/js/reducers/auth.reducer';
import { banks } from 'src/js/reducers/banks.reducer';


const rootReducer = combineReducers({
    transactions,
    authentication,
    banks
});

export default rootReducer;