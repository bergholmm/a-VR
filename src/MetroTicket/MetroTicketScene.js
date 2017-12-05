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
    this.colors = this.generateColors();
    this.next = Math.floor(Math.random()*this.props.nbrItems);

    console.log(this.colors[this.next]);

    this.machine = <TicketMachine position='0 0 8'
                                  nbrItems={this.props.nbrItems}
                                  generateColors={this.deterministicGenerateColors.bind(this)}
                                  next={this.next}
                                  rotation='0 180 0'/>

    this.doors = <Doors nbrItems={this.props.nbrItems}
                        generateColors={this.deterministicGenerateColors.bind(this)}
                        next={this.next} />;

    this.events = this.generateEvents();
  }

  generateEvents() {
    
  }

  deterministicGenerateColors() {
    return this.colors;
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
              <Entity primitive='a-cursor' />
          </Entity>
      </Scene>
    );
  }
}

export default MetroTicketScene;