
import { REQUEST_WEATHER, INVALID_WEATHER, RECEIVE_WEATHER } from '../actions/weather'

function weather(state = [{
  isFetching: false,
  invalid: false,
  result: [],
  lastUpdated: 0
} ], action) {
  //console.log(action);
  switch (action.type) {

    case INVALID_WEATHER:
      return [ {
        invalid: true,
        isFetching: false,
      }]

    case REQUEST_WEATHER:
      return [
        {
          isFetching: true,
          invalid: false
        },
      ]
    case RECEIVE_WEATHER:
     
      return [ {
        isFetching: false,
        invalid: false,
        result: action.result,
        lastUpdated: action.receivedAt
      }
      ]
    default:
      return state
  }
}

export default weather