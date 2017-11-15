import 'aframe';
import 'aframe-animation-component';
import 'aframe-particle-system-component';
import 'babel-polyfill';

import React from 'react';
import ReactDOM from 'react-dom';
import { Entity, Scene } from 'aframe-react';

import Item from './Item';


class App extends React.Component {
    constructor(props) {
        super(props);

        let items = [
                <Item
                    key={ 0 }
                    id={ 0 }
                    primitive='a-box'
                    position='-3 1.5 -3'
                    rotation='0 45 0'
                    color='green'
                    radius='1'
                    height='1'
                    remove={ this.removeEntity.bind(this) }
                />,
                <Item
                    key={ 1 }
                    id={ 1 }
                    primitive='a-sphere'
                    position='3 1.25 -5'
                    radius='1.25'
                    color='#EF2D5E'
                    remove={ this.removeEntity.bind(this) }
                />,
                <Item
                    key={ 2 }
                    id={ 2 }
                    primitive='a-cylinder'
                    position='3 0.75 -3'
                    radius='0.5'
                    height='1.5'
                    color='#FFC65D'
                    remove={ this.removeEntity.bind(this) }
                />
        ];

        this.state = {
            items,
            score: 0,
        };
    }
    removeEntity(id) {
        console.log(id, 'here', this.state);
        let items = this.state.items;
        items[id] = null;

        this.setState({
            items,
            score: this.state.score + 1,
        });
    }
    render () {
        return (
            <Scene inspector='url: https://aframe.io/releases/0.3.0/aframe-inspector.min.js'>
                <Entity primitive='a-plane' position='0 0 -4' rotation='-90 0 0' width='40' height='40' color='#7BC8A4' />
                <Entity primitive='a-sky' color='#ECECEC' />

                {this.state.items}
                <Entity text={{value: 'Score: ' + this.state.score, align: 'center'}} position={{x: 0, y: 2, z: -1}}/>

                <Entity primitive='a-camera'>
                    <Entity primitive='a-cursor' />
                </Entity>
            </Scene>
        );
    }
}

ReactDOM.render(<App/>, document.querySelector('#sceneContainer'));
