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
    enter() {
        this.setState({
            color: 'white',
        });
        this.props.remove(this.state.id);
    }
    leave() {
        // this.setState({
        //     color: this.state.defaultColor,
        // });
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
                events={{ mouseenter: this.enter.bind(this), mouseleave: this.leave.bind(this) }}>
            </Entity>
        );
    }
}

export default Item;
