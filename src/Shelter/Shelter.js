import 'aframe';
import 'aframe-animation-component';
import 'aframe-particle-system-component';
import 'babel-polyfill';
import { Entity } from 'aframe-react';
import React from 'react';
import Item from './Item'
import Chose from '../ActionScene/chose'
import {
    createIndexArray,
    shuffleArray,
    generateItemList
} from './utils';

class Shelter extends Chose<Item> {

  constructor(props) {
    super(props);

    this.width = Math.ceil(Math.sqrt(props.nbrItems));
    this.height = this.width;
    this.coeff = 1.3;

    let distance = (typeof this.props.distance !== 'undefined') ? this.props.distance : 4.5;



    let depth = 1;
    let width = this.width*this.coeff;
    let height = this.height;

    let queue = createIndexArray(props.nbrItems);
    queue = shuffleArray(queue);

    let itemProps = {
        removeEntity: this.removeEntity.bind(this),
        getNextItem: this.getNext.bind(this),
    }

    console.log(distance);
    let positions = this.positionList(distance);
    console.log(positions);

    let listItems = generateItemList(itemProps, positions, props.nbrItems);

    let pos = [];
    for(let i = 0 ; i <= this.height ; i++) {
      pos.push(<Entity key={i} primitive='a-plane' position={`0 ${i} ${-distance+depth/2}`} rotation={`${(i < 2) ? -90 : 90} 0 90`}
        width={depth} height={width} color={(i > 0 && i < height) ? 'black' : 'brown'} />);
    }
    this.shelter = (
      <Entity>
      <Entity primitive='a-plane' position={`0 ${height/2} ${-distance}`} rotation='0 0 0' width={width} height={height} color='brown' />
      <Entity primitive='a-plane' position={`0 ${height/2} ${-distance}`} rotation='0 180 0' width={width} height={height} color='brown' />
      
      <Entity primitive='a-plane' position={`${width/2} ${height/2} ${-distance+depth/2}`} rotation='0 -90 0' width={depth} height={height} color='brown' />
      <Entity primitive='a-plane' position={`${width/2} ${height/2} ${-distance+depth/2}`} rotation='0 90 0' width={depth} height={height} color='brown' />

      <Entity primitive='a-plane' position={`${-width/2} ${height/2} ${-distance+depth/2}`} rotation='0 90 0' width={depth} height={height} color='brown' />
      <Entity primitive='a-plane' position={`${-width/2} ${height/2} ${-distance+depth/2}`} rotation='0 -90 0' width={depth} height={height} color='brown' />
      {pos}
      </Entity>
    );

    this.positionNext = ((width/2)+0.3) + ' 1.3 ' + (-distance+1.5);
    this.positionText = {
      x: ((width/2)+0.3),
      y: 2,
      z: -distance+1.5
    }

    this.state = {
      queue: queue,
      items: listItems
    }
  }

  positionList(distance) {
    let a = [];
    for(let i = this.height-1 ; i >= 0 ; i--) {
      for(let j = 0 ; j < this.width ; j++) {
        a.push((j-((this.width-1)/2))*this.coeff + ' ' + (i+0.3) + ' ' + (-distance+0.6));
      }
    }

    return a;
  }

  removeEntity(id) {
      let items = this.state.items;
      let queue = this.state.queue;
      items[id] = null;
      queue.shift();
      console.log(items, queue);

      if(!this.hasNext() && typeof this.props.callback !== "undefined") {
        this.props.callback();
      }

      this.setState( {
        items: items,
        queue: queue
      });
  }

  getNextTransition() {
  }

  getNext() {
    return this.state.queue[0];
  }

  hasNext() {
    return this.state.queue.length > 0;
  }

  render() {
    let items = this.state.items;
    let nextItem = {};
    if(!this.hasNext()) {
      nextItem = <Item
              primitive='a-sphere'
              position={this.positionNext}
              radius='0.3'
              color='grey'
              remove={ () => {} }
              getNext={ () => {} }
          />;
    } else {
      let {items, queue} = this.state;
      let x = items[queue[0]].props.color;
      nextItem = <Item
              primitive={ items[queue[0]].props.primitive }
              width={ items[queue[0]].props.width }
              depth={ items[queue[0]].props.depth }
              height={ items[queue[0]].props.height}
              position={this.positionNext}
              radius='0.3'
              color={ x }
              remove={ () => {} }
              getNext={ () => {} }
          />
    }
    return (
      <Entity>
      {items}
      {this.shelter}
      <Entity text={{value: 'Next:', align: 'center', width: 8}} position={this.positionText}/>
      {nextItem}
      </Entity>
    );
  }


}

export default Shelter;
