import 'aframe';
import 'aframe-animation-component';
import 'aframe-particle-system-component';
import 'babel-polyfill';
import { Entity, Scene } from 'aframe-react';
import React from 'react';

import ActionScene from '../ActionScene/ActionScene';
import TicketMachine from './TicketMachine';
import Doors from "../Doors/Doors";

class MetroTicketScene extends ActionScene<TicketMachine> {

  constructor(props) {
    super(props);

    this.next = Math.floor(Math.random()*this.props.nbrItems);
    this.colors = this.generateColors();
    this.colorsDoors = this.generateColorsDoors(3);

    console.log(this.colors[this.next]);

    this.machine = <TicketMachine position='0 0 8'
                                  nbrItems={this.props.nbrItems}
                                  generateColors={this.deterministicGenerateColors.bind(this)}
                                  next={this.next}
                                  rotation='0 180 0'
                                  callback={this.callback.bind(this)}/>

    this.doors = <Doors nbrItems={3}
                        generateColors={this.deterministicGenerateColorsDoors.bind(this)}
                        next={this.colorsDoorsNext} />;

    this.events = this.generateEvents();
    this.i = 1;
  }

  generateEvents() {
    let e = [];
    e.push(<a-animation attribute="rotation"
          dur="500"
          easing="linear"
          to="0 180 0"></a-animation>);
    e.push(<a-animation attribute="position"
          dur="1000"
          easing="linear"
          to="0 3 5" />)
    e.push(<a-animation attribute="rotation"
          dur="500"
          easing="linear"
          to="0 0 0"
          id={`event1`}
          begin={`event1`}></a-animation>);

    return e;
  }

  callback() {
    let camera = document.getElementById("camera");
    let i = this.i;
    camera.emit("event"+i);
  }

  deterministicGenerateColors() {
    return this.colors;
  }

  deterministicGenerateColorsDoors() {
    return this.colorsDoors;
  }

  generateColors() {

    let colors = ["#ff0000", "#00ff00", "#0000ff", '#ffff00', '#ff00ff', '#00ffff', '#660033', "#660066", '#336600', '#ff6600', '#4d1919'];
    let colors2 = [];

    while(colors.length > 0) {
      let i = Math.floor(Math.random() * colors.length);
      colors2.push(colors.splice(i, 1));
    }

    return colors2;
  }

  generateColorsDoors(n) {
    let colors2 = this.generateColors();
    let colors = [];

    for(let i = 0  ; i < n-1 ; i++) {
      if(colors2[i] === this.colors)
        i++;
      colors.push(colors2[i]);
    }

    this.colorsDoorsNext = Math.floor(Math.random()*n);
    colors.splice(this.colorsDoorsNext, 0, this.colors[this.next]);

    console.log(colors);

    return colors;
  }

  render() {
    return(
      <Scene inspector='url: https://aframe.io/releases/0.3.0/aframe-inspector.min.js'>
          <a-assets>
              <img id='skyTexture' src='https://ucarecdn.com/75af695e-0a70-4c64-af3b-7279d5ad916c/' alt='altprop' />
          </a-assets>
          <Entity primitive="a-sky" height="2048" radius="30" src="#skyTexture" theta-length="90" width="2048"/>

          {this.machine}
          {this.doors}
          <Entity primitive='a-plane' position="0 -0.1 0" rotation="-90 0 0" width="60" height="60" color="#7BC8A4" />
          <Entity primitive='a-camera' id="camera" position='0 1.8 0'>
              {this.events}
              <Entity primitive='a-cursor' />
          </Entity>
      </Scene>
    );
  }
}

export default MetroTicketScene;