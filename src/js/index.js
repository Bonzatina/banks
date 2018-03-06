import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from "react-redux";

import AppRouter from './components/AppRouter';


import {store} from "../js/store/index";

import {fakeBackEnd} from './fakeBackEnd';
fakeBackEnd();

ReactDOM.render(
    <Provider store={store}>
        <AppRouter />
    </Provider>, document.getElementById("app"));


