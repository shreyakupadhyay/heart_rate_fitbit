export const FETCH_DATA_BEGIN = 'FETCH_DATA_BEGIN'
export const FETCH_DATA_FAILURE = 'FETCH_DATA_FAILURE'
export const FETCH_DATA_SUCCESS = 'FETCH_DATA_SUCCESS'

export const fetchDataBegin = () => ({
    type: FETCH_DATA_BEGIN
})

export const fetchDataSuccess = data => ({
    type: FETCH_DATA_SUCCESS,
    payload: { data }
})

export const fetchDataFailure = error => ({
    type: FETCH_DATA_FAILURE,
    payload: { error }
})


export function fetchData(url){
    return dispatch => {
      dispatch(fetchDataBegin());
      
      fetch(url)
            .then(handleErrors)
            .then(res => {
                console.log(res)
                return res.json()
            })
            .then(json => {
                dispatch(fetchDataSuccess(json));
                return json;
            })
            .catch(error => dispatch(fetchDataFailure(error)));
    }
  }

function handleErrors(response){
    if(!response.ok){
      throw Error(response.statusText);
    }
    return response;
  }