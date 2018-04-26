import { combineReducers } from 'redux';
import {heartRateReducer, eventsReducer} from './heartRateReducer';
import {eventsZoneReducer} from './eventsZoneReducer';

const allReducers = combineReducers({
    heartrate: heartRateReducer,
    events: eventsReducer,
    eventsZone: eventsZoneReducer
});

export default allReducers;