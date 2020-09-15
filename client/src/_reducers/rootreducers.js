import {combineReducers} from 'redux';
import tourreducer from './tourreducer';
import landingdata from './landingpagereducer';
import heartreducer from './heartreducer';
import authreducer from './authreducer';
import alertreducer from './alertreducer';

const rootreducer = combineReducers({
    tourreducer,
    landingdata,
    heartreducer,
    authreducer,
   alertreducer
});

export default rootreducer;
