import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { addCity } from '../actions/citys'
//import classnames from 'classnames'


class CityItem extends Component {
  constructor(props, context) {
    super(props, context)
    this.state = {
      editing: false
    }
  }


  componentDidMount() {
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
    //console.log('invalid ',invalid, ' fecth ', isFetching);
   
    let element
    let data = city.result;

    //console.log(data.list);
    //console.log(data);
    if (this.state.editing) {
      // element = (
      //   <TodoTextInput text={todo.text}
      //                  editing={this.state.editing}
      //                  onSave={(text) => this.handleSave(todo.id, text)} />
      // )
    } else if(city.invalid) {
      element = (
          <div> Não foi possivel encontrar dados de <strong>{city.name}</strong>
          <button className="destroy"
                  onClick={() => removeCity(city.id)} > x </button>
          </div>
          
        )
    } else {
      element = (
        !city.isFetching ?
          <div className="view">
            <div className="nome"> {city.name} </div>
            <div className="clock">horas</div>
            
            <button className="destroy"
                  onClick={() => removeCity(city.id)} > x </button>
          </div>
          : <div className="loading">loading</div>
      ) 
    }

    return (
      <li>
       {element}
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

