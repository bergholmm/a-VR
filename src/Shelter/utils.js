import React from 'react';
import Item from './Item';

export const itemTypes = ['a-box', 'a-sphere', 'a-cylinder'];
export const itemColors = ['#4CC3D9', '#EF2D5E', '#FFC65D', '#7BC8A4', '#ca96fd', '#fdfd96'];
export const itemColors2 = ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff', '#00ffff', "#660066", '#336600', '#ff6600', '#4d1919'];

export const shuffleArray = (array) => {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array;
};

export const createIndexArray = (length) => {
    let a = []
    for (let i = 0; i < length; ++i)
        a[i]=i;

    return a;
}

export const generateItemList = (props, itemPositions, length = 9) => {
    let items = [];
    for (let i = 0; i < length; ++i) {

        let typ = itemTypes[Math.floor(Math.random()*itemTypes.length)];
        let col =  itemColors2[Math.floor(Math.random()*itemColors2.length)];

        // eslint-disable-next-line
        while(items.filter(e => e.props.primitive === typ && e.props.color === col).length > 0) {
          typ = itemTypes[Math.floor(Math.random()*itemTypes.length)];
          col =  itemColors2[Math.floor(Math.random()*itemColors2.length)];
        }

        items.push(
            <Item
                key={ i }
                id={ i }
                primitive={ typ }
                position={ itemPositions[i] }
                radius='0.3'
                height={ ((typ === 'a-sphere') ? null : '0.5' )}
                width={  ((typ === 'a-box') ? '0.5' : null) }
                depth={ ((typ === 'a-box') ? '0.5' : null)}
                color={ col }
                remove={ props.removeEntity }
                getNext={ props.getNextItem }
            />,
        );

    }

    return items;
};

// export const itemPositions = () => ['-1.3 2.8 -3.9', '0 2.8 -3.9', '1.3 2.8 -3.9', '-1.3 1.3 -3.9', '0 1.3 -3.9', '1.3 1.3 -3.9', '-1.3 0.3 -3.9', '0 0.3 -3.9', '1.3 0.3 -3.9'];
// export const itemTypes = () => ['a-box', 'a-shere', 'a-cylinder'];
// export const itemColors = () => ['blue', 'green', 'yellow', 'pink', 'red'];
