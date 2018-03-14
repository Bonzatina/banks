import { banksConstants } from "src/js/constants/index";

const initialState = {
    banksList: []
};


export function banks  (state = initialState, action)  {

    switch (action.type) {
        case banksConstants.GETBANKS_REQUEST:
            return {
                loading: true
            };
        case banksConstants.GETBANKS_SUCCESS:
            return {
                banksList: action.banks
            };
        case banksConstants.GETBANKS_FAILURE:
            return {
                error: action.error
            };


        default:
            return state;
        }
    }