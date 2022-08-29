import React, { Component, useState } from 'react';
import UEditor from '@/components/UEditor/Ueditor'
/**
 * 富文本输入框组件
 * @description 适配antd Form 表单组件
 * @author 千万样子
 */
const InputUEditor = (props) =>{
    const { value, onChange, configOption} = props;
    // const ueInputRef = useRef(null);
    const [config, setConfig] = useState(configOption);
    const [initData, setInitData] = useState(value || '');
    const setContent = (e) => {
        onChange(e)
    }
    return(
        <UEditor config={config} initData={initData} setContent={(e) => setContent(e)} />
    )
}

export default InputUEditor