import {
    FETCH_TIMEZONE_DATA_BEGIN,
    FETCH_TIMEZONE_DATA_SUCCESS,
    FETCH_TIMEZONE_DATA_FAILURE
  } from '../actions/timeZoneActions';
  
  const initialtimeZoneState = {
      items: [],
      loading: false,
      error: null
  };
  
  export function timeZoneReducer(state=initialtimeZoneState, action){
      switch(action.type){
          case FETCH_TIMEZONE_DATA_BEGIN:
              return {
                  ...state,
                  loading: true,
                  error: null
              };
  
          case FETCH_TIMEZONE_DATA_SUCCESS:
              return {
                  ...state,
                  loading: false,
                  items: action.payload.data
              };
  
          case FETCH_TIMEZONE_DATA_FAILURE:
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