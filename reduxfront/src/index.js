import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { initializeFirebase } from './push/push-notification';
import { createStore,combineReducers } from 'redux';
import postReducer from './reducers/Reducer';
import {titleReducer,listReducer} from './reducers/TitleReducer';
import { Provider } from 'react-redux';

const rootReducer=combineReducers({
    postReducer,
    titleReducer,
    listReducer
})
const store = createStore(rootReducer);
// console.log(store.getState())

ReactDOM.render(<Provider store={store}>
    <App /></Provider>, document.getElementById('root'));
initializeFirebase();

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
