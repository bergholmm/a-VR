import 'aframe';
import 'aframe-animation-component';
import 'aframe-particle-system-component';
import 'babel-polyfill';

import React from 'react';
import ReactDOM from 'react-dom';
import { Entity, Scene } from 'aframe-react';

import Item from './Item'
import Chose from './chose'
import Shelter from './Shelter'
import {
    createIndexArray,
    shuffleArray,
    generateItemList
} from './utils';


class App extends React.Component {
    constructor(props) {
        super(props);
        let shelter = <Shelter width='5' height='5'/>
        this.state = {
          shelter: shelter
        }
    }

    render () {
        let shelter = this.state.shelter;
        return (
            <Scene inspector='url: https://aframe.io/releases/0.3.0/aframe-inspector.min.js'>
                <a-assets>
                    <img id='skyTexture' src='https://ucarecdn.com/75af695e-0a70-4c64-af3b-7279d5ad916c/' alt='altprop' />
                </a-assets>

                <Entity primitive="a-sky" height="2048" radius="30" src="#skyTexture" theta-length="90" width="2048"/>
                <Entity primitive='a-plane' position="0 -0.1 0" rotation="-90 0 0" width="60" height="60" color="#7BC8A4" />
                {shelter}
                <Entity primitive='a-camera'>
                    <Entity primitive='a-cursor' />
                </Entity>
            </Scene>
        );
    }
}

export default App;