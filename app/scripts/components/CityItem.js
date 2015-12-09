import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { addCity } from '../actions/citys'
import WeatherItem from './WeatherItem'
import Clock from './Clock'


import 'simpleweather'

//import classnames from 'classnames'


class CityItem extends Component {
  constructor(props, context) {
    super(props, context)
    this.state = {
      editing: false,
      loading: true,
      error: false
    }
  }

  componentDidMount() {
    const self = this;
    const { city } = this.props;
    //console.log(city);
    jQuery.simpleWeather({
      location: city.name,
      woeid: '',
      unit: 'c',
      success: function(weather) {
        let w = [];
        for(var i=0;i<weather.forecast.length-1;i++) {
          w.push(weather.forecast[i]);
        }
       
        self.setState({
          wdata: weather,
          daydata: w,
          loading:false,
          yName: weather.city
        })
      },

      error: function(error) {
        //
        //console.log('.------', error);
        self.setState({ error: true})
      }
    });
  }

  // handleDoubleClick() {
  //   this.setState({ editing: true })
  // }

  handleSave(id, text) {
    if (text.length === 0) {
      this.props.deleteTodo(id)
    } else {
      this.props.editTodo(id, text)
    }
    this.setState({ editing: false })
  }

  render() {
    const { city, removeCity } = this.props

    //console.log("---", city.result);

    //console.log(this.state);
    let element;
    let welement;
    if (this.state.editing) {
      // element = (
      //   <TodoTextInput text={todo.text}
      //                  editing={this.state.editing}
      //                  onSave={(text) => this.handleSave(todo.id, text)} />
      // )
    } else if(this.state.error) {
      element = (
          <div> Não foi possivel encontrar dados de <strong>{city.name}</strong>
          <button className="destroy"
                  onClick={() => removeCity(city.id)} > x </button>
          </div>
          
        )
    } else {
      element = (
        !this.state.loading ?
          <div className="view">
            <header className="header">
              <div className="city-name">{city.name} /</div>
              <Clock cityName={this.state.yName} />
               <button className="destroy"
                  onClick={() => removeCity(city.id)} > x </button>
            </header>
            <div className="weather-itens-warper clearfix">
            {
              this.state.daydata.map((day, i) =>
                <WeatherItem key={i} index={i} data={day} />
              )
            }
            </div>
           
          </div>
          : <div className="loading">loading</div>
      ) 
    }

    return (
      
        <li className="weather-list-item clearfix">
          {element}
          {welement}
        </li>
      
    )
  }
}

CityItem.propTypes = {
  city: PropTypes.object.isRequired,
  removeCity: PropTypes.func.isRequired,
  addCity: PropTypes.func.isRequired,
  dispatch: PropTypes.func.isRequired,
}


function mapStateToProps(state) {

  return {

  }
}


export default connect(mapStateToProps)(CityItem)

