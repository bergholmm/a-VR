import 'aframe';
import 'aframe-animation-component';
import 'aframe-particle-system-component';
import 'babel-polyfill';
import { Entity, Scene } from 'aframe-react';
import React from 'react';

import ActionScene from '../ActionScene/ActionScene';
import TicketMachine from "../MetroTicket/TicketMachine";

class MetroStationScene extends ActionScene<Entity> {

  constructor(props) {
    super(props);

    this.station=<a-obj-model
        src={`url(metro_station.obj)`}
        mtl={`url(metro_station.mtl)`}
        position="0 0 0"
      />

      this.tourniquet=<a-obj-model
        src={`url(tourniquet.obj)`}
        mtl={`url(metro_station.mtl)`}
        position="6 9.9 -16"
        rotation="0 45 0"
        scale="0.02 0.02 0.02"/>

      this.ticket_machine = <TicketMachine position="19 9.9 0"
                              nbrItems={this.props.nbrItems}
                              rotation="0 -90 0"
                              callback={this.ticket_machine_callback.bind(this)}/>
      this.events = [];
      this.events.push(<a-animation attribute="position"
            dur="1000"
            easing="linear"
            to="16 12.8 0"
            begin="ticket_machine_done"/>);
  }

  ticket_machine_callback(id) {
    let camera = document.getElementById("camera");
    if(id == -1)
      camera.emit("ticket_machine_done");
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