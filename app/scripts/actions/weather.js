import fetch from 'isomorphic-fetch'


export const REQUEST_WEATHER = 'REQUEST_WEATHER'
export const INVALID_WEATHER = 'INVALID_WEATHER'
export const RECEIVE_WEATHER = 'RECEIVE_WEATHER'
export const SELECTED_CITY = 'SELECTED_CITY'

const API_URL = 'http://api.openweathermap.org/data/2.5/forecast?q='
const KEY = '&appid=2de143494c0b295cca9337e1e96b00e0';


function invalidateWeather(name) {
  return {
    type: INVALID_WEATHER,
    name
  }
}

export function requestWeather(name) {
  return {
    type: REQUEST_WEATHER,
    name
  }
} 

function receiveWeather(name, id, json) {
  
  return {
    type: RECEIVE_WEATHER,
    cityId: id,
    name,
    result: json, //json.data.children.map(child => child.data),
    receivedAt: Date.now()
  }
}

function fetchWeather(name,id) {
  
  return dispatch => {
    dispatch(requestWeather(name,id))
    return fetch(API_URL+name+KEY)
      .then((response) => { 
        if (response.status >= 400) {
          throw new Error("Bad response from server");
        } 
        return response.json();
      })
      .then((json) => {
        (json.cod ==='200') ? dispatch(receiveWeather(name,id, json)) : dispatch(invalidateWeather(name))
        
      })
  }
}

function shouldFetchPosts(state, reddit) {
  // const posts = state.postsByReddit[reddit]
  // if (!posts) {
  //   return true
  // }
  // if (posts.isFetching) {
  //   return false
  // }
  return true;//posts.didInvalidate
}

export function fetchWeatherByName(name,id) {
  
  return (dispatch, getState) => {
    //if (shouldFetchPosts(getState(), name)) {
      return dispatch(fetchWeather(name,id))
    //}
  }
}
