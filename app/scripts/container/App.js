import React, { Component, PropTypes } from 'react'
import { render } from 'react-dom'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import CityHandler from '../components/CityHandler'
import CitysWarper from '../components/CitysWarper'

import * as CityActions from '../actions/citys'

let initialState = [

  {
    name: 'lisboa',
    id: 0,
    result:false,
    isFetching: true
   
  },
  {
    name: 'porto',
    id: 1,
    result:false,
    isFetching: true
   
  }
  
]

class App extends Component {
  

  componentDidMount(){
    //this.cache();
  }
  componentDidUpdate(){
    localStorage.setItem('citys',JSON.stringify(this.props.citys));
  }

  render() {
    let cacheDate = localStorage.getItem('citys');
    //console.log(localStorage.getItem('citys'));
    if (!cacheDate || cacheDate === 'undefined'){
      localStorage.setItem('citys',JSON.stringify(initialState));
    }
    const { citys, actions ,wactions} = this.props
    
    return (
      <section className="weather-warper">
       	<CitysWarper citys={citys} actions={actions} />
        <CityHandler default={JSON.parse(cacheDate)} citys={citys} addCity={actions.addCity}/>
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


