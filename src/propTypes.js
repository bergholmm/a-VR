import { itemTypes } from './Shelter/utils';

import MySceneShelter from './Shelter/MySceneShelter'
import MySceneDoors from './Doors/MySceneDoors'
import SceneShelter from './SceneShelter/SceneShelter'


export const types = ['slider', 'selectList'];

// Props types and info about each scene
// Props types are given with a inital value
// PropsTypes specifies what type the prop is so it can be assiged to the correct setting
export const mySceneShelterProps = {
    id: 'mySceneShealter',
    name: 'Shelf Scenario',
    component: MySceneShelter,
    props: {
        nbrItems: 9,
        allowedItems: [...itemTypes],
    },
    propsTypes: {
        nbrItems: {
            type: 'slider',
            id: 'nbrItems',
            description: 'Number of items in shelf',
            min: 1,
            max: 20,
            initial: 9,
        },
        allowedItems: {
            type: 'selectList',
            id: 'allowedItems',
            description: 'Type of items',
            initial: [...itemTypes],
            allItems: [...itemTypes],
        },
    },
};

export const mySceneDoorsProps = {
    id: 'mySceneDoors',
    name: 'Doors Scenario',
    component: MySceneDoors,
    props: {
        nbrItems: 4,
    },
    propsTypes: {
        nbrItems: {
            type: 'slider',
            id: 'nbrItems',
            description: 'Number of doors',
            min: 1,
            max: 10,
            initial: 4,
        },
    },
};

export const sceneShelterProps = {
    id: 'sceneShelter',
    name: 'Mutiple Shealves Scenario',
    component: SceneShelter,
    props: {
        nbrItems: 9,
        nbrScene: 3,
        allowedItems: [...itemTypes],
    },
    propsTypes: {
        nbrItems: {
            type: 'slider',
            id: 'nbrItems',
            description: 'Number of items in shelf',
            min: 1,
            max: 20,
            initial: 9,
        },
        nbrScene: {
            type: 'slider',
            id: 'nbrScene',
            description: 'Number of shelves',
            min: 1,
            max: 10,
            initial: 3,
        },
        allowedItems: {
            type: 'selectList',
            id: 'allowedItems',
            description: 'Type of items',
            initial: [...itemTypes],
            allItems: [...itemTypes],
        },
    },
};

export const sceneProps = [mySceneShelterProps, mySceneDoorsProps, sceneShelterProps];
