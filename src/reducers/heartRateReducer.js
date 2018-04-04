import {
  FETCH_HEARTRATE_DATA_BEGIN,
  FETCH_HEARTRATE_DATA_SUCCESS,
  FETCH_HEARTRATE_DATA_FAILURE
} from '../actions/heartRateActions';

const initialState = {
    items: [],
    loading: false,
    error: null
};

export default function dashboardReducer(state=initialState, action){
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
  