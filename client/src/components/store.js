import {applyMiddleware, createStore} from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import rootreducer from '../_reducers/rootreducers';


const intialstate = {};

const middleware = [thunk];

const store = createStore(rootreducer
    ,intialstate,composeWithDevTools(applyMiddleware(...middleware)))


export default store;