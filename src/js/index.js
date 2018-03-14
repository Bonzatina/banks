import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from "react-redux";

import AppRouter from 'src/js/components/AppRouter';


import {store} from "src/js/store/index";

import {fakeBackEnd} from 'src/js/fakeBackEnd';
fakeBackEnd();

ReactDOM.render(
    <Provider store={store}>
        <AppRouter />
    </Provider>, document.getElementById("app"));


