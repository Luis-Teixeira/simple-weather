import React, { Component, PropTypes } from 'react'
import CityItem from './CityItem'
import CityTextInput from './CityTextInput'

//import Footer from './Footer'
//import { SHOW_ALL, SHOW_COMPLETED, SHOW_ACTIVE } from '../constants/TodoFilters'


class CitysWarper extends Component {
  constructor(props, context) {
    super(props, context)
   // console.log(this.props);
  }

  render() {
    const { citys, actions } = this.props
    //console.log(citys);
    return (
      <section className="citys-warper main">
        
        <ul className="weather-list clearfix">
        { citys.map(city => 
          <CityItem key={city.id} city={city} {...actions}/>
        )}
        </ul>
        
      </section>
    )
  }
}

CitysWarper.propTypes = {
  citys: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired,
  // editCity: PropTypes.func.isRequired,
}

export default CitysWarper
