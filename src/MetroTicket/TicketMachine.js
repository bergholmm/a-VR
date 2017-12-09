import 'aframe';
import 'aframe-animation-component';
import 'aframe-particle-system-component';
import 'babel-polyfill';
import { Entity } from 'aframe-react';
import React from 'react';

import Chose from '../ActionScene/chose';
import Ticket from "./Ticket";

class TicketMachine extends Chose<Ticket> {

  constructor(props) {
    super(props);

    this.machine = <a-obj-model
        src={`url(ticket_machine.obj)`}
        mtl={`url(ticket_machine.mtl)`}
        position="0 0 0"
        scale='0.05 0.05 0.05'
      />

      this.position = [0, 0, 0];

      this.nbrItems = this.props.nbrItems;


      this.exploitable_x = 1.9;
      this.exploitable_y = 1.45;
      let dimensions = this.generateDimension(this.nbrItems);
      this.dimensions_x = dimensions[0];
      this.dimensions_y = dimensions[1];

      this.bloc_width = this.exploitable_x/this.dimensions_x;
      this.bloc_height = this.exploitable_y/this.dimensions_y;

      let next = (typeof this.props.next === "undefined") ? Math.floor(Math.random()*this.nbrItems) : this.props.next;

      this.state = {
        items: this.generateItems(),
        next: next
      }

      this.choice_component = true;

  }

  generateItems(depth) {
    let colors = this.generateColors();
    let positions = this.generatePositions();

    console.log(positions);

    let items = [];
    for(let i = 0 ; i < this.nbrItems ; i++) {
      items.push(
        <Ticket
          position={positions[i]}
          color={colors[i]}
          primitive='a-plane'
          width={this.bloc_width - 0.1}
          height={this.bloc_height- 0.1}
          id={i}
          getNext={this.getNext.bind(this)}
          callback={this.callback.bind(this)}
          activated={this.activated.bind(this)}
        />
      );
    }

    return items;
  }

  activated() {
    return this.choice_component === false;
  }

  callback(id) {
    this.setState({
      items: this.state.items,
      next: -1
    });
    if(typeof this.props.callback != "undefined")
      this.props.callback(id);

  }

  getNext() {
    return this.state.next;
  }

  hasNext() {
    return this.state.next !== -1;
  }

  generateColors() {
    if(typeof this.props.generateColors !== "undefined")
      return this.props.generateColors();

    let colors = ["#ff0000", "#00ff00", "#0000ff", '#ffff00', '#ff00ff', '#00ffff', '#660033', "#660066", '#336600', '#ff6600', '#4d1919'];
    let colors2 = [];

    while(colors.length > 0) {
      let i = Math.floor(Math.random() * colors.length);
      colors2.push(colors.splice(i, 1));
    }

    return colors2;
  }

  generateDimension(n) {
    // Number of columns by row
    let x = Math.ceil(Math.sqrt(n));
    let sqrx = Math.pow(x, 2);
    // Number of rows
    let y = x-Math.floor((sqrx-n)/x);

    return [x, y];
  }

  /* We do a square thing like last time.
   * Position of screen:
   *  - Top-left= -0.95, 3.795
   *  - Top-right = 0.95, 3.795
   *  - Bottom-left = -0.95, 2.975
   *  - Bottom-right = 0.95, 2.975
   */
  generatePositions() {
    let positions = [];
    for(let j = this.dimensions_y-1 ; j >= 0 ; j--) {
      let temp_y = ((j+0.5)*this.bloc_height)+3.07-this.exploitable_y/2 + this.position[1];
      for(let i = 0 ; i < this.dimensions_x ; i++) {
        let temp_x = ((i+0.5)*this.bloc_width)-this.exploitable_x/2 + this.position[0];
        positions.push(temp_x+" "+temp_y+" "+(this.position[2]+1.02));
      }
    }

    return positions;
  }

  enter() {

    console.log(this.choice_component);

    if(this.choice_component === false)
      return;

      this.timer = setTimeout(() => {
        this.props.callback(-1);
        this.choice_component = false;
      }, 1000);
  }

  leave() {
    clearTimeout(this.timer);
  }

  render() {

    let next = null;

    if(this.hasNext())
      next = <Entity primitive='a-plane' width='0.5' height='0.5' position={`1.5 ${3.07+this.position[1]} ${this.position[2]+1.01}`}
          color={this.state.items[this.state.next].props.color}/>
    return (
      <Entity rotation={this.props.rotation} position={this.props.position}
        events={{ mouseenter: this.enter.bind(this), mouseleave: this.leave.bind(this) }}>
        {this.machine}
        <a-plane position={`${this.position[0]} ${3.07+this.position[1]} ${this.position[2]+1.01}`} color='white' width='1.9' height='1.45' />
        {this.state.items}
        {next}
      </Entity>
    );
  }


}

export default TicketMachine;
