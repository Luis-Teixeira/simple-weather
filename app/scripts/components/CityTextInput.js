import React, { Component, PropTypes } from 'react'
//import classnames from 'classnames'

class CityTextInput extends Component {
  constructor(props, context) {
    super(props, context)
    this.state = {
      name: this.props.name || ''
    }
  }

  onKeyDown(e) {
    const name = e.target.value.trim()
    if (e.which === 13 && name.length > 2) {
      this.toSave(name);
      this.input.value = '';
    }
  }

  handleSubmit(value) {
    //console.log(value);
    const name = value.trim()
    if (name.length > 2) {
      this.toSave(name);
    }
  }

  toSave (name) {
    this.props.onSave(name)
    if (this.props.newCity) {
      this.setState({ name: '' })
    }
  }

  render() {
    return (
      <div className="">
        <input  ref={node => {this.input = node}}
                type="text"
                placeholder={this.props.placeholder}
                onKeyDown={this.onKeyDown.bind(this)} 
         />
        <button 
          onClick={() => {
            this.handleSubmit(this.input.value)
            this.input.value = ''
          }} 

        >{this.props.placeholder}</button>
      </div>
    )
  }
}

CityTextInput.propTypes = {
  onSave: PropTypes.func.isRequired,
  name: PropTypes.string,
  placeholder: PropTypes.string,
  newCity: PropTypes.bool
}

export default CityTextInput
