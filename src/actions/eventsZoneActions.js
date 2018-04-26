
  export const FETCH_EVENTSZONE_DATA_BEGIN = 'FETCH_EVENTSZONE_DATA_BEGIN'
  export const FETCH_EVENTSZONE_DATA_FAILURE = 'FETCH_EVENTSZONE_DATA_FAILURE'
  export const FETCH_EVENTSZONE_DATA_SUCCESS = 'FETCH_EVENTSZONE_DATA_SUCCESS'
  
  export const fetchEventsZoneDataBegin = () => ({
      type: FETCH_EVENTSZONE_DATA_BEGIN
  })
  
  export const fetchEventsZoneDataSuccess = data => ({
      type: FETCH_EVENTSZONE_DATA_SUCCESS,
      payload: { data }
  })
  
  export const fetchEventsZoneDataFailure = error => ({
      type: FETCH_EVENTSZONE_DATA_FAILURE,
      payload: { error }
  })

  export function fetchEventsZoneData(url){
    return dispatch => {
      dispatch(fetchEventsZoneDataBegin());
      
      fetch(url)
            .then(handleErrors)
            .then(res => {
                console.log(res)
                return res.json()
            })
            .then(json => {
                dispatch(fetchEventsZoneDataSuccess(json));
                return json;
            })
            .catch(error => dispatch(fetchEventsZoneDataFailure(error)));
    }
  }

function handleErrors(response){
    if(!response.ok){
      throw Error(response.statusText);
    }
    return response;
  }