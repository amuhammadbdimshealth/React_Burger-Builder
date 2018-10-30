import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter } from 'react-router-dom'

import { createStore, applyMiddleware, compose, combineReducers } from 'redux'
import thunk from 'redux-thunk'
import { Provider } from 'react-redux'
import burgerBuilderReducer from './store/reducers/burgerBuilder'
import contactDataReducer from './store/reducers/contactData'
import authReducer from './store/reducers/auth'


const rootReducer = combineReducers({
    brgr: burgerBuilderReducer,
    cnct: contactDataReducer,
    auth: authReducer
})
/**
 * Keep in mind, compose allows us to compose our own set of enhancers and middleware is just one kind of enhancer
 */
const composeEnhancers = process.env.NODE_ENV === 'development' ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__  : null || compose;
/**
 * The redux store is all setup but the application has no access to it yet. This is handled using the Provider React binding from react-redux. To make the store available to every component in the app, it makes sense to call this binding in the app’s entry point, in this case, index.js . 
 */
const store = createStore(
    rootReducer,
    composeEnhancers(applyMiddleware(thunk))
); 

/**
 * Provider should wrap everything, so we'll put it outside of the browser router.
 */

const app = (
    <Provider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>
);
ReactDOM.render(app, document.getElementById('root'));


registerServiceWorker();
