
import { transactionsConstants } from "src/js/constants/index";

const initialState = {
    items: []
};
export function transactions  (state = initialState, action)  {

    switch (action.type) {


        case transactionsConstants.GETALL_REQUEST:
            return {
                ...state, loading: true
            };
        case transactionsConstants.GETALL_SUCCESS:
            return {
                ...state, items: action.transactions,  loading: false
            };
        case transactionsConstants.GETALL_FAILURE:
            return {
                ...state, error: action.error
            };



        case transactionsConstants.ADD_REQUEST:
            return {...state};
        case transactionsConstants.ADD_SUCCESS:
            return {...state, message: action.message};
        case transactionsConstants.ADD_FAILURE:
            return {...state,     error: action.error};



        case transactionsConstants.DELETE_REQUEST:
            // add 'deleting:true' property to user being deleted
            return {
                ...state,
                items: state.items.map(transaction =>
                    transaction.id === action.id
                        ? { ...transaction, deleting: true }
                        : transaction
                )
            };
        case transactionsConstants.DELETE_SUCCESS:
            return {
                ...state, items: state.items.filter(transaction => transaction.id !== action.id)
            };
        case transactionsConstants.DELETE_FAILURE:
            // remove 'deleting:true' property and add 'deleteError:[error]' property to user
            return {
                ...state,
                items: state.items.map(transaction => {
                    if (transaction.id === action.id) {
                        // make copy of user without 'deleting:true' property
                        const { deleting, ...transactionCopy } = transaction;
                        // return copy of user with 'deleteError:[error]' property
                        return { ...transactionCopy, deleteError: action.error };
                    }
                    return transaction;
                })
            };

        default:
            return state;
    }
};