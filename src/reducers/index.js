import { combineReducers } from 'redux';
import {heartRateReducer, eventsReducer} from './heartRateReducer';

const allReducers = combineReducers({
    heartrate: heartRateReducer,
    events: eventsReducer
});

export default allReducers;