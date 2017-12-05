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

    if(typeof this.props.generateColors !== "undefined")
      this.colors = this.props.generateColors();

    this.nbr_items = this.props.nbrItems;
    this.next = (typeof this.props.next === "undefined") ? Math.floor(Math.random() * this.nbr_items) : parseInt(this.props.next);

    let depth = -8;
    let height = 10;
    this.wall = <a-plane position={`0 ${height/2} ${depth-0.01}`} width={this.nbr_items*5} height={height} color="grey"/>
    this.text = <a-text value="METRO STATION" position={`0 ${3*height/4} ${depth}`} color="red" align="center" width='16'/>

    console.log(this.next);

    this.state = {
      doors: this.generateQueueDoors(this.nbr_items, depth)
    }
    //<a-obj-model src="url(door.obj)" mtl="url(door.mtl)" position="0 0.5 -6" scale='0.1 0.1 0.1'/>


  }

  generateQueueDoors(nbr = 3, depth) {
    let a = [];
    for(let i = 0 ; i < nbr ; i++) {
      console.log(this.colors[i]);
      a.push(<Door position={`${(i-((nbr-1)/2))*5} 0 ${depth}`}
                   color={this.colors[i]}
                   getNext={this.getNext.bind(this)}
                   callback={this.callback.bind(this)}
                   id={i}
                   status="closed"/>);
    }

    return a;
  }

  getNextTransition(){}

  getNext() {
    return this.next;
  }

  hasNext() {
    return this.next > -1;
  }

  callback(id) {
    let doors = this.state.doors;
    let door = <Door position={doors[id].props.position}
                     color={doors[id].props.color}
                     getNext={doors[id].props.getNext}
                     callback={doors[id].props.callback}
                     id={doors[id].props.id}
                     status="open"/>

    doors[id] = door;

    this.next = -1;

    this.setState({
      doors: doors
    });
  }

  render() {

    let next = null;
    let text = null;
    if(this.hasNext()) {

    console.log((this.nbr_items+0.5)*5/2);
    text = <Entity text={{value: 'Next:', align: 'center', width: 8}} position={`${(this.nbr_items+0.5)*5/2} 3 -8`}/>
    next = <Entity
                  primitive="a-plane"
                  position={`${(this.nbr_items+0.5)*5/2} 2 -8`}
                  width="1"
                  height="1"
                  color={this.state.doors[this.next].props.color} />
    }

    console.log(next);

    return (
      <Entity>
        {this.wall}
        {this.text}
        {text}
        {next}
        {this.state.doors}
      </Entity>
    );
  }

}

export default Doors;
