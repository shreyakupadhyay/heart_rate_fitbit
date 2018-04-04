import { combineReducers } from 'redux';
import heartRateReducer from './heartRateReducer';

const allReducers = combineReducers({
    heartrate: heartRateReducer,
});

export default allReducers;