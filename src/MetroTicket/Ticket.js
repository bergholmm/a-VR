import 'aframe';
import 'aframe-animation-component';
import 'aframe-particle-system-component';
import 'babel-polyfill';
import { Entity } from 'aframe-react';
import React from 'react';

class Item extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            color: props.color,
            defaultColor: props.color,
            id: props.id,
        };
    }

    componentWillReceiveProps(nextProps) {
      this.state = {
        color: nextProps.color,
        defaultColor: nextProps.color,
        id: nextProps.id,
      };
    }

    enter() {
      if(this.props.activated() === false)
        return;
      const nextItem = this.props.getNext();
      if(nextItem === this.state.id) {
          this.setState({
              color: '#cecece',
          });
          this.tm = setTimeout(() => this.props.callback(this.state.id), 1000);
      } else {
          this.setState({
              color: '#222222',
          });
      }
    }

    leave() {
        this.setState({
            color: this.state.defaultColor,
        });
        clearTimeout(this.tm);
    }

    render () {
        return (
            <Entity
                primitive={ this.props.primitive }
                position={ this.props.position }
                rotation={ this.props.rotation }
                color={ this.state.color }
                radius={ this.props.radius }
                height={ this.props.height }
                width={ this.props.width }
                depth={ this.props.depth }
                events={{ mouseenter: this.enter.bind(this), mouseleave: this.leave.bind(this) }}>
            </Entity>
        );
    }
}

export default Item;
