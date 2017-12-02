import 'aframe';
import 'aframe-animation-component';
import 'aframe-particle-system-component';
import 'babel-polyfill';
import { Entity, Scene } from 'aframe-react';
import React from 'react';

import ActionScene from '../ActionScene/ActionScene';
import Shelter from './Shelter';

class MySceneShelter extends ActionScene<Shelter> {

    constructor(props) {
      super(props);
      this.shelter = <Shelter nbrItems={props.nbrItems}/>
    }

    render() {
      return(
        <Scene inspector='url: https://aframe.io/releases/0.3.0/aframe-inspector.min.js'>
            <a-assets>
                <img id='skyTexture' src='https://ucarecdn.com/75af695e-0a70-4c64-af3b-7279d5ad916c/' alt='altprop' />
            </a-assets>
            <Entity primitive="a-sky" height="2048" radius="30" src="#skyTexture" theta-length="90" width="2048"/>

            <Entity primitive='a-plane' position="0 -0.1 0" rotation="-90 0 0" width="60" height="60" color="#7BC8A4" />
            {this.shelter}
            <Entity primitive='a-camera' id="camera">
                <Entity primitive='a-cursor' />
            </Entity>
        </Scene>
      );
    }

}

export default MySceneShelter