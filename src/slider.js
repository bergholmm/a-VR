import '../node_modules/rc-slider/assets/index.css';
import '../node_modules/rc-tooltip/assets/bootstrap.css';
import React from 'react';
import Tooltip from 'rc-tooltip';
import Slider from 'rc-slider';

const createSliderWithTooltip = Slider.createSliderWithTooltip;
const Range = createSliderWithTooltip(Slider.Range);
const Handle = Slider.Handle;

const handle = (props) => {
  const { value, dragging, index, ...restProps } = props;
  return (
    <Tooltip
      prefixCls="rc-slider-tooltip"
      overlay={value}
      visible={dragging}
      placement="top"
      key={index}
    >
      <Handle value={value} {...restProps} />
    </Tooltip>
  );
};

const wrapperStyle = { width: 400, margin: 50 };

const slider = (props) => (
  <div>
    <div style={wrapperStyle}>
      <p>Num items</p>
      <Slider min={0} max={20} defaultValue={9} handle={handle} />
    </div>
  </div>
);

export default slider;
