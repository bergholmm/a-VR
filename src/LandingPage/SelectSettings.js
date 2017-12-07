import React, { Component } from 'react';
import 'babel-polyfill';
import './style.css';
import ReactSlider from './ReactSlider';
import { types } from '../propTypes';


class SelectSettings extends Component {
    constructor(props) {
        super(props);
        this.state = {
            scene: props.scene,
        };
    }
    sliderUpdate(prop, value) {
        let { scene } = this.state;
        scene.props[prop.id] = value;
        this.setState({
            scene,
        });
    }
    renderProp(prop) {
        if (prop.type === types[0]) {
            return (
                <ReactSlider
                    key={ prop.id }
                    description={ prop.description }
                    min={ prop.min }
                    max={ prop.max }
                    defaultValue={ prop.initial }
                    sliderState={ (value) => this.sliderUpdate(prop, value) }
                />
            )
        }
        else if (prop.type === types[1]) {
            const { allItems } = prop;
            const allowedItems = this.state.scene.props[prop.id];

            const items = allItems.map((item, i) => {
                if (allowedItems.includes(item)) {
                    return (
                        <a id='itemSelected' onClick={ () => this.unSelectItem(prop, item) }>{ item }</a>
                    );
                } else {
                    return (
                        <a id='itemNotSelected' onClick={ () => this.selectItem(prop, item) }>{ item }</a>
                    );
                }
            });

            return (
                <div id='slider'>
                    <p>{ prop.description }</p>
                    <div id="itemSelectGrid">
                        { items }
                    </div>
                </div>
            );
        } else {
            return <div key={ prop.id }></div>;
        }
    }
    unSelectItem(prop, item) {
        let { scene } = this.state;
        let allowedItems = this.state.scene.props[prop.id];

        if (allowedItems.includes(item)) {
            const index = allowedItems.indexOf(item);
            allowedItems.splice(index, 1);

            scene.props[prop.id] = allowedItems;

            this.setState({
                scene,
            });
        }
    }
    selectItem(prop, item) {
        let { scene } = this.state;
        let allowedItems = this.state.scene.props[prop.id];

        if (!allowedItems.includes(item)) {
            allowedItems.push(item);
            scene.props[prop.id] = allowedItems;

            this.setState({
                scene,
            });
        }
    }
    render() {
        const { scene } = this.state;
        const { propsTypes } = scene;

        let settings = [];

        // eslint-disable-next-line
        Object.keys(propsTypes).map((prop) => {
            console.log(prop)
            settings.push(this.renderProp(propsTypes[prop]));
        });

        console.log(scene);

        return (
            <div id='container'>
                <div id='titleContainer'>
                    <img id='title' src={ require("../../assets/logo.png") } alt="logo"></img>
                </div>
                <div id='subTitleContainer'>
                    <h2 id='subTitle'>{scene.name}</h2>
                </div>
                <div id="settingsMenu">
                    { settings }
                </div>
                <div id='buttonContainer'>
                    <div onClick={ () => this.props.back() } id="button"><p>Back</p></div>
                    <div onClick={ () => this.props.start(scene) } id="button"><p>Start</p></div>
                </div>
            </div>
        );
    }
};

export default SelectSettings;

        // const availableItemsText = settings.allowedItems.reduce((prev, next) => prev + next + ' ', '');
        // const availableItems = itemTypes.map((itemName, i) => {
        //     const index = settings.allowedItems.indexOf(itemName);
        //     let checked = true;
        //
        //     if (index === -1) {
        //         checked = false;
        //     }
        //     return (
        //         <label className="checkbox">
        //             <input key={i} onClick={ () => this.setItem(itemName) } className='radioEnv' type="checkbox" checked={ checked }/>
        //         {itemName}
        //         </label>
        //     );
        // });
//
    // setItem(itemName) {
    //     let { settings } = this.state;
    //
    //     const index = settings.allowedItems.indexOf(itemName);
    //
    //     if (index === -1) {
    //         settings.allowedItems.push(itemName);
    //     } else {
    //         settings.allowedItems.splice(index, 1);
    //     }
    //
    //     this.setState({
    //         settings,
    //     });
    // }
