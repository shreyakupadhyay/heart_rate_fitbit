import {
  FETCH_HEARTRATE_DATA_BEGIN,
  FETCH_HEARTRATE_DATA_SUCCESS,
  FETCH_HEARTRATE_DATA_FAILURE,
  FETCH_EVENTS_DATA_BEGIN,
  FETCH_EVENTS_DATA_SUCCESS,
  FETCH_EVENTS_DATA_FAILURE,
} from '../actions/heartRateActions';

const initialHeartRateState = {
    items: [],
    loading: false,
    error: null
};

export function heartRateReducer(state=initialHeartRateState, action){
    switch(action.type){
        case FETCH_HEARTRATE_DATA_BEGIN:
            return {
                ...state,
                loading: true,
                error: null
            };

        case FETCH_HEARTRATE_DATA_SUCCESS:
            return {
                ...state,
                loading: false,
                items: action.payload.data.map(d => Object({x: new Date(d.x), y:d.y}))
            };

        case FETCH_HEARTRATE_DATA_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload.error,
                items: []
            };
    
        default:
            return state;
    
    }
}

const initialEventsState = {
    items: [],
    loading: false,
    error: null
};

export function eventsReducer(state=initialEventsState, action){
    switch(action.type){
        case FETCH_EVENTS_DATA_BEGIN:
            return {
                ...state,
                loading: true,
                error: null
            };

        case FETCH_EVENTS_DATA_SUCCESS:
            return {
                ...state,
                loading: false,
                items: action.payload.data
            };

        case FETCH_EVENTS_DATA_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload.error,
                items: []
            };
    
        default:
            return state;
    
    }
}
  