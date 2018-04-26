import { combineReducers } from 'redux';
import {heartRateReducer, eventsReducer} from './heartRateReducer';
import {timeZoneReducer} from './timeZoneReducer';

const allReducers = combineReducers({
    heartrate: heartRateReducer,
    events: eventsReducer,
    timeZone: timeZoneReducer
});

export default allReducers;