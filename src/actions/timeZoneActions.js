
  export const FETCH_TIMEZONE_DATA_BEGIN = 'FETCH_TIMEZONE_DATA_BEGIN'
  export const FETCH_TIMEZONE_DATA_FAILURE = 'FETCH_TIMEZONE_DATA_FAILURE'
  export const FETCH_TIMEZONE_DATA_SUCCESS = 'FETCH_TIMEZONE_DATA_SUCCESS'
  
  export const fetchTimeZoneDataBegin = () => ({
      type: FETCH_TIMEZONE_DATA_BEGIN
  })
  
  export const fetchTimeZoneDataSuccess = data => ({
      type: FETCH_TIMEZONE_DATA_SUCCESS,
      payload: { data }
  })
  
  export const fetchTimeZoneDataFailure = error => ({
      type: FETCH_TIMEZONE_DATA_FAILURE,
      payload: { error }
  })

  export function fetchTimeZoneData(url){
    return dispatch => {
      dispatch(fetchTimeZoneDataBegin());
      
      fetch(url)
            .then(handleErrors)
            .then(res => {
                console.log(res)
                return res.json()
            })
            .then(json => {
                dispatch(fetchTimeZoneDataSuccess(json));
                return json;
            })
            .catch(error => dispatch(fetchTimeZoneDataFailure(error)));
    }
  }

function handleErrors(response){
    if(!response.ok){
      throw Error(response.statusText);
    }
    return response;
  }