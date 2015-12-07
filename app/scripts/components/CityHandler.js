import React, {Component, PropTypes} from 'react'
import CityTextInput from './CityTextInput'


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
    return (
      <footer className="header">
          <CityTextInput newCity
                         onSave={this.handleSave.bind(this)}
                         placeholder="Adicionar Cidade" />
      </footer>
    )
  }
}

CityHandler.propTypes = {
  citys: PropTypes.array.isRequired,
  addCity: PropTypes.func.isRequired
}

export default CityHandler
