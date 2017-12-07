import React from 'react';
import 'babel-polyfill';
import './style.css';

import { sceneProps } from '../propTypes';

const SelectScene = (props) => {
    return (
        <div id='container'>
            <div id='titleContainer'>
                <img id='title' src={ require("../../assets/logo.png") } alt="logo"></img>
            </div>
            <div id="menuContainer">
                <div id="left"></div>
                <div onClick={ () => props.selectScene(sceneProps[2]) } id="first"><p>{sceneProps[2].name}</p></div>
                <div onClick={ () => props.selectScene(sceneProps[1]) } id="second"><p>{sceneProps[1].name}</p></div>
                <div onClick={ () => props.selectScene(sceneProps[0]) } id="third"><p>{sceneProps[0].name}</p></div>
                <div id="right"></div>
            </div>
        </div>
    );
};

export default SelectScene;
