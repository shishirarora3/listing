import React from "react";
import ReactDOM from "react-dom";
import {Provider} from "react-redux";

import configureStore from "./configureStore";
//
import App from "./app";

import "./styles.css";
import 'semantic-ui-css/semantic.min.css'

const store = configureStore();

const rootElement = document.getElementById("root");
ReactDOM.render(
    <Provider store={store}>
        <App/>
    </Provider>,
    rootElement
);
