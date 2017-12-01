import 'aframe';
import 'aframe-animation-component';
import 'aframe-particle-system-component';
import 'babel-polyfill';

import React from 'react';
import ReactDOM from 'react-dom';
import { Entity, Scene } from 'aframe-react';

import Shelter from './Shelter/Shelter'
import Doors from './Doors/Doors'

class App extends React.Component {
    constructor(props) {
        super(props);
        const { settings } = props;

        let shelter;
        if(settings.env == 1) {
          shelter = <Shelter nbrItems={settings.numItems}/>
        }
        else {
          shelter = <Doors nbrItems={settings.numItems}/>
        }
        this.state = {
          shelter: shelter
        }
    }

    render () {
        let shelter = this.state.shelter;

        //<Entity primitive="a-sky" height="2048" radius="30" src="#skyTexture" theta-length="90" width="2048"/>
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
