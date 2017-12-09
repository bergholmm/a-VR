import 'aframe';
import 'aframe-animation-component';
import 'aframe-particle-system-component';
import 'babel-polyfill';
import { Entity } from 'aframe-react';
import React from 'react';

import Chose from '../ActionScene/chose';

class Turnstile extends Chose<None> {

  constructor(props) {
    super(props);

    this.turnstyle = <a-obj-model
      src={`url(tourniquet.obj)`}
      mtl={`url(metro_station.mtl)`}
      position={this.props.position}
      rotation={this.props.rotation}
      scale="0.02 0.02 0.02"/>
  }

  enter() {
    console.log(this.props.activated());
    if(this.props.activated() === true)
      this.timer = setTimeout(() => this.props.callback(), 1000);
  }

  leave() {
    clearTimeout(this.timer);
  }

  render() {
    return (
      <Entity events={{mouseenter: this.enter.bind(this), mouseleave: this.leave.bind(this)}}>
      {this.turnstyle}
      </Entity>
    );
  }

}

export default Turnstile;
