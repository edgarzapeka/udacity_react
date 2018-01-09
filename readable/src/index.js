import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { createStore, applyMiddleware } from 'redux'
import reducer from './reducers'
import {Provider} from 'react-redux'
import thunk from 'redux-thunk'
import logger from 'redux-logger'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import '../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js'

const store = createStore(
    reducer,
    applyMiddleware(thunk,logger)
)

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
     document.getElementById('root')
    );
registerServiceWorker();
