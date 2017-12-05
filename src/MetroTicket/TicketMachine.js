import 'aframe';
import 'aframe-animation-component';
import 'aframe-particle-system-component';
import 'babel-polyfill';
import { Entity } from 'aframe-react';
import React from 'react';

import Chose from '../chose';

class TicketMachine extends Chose<Entity> {

  constructor(props) {
    super(props);

    this.machine = <a-obj-model
        src={`url(ticket_machine.obj)`}
        mtl={`url(ticket_machine.mtl)`}
        position={this.props.position}
        scale='0.05 0.05 0.05'
      />

      this.nbrItems = 3;


      this.exploitable_x = 1.9;
      this.exploitable_y = 1.45;
      let dimensions = this.generateDimension(this.nbrItems);
      this.dimensions_x = dimensions[0];
      this.dimensions_y = dimensions[1];

      this.bloc_width = this.exploitable_x/this.dimensions_x;
      this.bloc_height = this.exploitable_y/this.dimensions_y;

      this.depth = -2.98;

      this.state = {
        items: this.generateItems(this.depth)
      }

  }

  generateItems(depth) {
    let colors = this.generateColors();
    let positions = this.generatePositions(depth);

    console.log(positions);

    let items = [];
    for(let i = 0 ; i < this.nbrItems ; i++) {
      items.push(
        <Entity
          position={positions[i]}
          color={colors[i]}
          primitive='a-plane'
          width={this.bloc_width - 0.1}
          height={this.bloc_height- 0.1}
        />
      );
    }

    return items;
  }

  getNext() {
    if(typeof this.next === "undefined")
      this.next = Math.floor(Math.random()*this.nbrItems)
    return this.next;
  }

  generateColors() {
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
  generatePositions(depth) {
    let positions = [];
    for(let i = 0 ; i < this.dimensions_x ; i++) {
      let temp_x = ((i+0.5)*this.bloc_width)-this.exploitable_x/2;
      for(let j = this.dimensions_y-1 ; j >= 0 ; j--) {
        let temp_y = ((j+0.5)*this.bloc_height)+3.07-this.exploitable_y/2;
        positions.push(temp_x+" "+temp_y+" "+depth);
      }
    }

    return positions;
  }

  render() {
    return (
      <Entity>
        {this.machine}
        <a-plane position='0 3.07 -2.99' color='white' width='1.9' height='1.45' />
        {this.state.items}
      </Entity>
    );
  }


}

export default TicketMachine;
