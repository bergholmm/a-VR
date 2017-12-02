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

    this.animations = [];
    for(let i = 0 ; i < this.nbr_scene-1 ; i++) {
      this.animations.push(<a-animation attribute="position"
            dur="2000"
            easing="linear"
            to={`0 1.6 ${-((i+1)*5)}`}
            begin={`event${i}`}></a-animation>);
    }
    this.i = 0;

    for(let i = 0 ; i < this.nbr_scene ; i++) {
      this.shelters.push(<Shelter nbrItems={this.props.nbrItems} distance={4.5*(i+1)} callback={this.callback.bind(this)}/>);
    }
  }

  callback() {
    let camera = document.getElementById("camera");
    camera.emit("event"+this.i);
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
