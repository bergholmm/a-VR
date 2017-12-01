import 'aframe';
import 'aframe-animation-component';
import 'aframe-particle-system-component';
import 'babel-polyfill';
import { Entity } from 'aframe-react';
import React from 'react';
import Chose from '../chose'
import Door from './Door'

class Doors extends Chose<Door> {

  constructor(props) {
    super(props);

    //this.station = <a-obj-model id="modelE1" src="url(metro_station.obj)" mtl="url(metro_station.mtl)" position='0 0 0' rotation="0 0 0"/>
    //this.ticket = <a-obj-model src="url(ticket_sell.obj)" mtl="url(ticket_sell.mtl)" position='0 0 0' scale="0.6 0.6 0.6"/>

    let colors = ["#ff0000", "#00ff00", "#0000ff", "#ffff00", "#ff00ff", "#00ffff"];
    this.colors = [];
    while(colors.length > 0) {
      let i = Math.floor(Math.random() * colors.length);
      this.colors.push(colors.splice(i, 1));
    }

    this.nbr_items = 3;
    this.next = Math.floor(Math.random() * this.nbr_items);

    console.log(this.next);

    this.state = {
      doors: this.generateQueueDoors(this.nbr_items)
    }
    //<a-obj-model src="url(door.obj)" mtl="url(door.mtl)" position="0 0.5 -6" scale='0.1 0.1 0.1'/>


  }

  generateQueueDoors(nbr = 3) {
    let a = [];
    for(let i = 0 ; i < nbr ; i++) {
      a.push(<Door position={`${(i-1)*5} 0 -6`}
                   color={this.colors[i]}
                   getNext={this.getNext.bind(this)}
                   callback={this.callback.bind(this)}
                   id={i}/>);
    }

    return a;
  }

  getNext() {
    return this.next;
  }

  callback(id) {
    let doors = this.state.doors;
    doors.splice(id, 1);
    this.setState({
      doors: doors
    });
  }

  render() {
    return (
      <Entity>
        {this.state.doors}
      </Entity>
    );
  }

}

export default Doors;
