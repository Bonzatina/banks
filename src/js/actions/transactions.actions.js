import { transactionsConstants } from "../constants/index";
import { history } from '../helpers/history'
import { authHeader } from '../helpers';

export const addArticle = article => ({ type: ADD_ARTICLE, payload: article });

export const transactionsActions = {
    getAll,
    deleteTransaction,
    addTransaction,
    getBanksList
};

function getAll() {
    return dispatch => {
        dispatch(request());

        fetch_getAll()
            .then(
                transactions => dispatch(success(transactions)),
                error => {
                    dispatch(failure(error));
                    // dispatch(alertActions.error(error))
                }
            );
    };

    function request() { return { type: transactionsConstants.GETALL_REQUEST } }
    function success(transactions) { return { type: transactionsConstants.GETALL_SUCCESS, transactions } }
    function failure(error) { return { type: transactionsConstants.GETALL_FAILURE, error } }
}

function addTransaction(transaction) {
    return dispatch => {
        dispatch(request(transaction));

        fetch_addTransaction(transaction)
            .then(
                transaction => {
                    dispatch(success('Adding successful'));
                    history.push('/list');
                },
                error => {
                    dispatch(failure(error));
                }
            );
    };

    function request(transaction) { return { type: transactionsConstants.ADD_REQUEST, transaction } }
    function success(message) { return { type: transactionsConstants.ADD_SUCCESS, message } }
    function failure(error) { return { type: transactionsConstants.ADD_FAILURE, error } }
}


function deleteTransaction(id) {

    return dispatch => {
        dispatch(request(id));

        fetch_delete(id)
            .then(
                transactions => {
                    dispatch(success(id));
                },
                error => {
                    dispatch(failure(id, error));
                }
            );
    };

    function request(id) { return { type: transactionsConstants.DELETE_REQUEST, id } }
    function success(id) { return { type: transactionsConstants.DELETE_SUCCESS, id } }
    function failure(id, error) { return { type: transactionsConstants.DELETE_FAILURE, id, error } }
}

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

    function request() { return { type: transactionsConstants.GETBANKS_REQUEST} }
    function success(banks) { return { type: transactionsConstants.GETBANKS_SUCCESS, banks } }
    function failure(error) { return { type: transactionsConstants.GETBANKS_FAILURE, error } }
}

// requests to back end

function fetch_getAll() {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch('/transactions/list', requestOptions).then(handleResponse);
}


function fetch_addTransaction(transaction) {
    const requestOptions = {
        method: 'POST',
        headers: { ...authHeader(), 'Content-Type': 'application/json' },
        body: JSON.stringify(transaction)
    };

    return fetch('/transactions/add', requestOptions).then(handleResponse);
}


function fetch_delete(id) {
    const requestOptions = {
        method: 'DELETE',
        headers: authHeader()
    };

    return fetch('/transactions/' + id, requestOptions).then(handleResponse);
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



