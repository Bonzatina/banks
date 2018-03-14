
// simulate back-end data
const bank_list = [
    {bankId: 1, bankName: 'ALFA'},
    {bankId: 2, bankName: 'SBER'},
    {bankId: 3, bankName: 'VTB'},
    {bankId: 4, bankName: 'OTP'},
    {bankId: 5, bankName: 'Mercury'}
];

const init_transactions = [
    {id: 1, amount: 100, bankId: 1},
    {id: 2, amount: 200, bankId: 2},
    {id: 3, amount: 255, bankId: 3},
    {id: 4, amount: 777, bankId: 1}
];

localStorage.setItem('bankListBackEnd', JSON.stringify(bank_list));

if (!localStorage.getItem('transactionsBackEnd')) {
    localStorage.setItem('transactionsBackEnd', JSON.stringify(init_transactions));
}


const banks = JSON.parse(localStorage.getItem('bankListBackEnd'));
const transactions = JSON.parse(localStorage.getItem('transactionsBackEnd'));


export function fakeBackEnd() {
    let realFetch = window.fetch;
    window.fetch = function (url, opts) {
        return new Promise((resolve, reject) => {
            // timeout to simulate server api call
            setTimeout(() => {

                // get list of transactions
                if (url.endsWith('/transactions/list') && opts.method === 'GET') {

                    if (opts.headers && opts.headers.Authorization === 'Bearer fake-jwt-token') {
                        if (transactions.length) {
                            resolve({ok: true, json: () => transactions});
                        } else {
                            reject('list empty');
                        }
                    }
                    else {
                        reject('Unauthorised');
                    }
                    return;
                }

                // add transaction
                if (url.endsWith('/transactions/add') && opts.method === 'POST') {
                    // check for fake auth token
                    if (opts.headers && opts.headers.Authorization === 'Bearer fake-jwt-token') {

                        let newTransaction = JSON.parse(opts.body);

                        newTransaction.id = transactions.length ? Math.max(...transactions.map(user => user.id)) + 1 : 1;
                        transactions.push(newTransaction);
                        localStorage.setItem('transactionsBackEnd', JSON.stringify(transactions));

                        // respond 200 OK
                        resolve({ok: true, json: () => ({})});
                    }
                    else {
                        reject('Unauthorised');
                    }
                    return;
                }

                // delete transaction
                if (url.match(/\/transactions\/\d+$/) && opts.method === 'DELETE') {
                    // check for fake auth token
                    if (opts.headers && opts.headers.Authorization === 'Bearer fake-jwt-token') {

                        let urlParts = url.split('/');
                        let id = parseInt(urlParts[urlParts.length - 1]);
                        for (let i = 0; i < transactions.length; i++) {
                            let transaction = transactions[i];
                            if (transaction.id === id) {
                                // delete transaction
                                transactions.splice(i, 1);
                                localStorage.setItem('transactionsBackEnd', JSON.stringify(transactions));
                                break;
                            }
                        }
                        // respond 200 OK
                        resolve({ok: true, json: () => ({})});
                    } else {
                        // return 401 not authorised if token is null or invalid
                        reject('Unauthorised');
                    }
                    return;
                }


                // authenticate
                if (url.endsWith('/users/authenticate') && opts.method === 'POST') {
                    // get parameters from post request
                    let params = JSON.parse(opts.body);


                    if (params.username === "user" && params.password === "user") {
                        // if login details are valid return fake jwt token
                        let responseJson = {
                            id: "1",
                            username: "user",
                            token: 'fake-jwt-token'
                        };
                        resolve({ok: true, json: () => responseJson});
                    } else {
                        // else return error
                        reject('Username or password is incorrect');
                    }
                    return;
                }


                // get list of banks
                if (url.endsWith('/banks') && opts.method === 'GET') {

                    if (opts.headers && opts.headers.Authorization === 'Bearer fake-jwt-token') {
                        if (transactions.length) {
                            resolve({ok: true, json: () => banks});
                        } else {
                            reject('list empty');
                        }
                    }
                    else {
                        reject('Unauthorised');
                    }
                    return;
                }

                // pass through any requests not handled above
                realFetch(url, opts).then(response => resolve(response));

            }, 500);
        });
    }
}