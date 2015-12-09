import { ADD_CITY, REMOVE_CITY, EDIT_CITY , GET_CITY_WEATHER ,RECEIVE_CITY_WEATHER,INVALID_WEATHER } from '../actions/citys'

const initialState = [

  // {
  //   name: 'porto',
  //   id: 0,
  //   result:false,
  //   isFetching: true
   
  // },
  // {
  //   name: 'lisboa',
  //   id: 1,
  //   result:false,
  //   isFetching: true
   
  // },
  
]

function citys(state = initialState , action) {

  switch (action.type) {
    case ADD_CITY:
      return [
        ...state,
        {
          name: action.name,
          id: state.reduce((maxId, city) => Math.max(city.id, maxId), -1) + 1,
          //result: action.result,
          isFetching: false
        }
      ]
    case REMOVE_CITY:
      return state.filter(city =>
        city.id !== action.id
      )

    case GET_CITY_WEATHER:

      return [
        ...state.slice(0, action.id),
        Object.assign({}, state[action.id], {
          isFetching: true
        })
      ]
    case INVALID_WEATHER:
      console.log(state, action);
      return [
        ...state,
        {
          name: action.name,
          invalid: true,
          id: state.reduce((maxId, city) => Math.max(city.id, maxId), -1) + 1,
          isFetching: false
        }
      ]
    return
   
    case RECEIVE_CITY_WEATHER:
      return [
        ...state.slice(0, action.id),
        Object.assign({}, state[action.id], {
          isFetching: false,
          valid: true
        })
      ]
    default:
      return state
  }
}

export default citys