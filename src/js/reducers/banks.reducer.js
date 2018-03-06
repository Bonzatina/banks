import { transactionsConstants } from "../constants/index";

const initialState = {
    banksList: []
};


export function banks  (state = initialState, action)  {

    switch (action.type) {
        case transactionsConstants.GETBANKS_REQUEST:
            return {
                loading: true
            };
        case transactionsConstants.GETBANKS_SUCCESS:
            return {
                banksList: action.banks
            };
        case transactionsConstants.GETBANKS_FAILURE:
            return {
                error: action.error
            };


        default:
            return state;
        }
    }