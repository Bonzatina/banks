const init_transactions = [
    {id: 1, amount: 100, bankId: 1},
    {id: 2, amount: 200, bankId: 2},
    {id: 3, amount: 255, bankId: 3},
    {id: 4, amount: 777, bankId: 1}
];

if (!localStorage.getItem('transactionsBackEnd')) {
    localStorage.setItem('transactionsBackEnd', JSON.stringify(init_transactions));
}


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
                    if (opts.headers && opts.headers.Authorization === 'Bearer fake-jwt-token') {
                        // get new user object from post body
                        let newTransaction = JSON.parse(opts.body);


                        // save new user
                        newTransaction.id = transactions.length ? Math.max(...transactions.map(user => user.id)) + 1 : 1;
                        transactions.push(newTransaction);
                        console.log(transactions)
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
                    console.log("---!----")
                    // check for fake auth token in header and return user if valid, this security is implemented server side in a real application
                    if (opts.headers && opts.headers.Authorization === 'Bearer fake-jwt-token') {
                        // find user by id in users array
                        let urlParts = url.split('/');
                        let id = parseInt(urlParts[urlParts.length - 1]);
                        for (let i = 0; i < transactions.length; i++) {
                            let transaction = transactions[i];
                            if (transaction.id === id) {
                                // delete user
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

                // get users
                if (url.endsWith('/users') && opts.method === 'GET') {
                    // check for fake auth token in header and return users if valid, this security is implemented server side in a real application
                    if (opts.headers && opts.headers.Authorization === 'Bearer fake-jwt-token') {
                        resolve({ok: true, json: () => users});
                    } else {
                        // return 401 not authorised if token is null or invalid
                        reject('Unauthorised');
                    }

                    return;
                }

                // get user by id
                if (url.match(/\/users\/\d+$/) && opts.method === 'GET') {
                    // check for fake auth token in header and return user if valid, this security is implemented server side in a real application
                    if (opts.headers && opts.headers.Authorization === 'Bearer fake-jwt-token') {
                        // find user by id in users array
                        let urlParts = url.split('/');
                        let id = parseInt(urlParts[urlParts.length - 1]);
                        let matchedUsers = users.filter(user => {
                            return user.id === id;
                        });
                        let user = matchedUsers.length ? matchedUsers[0] : null;

                        // respond 200 OK with user
                        resolve({ok: true, json: () => user});
                    } else {
                        // return 401 not authorised if token is null or invalid
                        reject('Unauthorised');
                    }

                    return;
                }


                // delete user
                if (url.match(/\/users\/\d+$/) && opts.method === 'DELETE') {
                    // check for fake auth token in header and return user if valid, this security is implemented server side in a real application
                    if (opts.headers && opts.headers.Authorization === 'Bearer fake-jwt-token') {
                        // find user by id in users array
                        let urlParts = url.split('/');
                        let id = parseInt(urlParts[urlParts.length - 1]);
                        for (let i = 0; i < users.length; i++) {
                            let user = users[i];
                            if (user.id === id) {
                                // delete user
                                users.splice(i, 1);
                                localStorage.setItem('users', JSON.stringify(users));
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

                // pass through any requests not handled above
                realFetch(url, opts).then(response => resolve(response));

            }, 500);
        });
    }
}