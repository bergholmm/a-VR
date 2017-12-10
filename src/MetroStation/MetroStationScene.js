import 'aframe';
import 'aframe-animation-component';
import 'aframe-particle-system-component';
import 'babel-polyfill';
import { Entity, Scene } from 'aframe-react';
import React from 'react';

import ActionScene from '../ActionScene/ActionScene';
import TicketMachine from "../MetroTicket/TicketMachine";
import Turnstile from './Turnstile';
import MetroTrain from './MetroTrain/MetroTrain';

class MetroStationScene extends ActionScene<Entity> {

  constructor(props) {
    super(props);

    this.colors = this.generateColor();
    this.next = Math.floor(Math.random() * this.props.nbrItems);

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
                              callback={this.ticket_machine_callback.bind(this)}
                              generateColors={this.determiniticGenerateColor.bind(this)}
                              next={this.next}/>
      console.log(this.colors[this.next]);

      this.train = <MetroTrain position="0 0 0" callback={this.train_callback.bind(this)}/>
      console.log(this.train);

      this.tunnel = <Entity>
          <a-plane position='6.5 4.9 0' rotation="0 -90 0" height='10' width='30' color="black"/>
          <a-plane position='-6.5 4.9 0' rotation="0 +90 0" height='10' width='30' color="black"/>
          <a-plane position='0 9.9 0' rotation="+90 0 0" height='30' width='13' color="black"/>
          <a-plane position='0 5 -15' height='10' width='13' color='black'/>
          </Entity>

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
            to="3 3.8 -29"
            begin="turnstile_spotted2"
            id="turnstile_spotted2"/>);
      this.events.push(<a-animation attribute='position'
            dur='1000'
            easing='linear'
            to="5 3.8 -33"
            begin="getin0"
            id="getin0"/>);
      this.events.push(<a-animation attribute="rotation"
            dur="500"
            easing="linear"
            to="0 -90 0"
            begin="getin1"
            id="getin1"/>);
      this.events.push(<a-animation attribute='position'
            dur='1000'
            easing='linear'
            to="10 3.8 -33"
            begin="getin2"
            id="getin2"/>);
      this.events.push(<a-animation attribute='position'
            dur='5000'
            easing='linear'
            to='10 3.8 -73'
            begin='end'/>);

      this.step = 0;

      this.events_train = [];
      this.events_train.push(<a-animation attribute="position"
            dur="5000"
            easing="linear"
            to="10 0.7 -50"
            begin="metro"/>);
      this.events_train.push(<a-animation attribute="position"
            dur='5000'
            easing='linear'
            to='10 0.7 -90'
            begin='end'/>);
  }

  determiniticGenerateColor() {
    return this.colors;
  }

  generateColor() {
    let colors = ["#ff0000", "#00ff00", "#0000ff", '#ffff00', '#ff00ff', '#00ffff', '#660033', "#660066", '#336600', '#ff6600', '#4d1919'];
    let colors2 = [];

    while(colors.length > 0) {
      let i = Math.floor(Math.random() * colors.length);
      colors2.push(colors.splice(i, 1));
    }

    return colors2;
  }

  ticket_machine_callback(id) {
    let camera = document.getElementById("camera");
    if(id === -1)
      camera.emit("ticket_machine_done");
    else {
      this.step = 1;
      camera.emit("ticket_bought");
    }
  }

  turnstile_callback() {
    let camera = document.getElementById("camera");
    let metro = document.getElementById("metro");
    for(let i = 0 ; i < 2 ; i++) {
      let event = document.getElementById("turnstile_spotted"+i);
      event.addEventListener('animationend', () => camera.emit("turnstile_spotted"+(i+1)));
    }
    let event = document.getElementById("turnstile_spotted2");
    event.addEventListener('animationend', () => metro.emit("metro"));

    camera.emit("turnstile_spotted0");

  }

  train_callback() {
    let camera = document.getElementById("camera");
    let metro = document.getElementById('metro');
    for(let i = 0 ; i < 2 ; i++) {
      let event = document.getElementById("getin"+i);
      event.addEventListener('animationend', () => camera.emit("getin"+(i+1)));
    }

    let event = document.getElementById("getin2");
    event.addEventListener('animationend', () => {
      camera.emit("end");
      metro.emit("end");
    });

    camera.emit("getin0");
  }

  turnstile_activated() {
    return this.step === 1;
  }

  color_path() {
    let color = this.colors[this.next];

    return(
      <Entity>
        <a-plane position='-3 18 -19.99' height="3" width="8" color={color} />
        <a-plane rotation="-90 0 0" position="-3 10.01 5" height='35' width='1' color={color}/>
        <a-text value='METRO' align="center" width="20" position='-3 18 -19.98' color="white" />
      </Entity>
    );
  }

  render() {

    /*
    <a-light type='point' position='-2 20 0' intensity="0.4" rotation="-90 0 0"/>
    <a-light type='point' position='-2 15 -26' intensity="0.4" rotation="-90 0 0"/>
    <a-light type='ambient' intensity='0.2'/>
    */

    let path = this.color_path();

    return(
      <Scene inspector='url: https://aframe.io/releases/0.3.0/aframe-inspector.min.js'>

      <a-light type='point' position='-2 20 0' intensity="0.4" rotation="-90 0 0"/>
      <a-light type='point' position='-2 15 -26' intensity="0.4" rotation="-90 0 0"/>
      <a-light type='ambient' intensity='0.2'/>

      <a-assets>
          <img id='skyTexture' src='https://ucarecdn.com/75af695e-0a70-4c64-af3b-7279d5ad916c/' alt='altprop' />
      </a-assets>
      <Entity primitive="a-sky" height="2048" radius="100" src="#skyTexture" theta-length="90" width="2048"/>
          {this.station}
          {this.ticket_machine}
          {this.tourniquet}
          <Entity position='10 0.7 0' id='metro'>
            {this.events_train}
            {this.train}
          </Entity>
          <Entity position="13.5 0 -78">
            {this.tunnel}
          </Entity>
          <Entity position='-20.5 0 -78'>
            {this.tunnel}
          </Entity>
          <Entity primitive='a-plane' position="0 -0.1 0" rotation="-90 0 0" width="200" height="200" color="#202020" />
          <Entity primitive='a-camera' id="camera" position='-3 10.8 10'>
              {this.events}
              <Entity primitive='a-cursor' />
          </Entity>
          {path}
      </Scene>
    );
  }
}

export default MetroStationScene;