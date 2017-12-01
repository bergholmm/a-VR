import 'aframe';
import 'aframe-animation-component';
import 'aframe-particle-system-component';
import 'babel-polyfill';

import React from 'react';
import ReactDOM from 'react-dom';
import App from './app';
import { itemTypes } from './Shelter/utils';
import { frontPageSettings, frontPageSelectEnv } from './frontPage';

import Slider from 'rc-slider';
import Tooltip from 'rc-tooltip';
const createSliderWithTooltip = Slider.createSliderWithTooltip;
const Range = createSliderWithTooltip(Slider.Range);
const Handle = Slider.Handle;


class Index extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            settings: {
                numItems: 9,
                randomSequence: true,
                allowedItems: ['a-box', 'a-sphere', 'a-cylinder'],
                env: 1
            },
            started: false,
            envSelected: false,
        };

    }
    selectEnv(env) {
        let { settings } = this.state;
        settings.env = env;

        this.setState({
            settings,
            envSelected: true,
        });
    }
    start() {
        this.setState({
            started: true,
        });
    }
    back() {
        this.setState({
            envSelected: false,
        });
    }
    handle(props) {
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
    }
    updateSliderState(value) {
        let { settings } = this.state;
        settings.numItems = value;
        this.setState({
            settings,
        });
    }
    setRandomSeq() {
        const { settings: { randomSequence } } = this.state;
        let { settings } = this.state;

        settings.randomSequence = !randomSequence;

        this.setState({
            settings,
        });
    }
    setItem(itemName) {
        let { settings } = this.state;

        const index = settings.allowedItems.indexOf(itemName);

        if (index === -1) {
            settings.allowedItems.push(itemName);
        } else {
            settings.allowedItems.splice(index, 1);
        }

        this.setState({
            settings,
        });
    }
    render () {
        const { started, envSelected, settings } = this.state;
        let content = <div></div>;
        console.log(settings)

        const availableItemsText = settings.allowedItems.reduce((prev, next) => prev + next + ' ', '');
        const availableItems = itemTypes.map((itemName, i) => {
            const index = settings.allowedItems.indexOf(itemName);
            let checked = true;

            if (index === -1) {
                checked = false;
            }
            return (
                <label className="checkbox">
                    <input key={i} onClick={ () => this.setItem(itemName) } className='radioEnv' type="checkbox" checked={ checked }/>
                {itemName}
                </label>
            );
        });

        if ( started ) {
            content = (
                <App settings={ settings }/>
            );
        }
        else if ( envSelected ) {
            const props = {
                start: this.start.bind(this),
                back: this.back.bind(this),
                handle: this.handle.bind(this),
                updateSliderState: this.updateSliderState.bind(this),
                setRandomSeq: this.setRandomSeq.bind(this),
                settings,
                availableItems,
                availableItemsText,
            };
            content = frontPageSettings(props);
        } else {
            const props = {
                setEnv: this.selectEnv.bind(this),
            };
            content = frontPageSelectEnv(props);
        }

        return (
            <div>
                {content}
            </div>
        );
    }
}

ReactDOM.render(<Index/>, document.querySelector('#sceneContainer'));
