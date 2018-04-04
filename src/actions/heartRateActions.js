export const FETCH_HEARTRATE_DATA_BEGIN = 'FETCH_HEARTRATE_DATA_BEGIN'
export const FETCH_HEARTRATE_DATA_FAILURE = 'FETCH_HEARTRATE_DATA_FAILURE'
export const FETCH_HEARTRATE_DATA_SUCCESS = 'FETCH_HEARTRATE_DATA_SUCCESS'

export const fetchHeartRateDataBegin = () => ({
    type: FETCH_HEARTRATE_DATA_BEGIN
})

export const fetchHeartRateDataSuccess = data => ({
    type: FETCH_HEARTRATE_DATA_SUCCESS,
    payload: { data }
})

export const fetchHeartRateDataFailure = error => ({
    type: FETCH_HEARTRATE_DATA_FAILURE,
    payload: { error }
})


export function fetchHeartRateData(url){
    return dispatch => {
      dispatch(fetchHeartRateDataBegin());
      
      fetch(url)
            .then(handleErrors)
            .then(res => {
                console.log(res)
                return res.json()
            })
            .then(json => {
                dispatch(fetchHeartRateDataSuccess(json));
                return json;
            })
            .catch(error => dispatch(fetchHeartRateDataFailure(error)));
    }
  }

function handleErrors(response){
    if(!response.ok){
      throw Error(response.statusText);
    }
    return response;
  }