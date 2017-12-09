import 'aframe';
import 'aframe-animation-component';
import 'aframe-particle-system-component';
import 'babel-polyfill';
import { Entity, Scene } from 'aframe-react';
import React from 'react';

import ActionScene from '../ActionScene/ActionScene';
import TicketMachine from "../MetroTicket/TicketMachine";
import Turnstile from './Turnstile';

class MetroStationScene extends ActionScene<Entity> {

  constructor(props) {
    super(props);

    this.station=<a-obj-model
        src={`url(metro_station.obj)`}
        mtl={`url(metro_station.mtl)`}
        position="0 0 0"
      />

      this.tourniquet = <Turnstile
        position="6 9.9 -16"
        rotation="0 45 0"
        activated={this.turnstile_activated.bind(this)}
        callback={this.turnstile_callback.bind(this)}/>

      this.ticket_machine = <TicketMachine position="19 9.9 0"
                              nbrItems={this.props.nbrItems}
                              rotation="0 -90 0"
                              callback={this.ticket_machine_callback.bind(this)}/>
      this.events = [];
      this.events.push(<a-animation attribute="position"
            dur="2000"
            easing="linear"
            to="16 12.8 0"
            begin="ticket_machine_done"/>);

      this.events.push(<a-animation attribute="rotation"
            dur="500"
            easing="linear"
            to="0 45 0"
            begin="ticket_bought"/>);
      this.events.push(<a-animation attribute="position"
            dur="1500"
            easing="linear"
            to="3 12.8 -19"
            begin="turnstile_spotted0"
            id="turnstile_spotted0"/>);
      this.events.push(<a-animation attribute="rotation"
            dur="500"
            easing="linear"
            to="0 0 0"
            begin="turnstile_spotted1"
            id="turnstile_spotted1"/>);
      this.events.push(<a-animation attribute="position"
            dur="2000"
            easing="linear"
            to="3 4.8 -29"
            begin="turnstile_spotted2"
            id="turnstile_spotted2"/>);


      this.step = 0;
  }

  ticket_machine_callback(id) {
    let camera = document.getElementById("camera");
    if(id == -1)
      camera.emit("ticket_machine_done");
    else {
      this.step = 1;
      camera.emit("ticket_bought");
    }
  }

  turnstile_callback() {
    let camera = document.getElementById("camera");
    for(let i = 0 ; i < 2 ; i++) {
      let event = document.getElementById("turnstile_spotted"+i);
      event.addEventListener('animationend', () => camera.emit("turnstile_spotted"+(i+1)));
    }

    camera.emit("turnstile_spotted0");

  }

  turnstile_activated() {
    return this.step === 1;
  }

  render() {
    return(
      <Scene inspector='url: https://aframe.io/releases/0.3.0/aframe-inspector.min.js'>

      <a-assets>
          <img id='skyTexture' src='https://ucarecdn.com/75af695e-0a70-4c64-af3b-7279d5ad916c/' alt='altprop' />
      </a-assets>
      <Entity primitive="a-sky" height="2048" radius="100" src="#skyTexture" theta-length="90" width="2048"/>
          {this.station}
          {this.ticket_machine}
          {this.tourniquet}
          <Entity primitive='a-plane' position="0 -0.1 0" rotation="-90 0 0" width="200" height="200" color="#505050" />
          <Entity primitive='a-camera' id="camera" position='0 10.8 10'>
              {this.events}
              <Entity primitive='a-cursor' />
          </Entity>
          <a-light type='point' position='-2 20 0' intensity="0.4" rotation="-90 0 0"/>
          <a-light type='point' position='-2 15 -26' intensity="0.4" rotation="-90 0 0"/>
          <a-light type='ambient' intensity='0.2'/>
      </Scene>
    );
  }
}

export default MetroStationScene;