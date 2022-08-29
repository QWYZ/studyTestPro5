import { title } from '@jiaminghi/data-view-react/lib/index-fcdce9c7';
import React, { useState, useEffect } from 'react';
import './index.less';

const Card1 = (props) => {

    const { icon, title1, title2, background1 = '#e4ecff', background2 = '#4d7cfe' } = props;

    return ( 
        <div className="data-statistics card_box">
            <div className="card_box_cir" style={{background:background1}}>
                <div className='card_box_cir1'style={{background:background2}}>
                    {icon}
                </div>
            </div>
            <div className='card_box_txt'>
                <span className='sp1'>{title1}</span>
                <span className='sp2'>{title2}</span>
            </div>
        </div>
    );
}
 
export default Card1;