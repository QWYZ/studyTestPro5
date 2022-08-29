import React, { useEffect, useState, useRef } from 'react';
import { Form, Input } from 'antd';
import { EnvironmentOutlined } from '@ant-design/icons';
import Location from './Location';

/**
 * 坐标输入框组件
 * @description 在Location组件的基础上进一步封装的，可以直接在antd 的Form表单中使用的输入组件
 * @author 千万样子
 * @example         
    <Form.Item
        label={'描述'}
        name={'description'}
        rules={[]}
    >
        <InputLocation />
    </Form.Item>
 */
const InputLocation = (props) => {
    const { value, onChange, placeholder } = props

    const [showLocation, setShowLocation] = useState(false);

    const [inputValue, setInputValue] = useState();

    return (
        <div>
            <Input
                placeholder={placeholder}
                value={inputValue}
                onChange={onChange(inputValue)}
                addonAfter={
                    <EnvironmentOutlined
                        title="点击选择经纬度"
                        onClick={() => {
                            setShowLocation(true);
                        }}
                    />
                }

            />
            <Location
                visible={showLocation}
                close={() => { setShowLocation(false) }}
                save={(data) => {
                    setInputValue(data.coordinates)
                    setShowLocation(false)
                }}
                location={inputValue}
            />
        </div>
    )
}

export default InputLocation