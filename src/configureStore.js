import {applyMiddleware, createStore} from "redux";
import thunk from "redux-thunk";
import app from "./reducers";

const configureStore = () => {
    const store = createStore(app, applyMiddleware(thunk));
    return store;
};

export default configureStore;
