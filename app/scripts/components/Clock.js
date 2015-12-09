import React, {Component, PropTypes} from 'react'
import moment from 'moment-timezone'
//import moment from 'moment-timezone/moment-timezone-with-data-2010-2020'
//var moment = require('moment-timezone');

import fetch from 'isomorphic-fetch'

const LAT_LOG_URL =  'https://maps.googleapis.com/maps/api/geocode/json?address=';
const TIMEZONE_URL =  'https://maps.googleapis.com/maps/api/timezone/json?location=';

class Clock extends Component {

  constructor(props, context) {
     super(props, context)
     this.state = {
       clock: '00:00'
     }
  }

  tick(self,timeZoneId){
    //console.log(timeZoneId);
    //console.log('tick');
    let d = new Date();
    self.setState({
      clock: moment.tz(d, timeZoneId).format('HH:mm')
    })
   // console.log(moment.tz(d, timeZoneId).format('HH:mm'));
  }

  startClock(timeZoneId,rawOffset){
    this.timer = setInterval( this.tick , 1000, this, timeZoneId);
    //this.timeZoneId = timeZoneId;
    //this.self = this;
  }

  killClock(){
    clearInterval(this.timer);
  } 

  componentDidMount(){
    //this.startClock();

    fetch(LAT_LOG_URL+this.props.cityName)
    //return fetch(API_URL+name+KEY)
      .then((response) => { 
        if (response.status >= 400) {
          throw new Error("Bad response from server");
        } 
        return response.json();
      })
      .then((json) => {
        
        //console.log('aaa ', json.results[0].geometry.location.lat,json.results[0].geometry.location.lng );
        let latlng = {
          lat : json.results[0].geometry.location.lat,
          lng : json.results[0].geometry.location.lng
        }

        
        fetch(TIMEZONE_URL+latlng.lat+","+latlng.lng+"&timestamp=1331161200")
          .then((response) => {
            if (response.status >= 400) {
              throw new Error("Bad response from server");
            } 
            return response.json();
          })
          .then((json) => {
            //console.log(json);
            this.startClock(json.timeZoneId,json.rawOffset);
          });
        
      })
  }

  componentWillUnmount(){
    this.killClock();
    
  }

  render() {
    return (
      <div className="clock">{this.state.clock}</div>
   )
  }
}

Clock.propTypes = {
  cityName: PropTypes.string.isRequired,
}

export default Clock
