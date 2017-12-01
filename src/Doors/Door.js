import 'aframe';
import 'aframe-animation-component';
import 'aframe-particle-system-component';
import 'babel-polyfill';
import { Entity } from 'aframe-react';
import React from 'react';

class Door extends React.Component {
    constructor(props) {
        super(props);

        let position = props.position.split(" ");
        this.color_position = position[0]+" 4 "+position[2];
    }

    componentWillReceiveProps(nextProps) {

    }

    enter() {
      const nextItem = this.props.getNext();

      console.log(nextItem+" => "+this.props.id);

      if(nextItem === this.props.id) {
        console.log(this.props.callback);
        this.tm = setTimeout(() => this.props.callback(this.props.id), 1000);
      }
    }

    leave() {
      clearTimeout(this.tm);
    }

    render () {
        return (
          <Entity events={{ mouseenter: this.enter.bind(this), mouseleave: this.leave.bind(this) }}>
          <a-plane
            position={this.color_position}
            color={this.props.color}
            width="0.5"
            height="0.5"
            />
          <a-obj-model
            src="url(door.obj)"
            mtl="url(door.mtl)"
            position={this.props.position}
            scale='0.1 0.1 0.1'
            />
          </Entity>
        );
    }
}

export default Door;
