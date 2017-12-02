import 'aframe';
import 'aframe-animation-component';
import 'aframe-particle-system-component';
import 'babel-polyfill';
import { Entity, Scene } from 'aframe-react';
import React from 'react';

import Shelter from '../Shelter/Shelter';
import ActionScene from '../ActionScene/ActionScene';

class SceneShelter extends ActionScene<Shelter> {

  constructor(props) {
    super(props);

    this.shelters = [];
    this.nbr_scene = 3;
    this.current = 0;

    this.animations = this.createAnimations();
    this.i = 0;

    for(let i = 0 ; i < this.nbr_scene ; i++) {
      this.shelters.push(<Shelter nbrItems={this.props.nbrItems} distance={4.5*(i+1)} callback={this.callback.bind(this)}/>);
    }
  }

  createAnimations() {
    let a = [];
    for(let i = 0 ; i < this.nbr_scene-1 ; i++) {
      a.push(<a-animation attribute="rotation"
            dur="500"
            easing="linear"
            to="0 90 0"
            begin={`event${i}`} id={`event${i}`}></a-animation>);


      a.push(<a-animation attribute="position"
              dur="2000"
              easing="linear"
              to={`${-1.3*Math.ceil(Math.sqrt(this.props.nbrItems))} 1.6 ${-i*5}`}
              begin={`eventA${i}`} id={`eventA${i}`}></a-animation>);

      a.push(<a-animation attribute="rotation"
            dur="500"
            easing="linear"
            to="0 0 0"
            begin={`eventB${i}`} id={`eventB${i}`}></a-animation>);

      a.push(<a-animation attribute="position"
            dur="2000"
            easing="linear"
            to={`${-1.3*Math.ceil(Math.sqrt(this.props.nbrItems))} 1.6 ${-(i+1)*5}`}
            begin={`eventC${i}`} id={`eventC${i}`}></a-animation>);

      a.push(<a-animation attribute="rotation"
            dur="500"
            easing="linear"
            to="0 -90 0"
            begin={`eventD${i}`} id={`eventD${i}`}></a-animation>);

      a.push(<a-animation attribute="position"
            dur="2000"
            easing="linear"
            to={`0 1.6 ${-(i+1)*5}`}
            begin={`eventE${i}`} id={`eventE${i}`}></a-animation>);

      a.push(<a-animation attribute="rotation"
            dur="500"
            easing="linear"
            to="0 0 0"
            begin={`eventF${i}`} id={`eventF${i}`}></a-animation>);
    }

    return a;
  }

  callback() {
    let camera = document.getElementById("camera");
    let i = this.i;
    camera.emit("event"+i);
    let event = document.getElementById("event"+i);
    let eventA = document.getElementById("eventA"+i);
    let eventB = document.getElementById("eventB"+i);
    let eventC = document.getElementById("eventC"+i);
    let eventD = document.getElementById("eventD"+i);
    let eventE = document.getElementById("eventE"+i);
    if(event !== null) {
      event.addEventListener('animationend', () => camera.emit("eventA"+i));
      eventA.addEventListener("animationend", () => camera.emit("eventB"+i));
      eventB.addEventListener("animationend", () => camera.emit("eventC"+i));
      eventC.addEventListener("animationend", () => camera.emit("eventD"+i));
      eventD.addEventListener("animationend", () => camera.emit("eventE"+i));
      eventE.addEventListener("animationend", () => camera.emit("eventF"+i));
    }

    this.i++;
  }

  getNextTransition() {

  }

  render() {
    return(
      <Scene inspector='url: https://aframe.io/releases/0.3.0/aframe-inspector.min.js'>
          <a-assets>
              <img id='skyTexture' src='https://ucarecdn.com/75af695e-0a70-4c64-af3b-7279d5ad916c/' alt='altprop' />
          </a-assets>
          <Entity primitive="a-sky" height="2048" radius="30" src="#skyTexture" theta-length="90" width="2048"/>

          <Entity primitive='a-plane' position="0 -0.1 0" rotation="-90 0 0" width="60" height="60" color="#7BC8A4" />
          {this.shelters}
          <Entity primitive='a-camera' id="camera">
              {this.animations}
              <Entity primitive='a-cursor' />
          </Entity>
      </Scene>
    );
  }

}

export default SceneShelter;
