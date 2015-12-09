import fetch from 'isomorphic-fetch'

export const ADD_CITY = 'ADD_CITY'
export const REMOVE_CITY = 'REMOVE_CITY'
export const EDIT_CITY = 'EDIT_CITY'
export const GET_CITY_WEATHER = 'GET_CITY_WEATHER'
export const RECEIVE_CITY_WEATHER = 'RECEIVE_CITY_WEATHER'
export const INVALID_WEATHER = 'INVALID_WEATHER'




export function addCity(name,json) {
  return {
    type: ADD_CITY,
    name//,
    //result: json
  }
}

export function removeCity(id) {
  return {
    type: REMOVE_CITY,
    id
  }
}

export function editCity(name,id,json) {
  return { 
    type: EDIT_CITY, 
    id, 
    name,
    result: json
  }
}

function invalidCity(name) {

  return {
    type: INVALID_WEATHER,
    name
  }
}

function requestingWeather(name) {
  return { 
    type:GET_CITY_WEATHER, 
    //id, 
    name
  }
}

export function fectchingCall(name) {
  
  return dispatch => {
    //dispatch(requestingWeather(name))
    //dispatch({ isFetching: true });
    return fetch(YAPI)
    //return fetch(API_URL+name+KEY)
      .then((response) => { 
        if (response.status >= 400) {
          throw new Error("Bad response from server");
        } 
        return response.json();
      })
      .then((json) => {
        console.log(json.query);
        //(json.cod ==='200') ? dispatch(receivedWeather(id,name)) : dispatch(invalidCity(name))
        (json.query.results) ? dispatch(addCityHandler(name,json)) : dispatch(invalidCity(name))
        
    })
  }
}

export function addCityJ(name) {
  //console.log(1);
  return (dispatch, getState) => {
    return dispatch(fectchingCall(name))
  }
}