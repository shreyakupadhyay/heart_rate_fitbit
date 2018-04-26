import {
    FETCH_EVENTSZONE_DATA_BEGIN,
    FETCH_EVENTSZONE_DATA_SUCCESS,
    FETCH_EVENTSZONE_DATA_FAILURE
  } from '../actions/eventsZoneActions';
  
  const initialEventsZoneState = {
      items: [],
      loading: false,
      error: null
  };
  
  export function eventsZoneReducer(state=initialEventsZoneState, action){
      switch(action.type){
          case FETCH_EVENTSZONE_DATA_BEGIN:
              return {
                  ...state,
                  loading: true,
                  error: null
              };
  
          case FETCH_EVENTSZONE_DATA_SUCCESS:
              return {
                  ...state,
                  loading: false,
                  items: action.payload.data
              };
  
          case FETCH_EVENTSZONE_DATA_FAILURE:
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