import React, {Component, PropTypes} from 'react'


class WeatherItem extends Component {
  
  constructor(props, context) {
     super(props, context)
     this.state = {
       editing: false,
       loading: true,
       error: false
     }
  }

  render() {
    const { data } = this.props
    let icon = "wi wi-icon-"+data.code+" font-size-50";
    let weekday = (this.props.index === 0) ? 'Now' : data.day;
    return (
      <div className="next-weather ">
        <div className="icon icon-weather">
          <i className={icon}></i>
        </div>
        <div className="next-weather-temp">
          {data.high}&deg;C 
          <span className="softer"> {data.low}&deg;C</span>
        </div>
        <div className="day">{weekday}</div>
      </div>
    )
  }
}

WeatherItem.propTypes = {
  data: PropTypes.object.isRequired,
}

export default WeatherItem
