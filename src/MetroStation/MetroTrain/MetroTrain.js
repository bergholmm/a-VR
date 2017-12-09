import 'aframe';
import 'aframe-animation-component';
import 'aframe-particle-system-component';
import 'babel-polyfill';
import { Entity } from 'aframe-react';
import React from 'react';

import Chose from '../../ActionScene/chose';

class MetroTrain extends Chose<None> {

  constructor(props) {
    super(props);

    this.wagons = this.makeWagons(3);
    this.activated = true;
  }

  makeWagons(n) {
    let wagons = [];

    for(let i = 0 ; i < n ; i++) {
      wagons.push(<a-obj-model
        src={`url(metro_wagon.obj)`}
        mtl={`url(metro_wagon.mtl)`}
        position={`0 0 ${(i*12.6) + (i*0.5)}`}
        scale="0.1 0.1 0.1"/>);
    }

    return wagons;
  }

  enter() {
    if(this.activated === false)
      return;
    this.timer = setTimeout(() => {
      this.props.callback();
      this.activated = false;
    }, 1000);
  }

  leave() {
    clearTimeout(this.timer);
  }

  render() {
    return (
      <Entity position={this.props.position}
        events={{mouseenter: this.enter.bind(this), mouseleave: this.leave.bind(this)}}>
      {this.wagons}
      </Entity>
    );
  }

}

export default MetroTrain;
