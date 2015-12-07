import React, { Component, PropTypes } from 'react'
import { render } from 'react-dom'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import CityHandler from '../components/CityHandler'
import CitysWarper from '../components/CitysWarper'

import * as CityActions from '../actions/citys'

const initialState = [

  {
    name: 'porto',
    id: 0,
    result:false,
    isFetching: true
   
  },
  {
    name: 'lisboa',
    id: 1,
    result:false,
    isFetching: true
   
  },
  
]

class App extends Component {
  render() {
    const { citys, actions ,wactions} = this.props
    //console.log(this.props.citys, this.props.actions);
    return (
      <section className="weather-warper">
       	<CitysWarper citys={citys} actions={actions} />
        <CityHandler default={initialState} citys={citys} addCity={actions.addCity}/>
      </section>
    )
  }
}

App.propTypes = {
  citys: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired,
}

function mapStateToProps(state) {
  return {
    citys: state.citys
  }
}

function mapDispatchToProps(dispatch) {
  return {
  	actions: bindActionCreators(CityActions, dispatch),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)


