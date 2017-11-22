import 'aframe';
import 'aframe-animation-component';
import 'aframe-particle-system-component';
import 'babel-polyfill';

import React from 'react';
import ReactDOM from 'react-dom';
import App from './app';
import Slider from 'rc-slider';
import Tooltip from 'rc-tooltip';
import '../node_modules/rc-slider/assets/index.css';
import './style.css';
import { itemTypes } from './utils';

const a = ['a-box', 'a-sphere', 'a-cylinder'];

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
                env: 1,
            },
            started: false,
        };
    }
    selectEnv(env) {
        let { settings } = this.state;
        settings.env = env;

        this.setState({
            settings,
        });
    }
    start() {
        this.setState({
            started: true,
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
        const { started, settings } = this.state;
        let content = <div></div>;
        console.log(settings)

        const availableItemsText = settings.allowedItems.reduce((prev, next) => prev + next + ' ', '');
        const availableItems = itemTypes.map((itemName) => {
            const index = settings.allowedItems.indexOf(itemName);
            let checked = true;

            if (index === -1) {
                checked = false;
            }
            return (
                <label className="checkbox">
                    <input onClick={ () => this.setItem(itemName) } className='radioEnv' type="checkbox" checked={ checked }/>
                {itemName}
                </label>
            );
        });

        if ( started ) {
            content = (
                <App />
            );
        } else {
            const header = (
                <div className="hero-head">
                      <section className="hero is-primary is-medium" id="contact">
                        <div className="hero-body">
                          <div className="container">
                            <div className="header-titles">
                              <h3 className="title is-3 is-spaced">App Name Here</h3>
                              <h5 className="subtitle is-5 is-spaced">A web VR game</h5>
                            </div>
                            <div className="header-buttons">
                              <span className="control">
                                <a onClick={ this.start.bind(this) } className="button is-primary">
                                  <span>Start game</span>
                                </a>
                              </span>
                            </div>
                          </div>
                        </div>
                      </section>
                </div>
            );

            const footer = (
                <div className="hero-footer footer">
                    <div className="container has-text-centered">
                        <span className="icon">
                            <i className="fa fa-github"></i>
                        </span>
                        <p><a href='https://github.com/bergholmm/a-VR'>github.com/bergholmm/a-VR</a></p>
                    </div>
                </div>
            );

            const body = (
                <div className='block'>
                    <div className='columns'>
                        <div className='column'>
                            <div className='control'>
                                <label className='radio'>
                                    <input onClick={ () => this.selectEnv(1) } className='radioEnv' type='radio' name='env' />
                                    Env 1
                                </label>
                                <label className='radio'>
                                    <input onClick={ () => this.selectEnv(2) } className='radioEnv' type='radio' name='env'/>
                                    Env 2
                                </label>
                                <label className='radio'>
                                    <input onClick={ () => this.selectEnv(3) } className='radioEnv' type='radio' name='env'/>
                                    Env 3
                                </label>
                            </div>
                            <div className='slider-container'>
                                <text> Number of items</text>
                                <Slider max={ 20 } defaultValue={ 9 } handle={ this.handle.bind(this) } onAfterChange={ this.updateSliderState.bind(this) }/>
                            </div>
                            <label className="checkbox">
                                <input onClick={ this.setRandomSeq.bind(this) }className='radioEnv' type="checkbox" checked={ settings.randomSequence }/>
                                Random sequence
                                {'  //TODO if manual seq selected -> show options for it'}
                            </label>
                            <div className='slider-container'>
                                {availableItems}
                            </div>
                        </div>
                        <div className='column'>
                            <table className='table'>
                                <thead>
                                    <tr>
                                        <th>Option</th>
                                        <th>Value</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <th>Environment</th>
                                        <th>{settings.env}</th>
                                    </tr>
                                    <tr>
                                        <th>Number of items</th>
                                        <th>{settings.numItems}</th>
                                    </tr>
                                    <tr>
                                        <th>Random sequence</th>
                                        <th>{String(settings.randomSequence)}</th>
                                    </tr>
                                    <tr>
                                        <th>Allowed items</th>
                                        <th>{availableItemsText}</th>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            );

            content = (
                <div>
                    { header }
                    { body }
                    { footer }
                </div>
            );
        }

        return (
            <div>
                {content}
            </div>
        );
    }
}

ReactDOM.render(<Index/>, document.querySelector('#sceneContainer'));
