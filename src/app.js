import 'aframe';
import 'aframe-animation-component';
import 'aframe-particle-system-component';
import 'babel-polyfill';

import React from 'react';
import ReactDOM from 'react-dom';
import { Entity, Scene } from 'aframe-react';

import MySceneShelter from './Shelter/MySceneShelter'
import MySceneDoors from './Doors/MySceneDoors'
import SceneShelter from './SceneShelter/SceneShelter'

class App extends React.Component {
    constructor(props) {
        super(props);
        const { settings } = props;

        let shelter;
        if(settings.env == 1) {
          shelter = <MySceneShelter nbrItems={settings.numItems}/>
        }
        else if(settings.env == 2){
          shelter = <MySceneDoors nbrItems={settings.numItems}/>
        } else {
          shelter = <SceneShelter nbrItems={settings.numItems} />
        }
        this.state = {
          shelter: shelter
        }
    }

    render () {
        let shelter = this.state.shelter;

        //<Entity primitive="a-sky" height="2048" radius="30" src="#skyTexture" theta-length="90" width="2048"/>
        return (
            shelter
        );
    }
}

export default App;
