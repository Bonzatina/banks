import { banksConstants } from "src/js/constants/index";
import { authHeader } from 'src/js/helpers';

export const banksActions = {
    getBanksList
};


function getBanksList() {

    return dispatch => {
        dispatch(request());

        fetch_getBanksList()
            .then(
                banks => {
                    dispatch(success(banks));
                },
                error => {
                    dispatch(failure( error));
                }
            );
    };

    function request() { return { type: banksConstants.GETBANKS_REQUEST} }
    function success(banks) { return { type: banksConstants.GETBANKS_SUCCESS, banks } }
    function failure(error) { return { type: banksConstants.GETBANKS_FAILURE, error } }
}


function fetch_getBanksList() {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch('/banks', requestOptions).then(handleResponse);
}


function handleResponse(response) {
    if (!response.ok) {
        return Promise.reject(response.statusText);
    }

    return response.json();
}