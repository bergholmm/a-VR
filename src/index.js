import 'aframe';
import 'aframe-animation-component';
import 'aframe-particle-system-component';
import 'babel-polyfill';
import './LandingPage/style.css';

import React from 'react';
import ReactDOM from 'react-dom';
import SelectScene from './LandingPage/SelectScene';
import SelectSettings from './LandingPage/SelectSettings.js';


class Index extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            scene: null,
            started: false,
        };

    }
    selectScene(scene) {
        this.setState({
            scene,
        });
    }
    start(scene) {
        console.log(scene);
        this.setState({
            started: true,
            scene,
        });
    }
    back() {
        this.setState({
            scene: null,
        });
    }
    render () {
        const { scene, started } = this.state;
        let content = <div></div>;

        if ( started ) {
            const Scene = scene.component;
            content = (
                <Scene { ...scene.props }/>
            );
        }
        else if ( scene !== null ) {
            content = (
                <SelectSettings
                    scene={ scene }
                    back={ this.back.bind(this) }
                    start={ this.start.bind(this) }
                />
            );
        } else {
            content = (
                <SelectScene selectScene={ this.selectScene.bind(this) }/>
            );
        }

        return (
            <div id='body' >
                { content }
            </div>
        );
    }
}

ReactDOM.render(<Index/>, document.querySelector('#sceneContainer'));
