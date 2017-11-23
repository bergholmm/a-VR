import 'aframe';
import 'aframe-animation-component';
import 'aframe-particle-system-component';
import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import Slider, { Range } from 'rc-slider';

class Main extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
        };
    }
    render () {
        return (
            <Slider />
            <Range />
        );
    }
}


import 'aframe';
import 'aframe-animation-component';
import 'aframe-particle-system-component';
import 'babel-polyfill';

import React from 'react';
import ReactDOM from 'react-dom';
import { Entity, Scene } from 'aframe-react';

import Item from './Item'
import {
    createIndexArray,
    shuffleArray,
    generateItemList
} from './utils';


class App extends React.Component {
    constructor(props) {
        super(props);

        let queue = createIndexArray(9);
        queue = shuffleArray(queue);

        let itemProps = {
            removeEntity: this.removeEntity.bind(this),
            getNextItem: this.getNextItem.bind(this),
        }
        let items = generateItemList(itemProps);

        this.state = {
            items,
            queue,
            score: 0,
        };
    }
    removeEntity(id) {
        let items = this.state.items;
        let queue = this.state.queue;
        items[id] = null;
        queue.shift();
        console.log(items, queue);

        this.setState({
            items,
            queue,
            score: this.state.score + 1,
        });
    }
    getNextItem() {
        return this.state.queue[0];
    }
    render () {
        let { items, queue } = this.state;
        let nextItem = {};

        if (queue.length === 0) {
            items = null;
            nextItem = <Item
                    primitive='a-sphere'
                    position='2.5 1.3 -3'
                    radius='0.3'
                    color='grey'
                    remove={ () => {} }
                    getNext={ () => {} }
                />;
        } else {
            console.log("Render triggered");
            console.log(items[queue[0]].props.color);

            let x = items[queue[0]].props.color;
            nextItem = <Item
                    primitive={ items[queue[0]].props.primitive }
                    width={ items[queue[0]].props.width }
                    depth={ items[queue[0]].props.depth }
                    height={ items[queue[0]].props.height}
                    position='2.5 1.3 -3'
                    radius='0.3'
                    color={ x }
                    remove={ () => {} }
                    getNext={ () => {} }
                />
        }

        return (
            <Scene inspector='url: https://aframe.io/releases/0.3.0/aframe-inspector.min.js'>
                <a-assets>
                    <img id='skyTexture' src='https://ucarecdn.com/75af695e-0a70-4c64-af3b-7279d5ad916c/' alt='altprop' />
                </a-assets>

                <Entity primitive="a-sky" height="2048" radius="30" src="#skyTexture" theta-length="90" width="2048"/>
                <Entity primitive='a-plane' position="0 -0.1 0" rotation="-90 0 0" width="60" height="60" color="#7BC8A4" />

                <Entity primitive='a-plane' position='0 0.02 -3.97' rotation='-90 90 0' width='1' height='4' color='brown' />
                <Entity primitive='a-plane' position='-0.02 4 -3.93' rotation='90 0 90' width='1' height='4' color='brown' />
                <Entity primitive='a-plane' position='-0.02 2 -4.43' rotation='0 0 0' width='4' height='4' color='brown' />
                <Entity primitive='a-plane' position='0.01 1.0 -3.98' rotation='-84 0 0' width='4' height='1' color='black' />
                <Entity primitive='a-plane' position='0.01 2.5 -3.98' rotation='-74 0 0' width='4' height='1' color='black' />
                <Entity primitive='a-plane' position='1.98 2 -3.95' rotation='0 -90 0' width='1' height='4' color='brown' />
                <Entity primitive='a-plane' position='-2.02 2 -3.98' rotation='0 90 0' width='1' height='4' color='brown' />

                {items}
                <Entity text={{value: 'Next:', align: 'center', width: 8}} position={{x: 2.5, y: 2, z: -3}}/>
                {nextItem}
                <Entity primitive='a-camera'>
                    <Entity primitive='a-cursor' />
                </Entity>
            </Scene>
        );
    }
}

//ReactDOM.render(<App/>, document.querySelector('#sceneContainer'));
