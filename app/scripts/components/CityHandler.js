import React, {Component, PropTypes} from 'react'
import CityTextInput from './CityTextInput'
import cx from 'classnames'

class CityHandler extends Component {
  
  handleSave(text) {
    if (text.length !== 0 && this.props.citys.length < 3) {
      this.props.addCity(text)     
    }

  }

  componentDidMount(){
    let self = this;
    this.props.default.map(city => 
      self.props.addCity(city.name)
    );
  }

  render() {
    const {citys} = this.props

    let inputClass = cx({
      'input': true,
      'disabled': citys.length === 3
    });

    return (
      <footer className="footer">
          <CityTextInput className={inputClass} newCity
                         onSave={this.handleSave.bind(this)}
                         placeholder="Adicionar" />
      </footer>
    )
  }
}

CityHandler.propTypes = {
  citys: PropTypes.array.isRequired,
  addCity: PropTypes.func.isRequired
}

export default CityHandler
