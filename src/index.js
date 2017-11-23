import 'aframe';
import 'aframe-animation-component';
import 'aframe-particle-system-component';
import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';

import App from './app'

class Index extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (<App />);
  }
}

ReactDOM.render(<Index/>, document.querySelector('#sceneContainer'));