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
        let door = null;
        if(props.status === "closed") {
          this.door = "door";
        } else if (props.status === "open") {
          this.door = "door_open"
        }

        if(position[0] === 0) {
          this.leave_before_enter = true;
        } else {
          this.leave_before_enter = false;
        }
    }

    componentWillReceiveProps(nextProps) {
      if(nextProps.status === "closed") {
        this.door = "door";
      } else if (nextProps.status === "open") {
        this.door = "door_open"
      }
    }

    enter() {
      if(this.leave_before_enter) {
        return;
      }
      const nextItem = this.props.getNext();

      console.log(nextItem+" => "+this.props.id);

      if(nextItem === this.props.id) {
        console.log(this.props.callback);
        this.tm = setTimeout(() => this.props.callback(this.props.id), 1000);
      }
    }

    leave() {
      this.leave_before_enter = false;
      clearTimeout(this.tm);
    }

    render () {
        console.log(this.props.id + " " + this.door);
        return (
          <Entity events={{ mouseenter: this.enter.bind(this), mouseleave: this.leave.bind(this) }}>
          <a-plane
            position={this.color_position}
            color={this.props.color}
            width="0.5"
            height="0.5"
            />
          <a-obj-model
            src={`url(${this.door}.obj)`}
            mtl={`url(${this.door}.mtl)`}
            position={this.props.position}
            scale='0.1 0.1 0.1'
            />
          </Entity>
        );
    }
}

export default Door;
