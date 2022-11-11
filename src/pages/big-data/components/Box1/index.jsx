import React, { useState, useEffect } from 'react';
import './index.less';

/**
 * 盒子模型一
 * @param {*} props 标题名称 title, 盒子样式 style, 自定义副标题 subRender , 图表 chartRender
 * @returns 
 */
const Box1 = (props) => {
    const { title, style, children } = props;
    console.log(props);
    return (
        <div className="panel" style={style}>
            {title && <h2>{title}</h2>}
            <div className='chart'>
                {children}
            </div>
            {/* 伪元素绘制盒子下边角 */}
            <div className="panel-footer" />
        </div>
    );
}

export default Box1;