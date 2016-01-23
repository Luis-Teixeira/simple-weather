// import React from 'react'
// import ReactDOM from 'react-dom';
// //import routes from './routes';

// class Warper extends React.Component {
//   render() {
//     return <div>Hello World</div>;
//   }
// }

// ReactDOM.render(<Warper />, document.getElementById('app'));
import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import App from './container/App'
import configureStore from './stores/cityStore'
import { createStore } from 'redux'
//import weatherApp from './reducers/city'

const store = configureStore()
//let store = createStore(weatherApp)

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('app')
)
