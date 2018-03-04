import { ADD_ARTICLE } from "../constants/index";
import { transactionsConstants } from "../constants/index";

const initialState = {
    transactions: []
};
export function transactions  (state = initialState, action)  {
    // console.log(action)
    switch (action.type) {


        case ADD_ARTICLE:
            return { ...state, articles: [...state.articles, action.payload] };

        case transactionsConstants.GETALL_REQUEST:
            return {
                loading: true
            };
        case transactionsConstants.GETALL_SUCCESS:
            return {
                items: action.transactions
            };
        case transactionsConstants.GETALL_FAILURE:
            return {
                error: action.error
            };



        case transactionsConstants.ADD_REQUEST:
            // add 'deleting:true' property to user being deleted
            return {...state};
        case transactionsConstants.ADD_SUCCESS:
            return {...state};
        case transactionsConstants.ADD_FAILURE:
            // remove 'deleting:true' property and add 'deleteError:[error]' property to user
            return {...state};



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
                items: state.items.filter(transaction => transaction.id !== action.id)
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