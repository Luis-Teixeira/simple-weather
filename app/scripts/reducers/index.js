import { combineReducers } from 'redux'
import { default as citys , getCitys } from './citys'
//import weather from './weather'


export function getAllCitys(state) {
  return getCitys(state);
}


const rootReducer = combineReducers({
  citys
})

export default rootReducer


