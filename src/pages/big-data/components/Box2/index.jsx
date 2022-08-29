import React, { useState, useEffect } from 'react';
import './index.less';
import centerDetailsData1 from '../../assets/images/center-details-data1.png';

const Box2 = (props) => {
    const {title = '标题', number = 0, unit = '单位', url} = props;
    return (
        <div className='Box2'>
            <img
                src={url || centerDetailsData1}
                alt={title}
            />
            <div className='item-text'>
                <h3>{title}</h3>
                <span>{number}</span>
                <span className='unit'>{unit}</span>
            </div>
        </div>
    );
}

export default Box2;