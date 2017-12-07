import '../../node_modules/rc-slider/assets/index.css';
import '../../node_modules/rc-tooltip/assets/bootstrap.css';
import './style.css';
import React, { Component } from 'react';
import Tooltip from 'rc-tooltip';
import Slider from 'rc-slider';

const createSliderWithTooltip = Slider.createSliderWithTooltip;
// eslint-disable-next-line
const Range = createSliderWithTooltip(Slider.Range);
const Handle = Slider.Handle;


class ReactSlider extends Component {
    handle(props) {
        const { value, dragging, index, ...restProps } = props;
        return (
            <Tooltip
                prefixCls="rc-slider-tooltip"
                overlay={ value }
                visible={ dragging }
                placement="top"
                key={ index }
            >
                <Handle value={ value } { ...restProps } />
            </Tooltip>
        );
    }
    render() {
        const { max, min, defaultValue } = this.props;
        return (
            <div id='slider'>
              <p>{ this.props.description }</p>
              <Slider min={ min } max={ max } defaultValue={ defaultValue } onAfterChange={ this.props.sliderState } handle={ this.handle.bind(this) } />
            </div>
        )
    }
}

export default ReactSlider;
