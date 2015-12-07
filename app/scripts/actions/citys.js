import fetch from 'isomorphic-fetch'

export const ADD_CITY = 'ADD_CITY'
export const REMOVE_CITY = 'REMOVE_CITY'
export const EDIT_CITY = 'EDIT_CITY'
export const GET_CITY_WEATHER = 'GET_CITY_WEATHER'
export const RECEIVE_CITY_WEATHER = 'RECEIVE_CITY_WEATHER'
export const INVALID_WEATHER = 'INVALID_WEATHER'


let locationQuery = escape("select item from weather.forecast where woeid in (select woeid from geo.places(1) where text='Lisboa') and u='c'")

//const YAPI = "http://query.yahooapis.com/v1/public/yql?q=" + locationQuery + "&format=json&callback=?"


const YAPI = "https://query.yahooapis.com/v1/public/yql?q%3Dselect%20*%20from%20weather.forecast%20where%20woeid%20in%20(select%20woeid%20from%20geo.places(1)%20where%20text%3D%22Lisboa%22%20and%20u%3D%27c%27%20)%26format%3Djson%26callback%3D%22"
const API_URL = 'http://api.openweathermap.org/data/2.5/forecast?q='
const KEY = '&appid=2de143494c0b295cca9337e1e96b00e0';

export function addCityHandler(name,json) {
  return {
    type: ADD_CITY,
    name,
    result: json
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

export function addCity(name) {
  
  return (dispatch, getState) => {
    return dispatch(fectchingCall(name))
  }
}