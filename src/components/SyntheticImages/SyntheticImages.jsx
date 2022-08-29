import React, { Component, useEffect, useState } from 'react';
import SelectImage from '@/components/SelectImage'
import { Col, Divider, Form, Input, InputNumber, Row, Spin } from 'antd';
import { debounce, delay } from 'lodash';

/**合成的图像2（未完成）
 * @description 使用画布将多张图片合成一张图像
 */
const SyntheticImages = (props) => {
    const form = Form.useForm();
    const [loading, setLoading] = useState(false)
    const [allData, setAllData] = useState({});
    const { canvaswidth, canvasheight } = props;

    //二
    const [myImageObiect, setMyImageObiect] = useState({
        'myImage': new Image(),
        'myImage2': new Image(),
        'myImage3': new Image(),
    })
    //二
    const [imageData, setImageData] = useState([
        {
            x_left: 0,
            y_top: 0,
            width: props.canvaswidth,
            height: props.canvasheight,
            imgUrl: '',
        },
        {
            x_left: 10,
            y_top: 10,
            width: 60,
            height: 60,
            imgUrl: '',
        },
        {
            x_left: 430,
            y_top: 10,
            width: 60,
            height: 60,
            imgUrl: '',
        },
    ])

    useEffect(() => {
        delay(() => {
            setLoading(false);
            initCanvas2()
        }, 600)

    }, [allData])


    //二
    const initCanvas2 = () => {
        let canvas1 = document.getElementById("customCanvas");
        canvas1.width = props.canvaswidth;
        canvas1.height = props.canvasheight;
        let context1 = canvas1.getContext("2d");
        context1.rect(0, 0, canvas1.width, canvas1.height);
        context1.fillStyle = "#fff";
        context1.fill();
        todrawImage1(context1)
    }

    //二
    const getKeys = () => {
        let objKeys = []
        for (let keys in myImageObiect) {
            objKeys.push(keys)
        }
        return objKeys
    }

    //二
    const todrawImage2 = (item, context1, len, keys) => {
        let alllen = keys.length
        context1.drawImage(myImageObiect[item],
            imageData[alllen - len - 1].x_left,
            imageData[alllen - len - 1].y_top,
            imageData[alllen - len - 1].width, imageData[alllen - len - 1].height);
        if (len) {
            myImageObiect[keys[alllen - len]].src = imageData[alllen - len].imgUrl;
            myImageObiect[keys[alllen - len]].crossOrigin = 'Anonymous';
            myImageObiect[keys[alllen - len]].onload = () => todrawImage2(keys[alllen - len], context1, len - 1, keys)
        }
    }

    //二
    const todrawImage1 = (context1) => {
        let keys = getKeys();
        let len = keys.length;

        myImageObiect[keys[0]].src = imageData[0].imgUrl;
        myImageObiect[keys[0]].crossOrigin = 'Anonymous';
        myImageObiect[keys[0]].onload = () => todrawImage2(keys[0], context1, len - 1, keys)
    }


    const update = (e) => { setLoading(true); setAllData(e) }
    //防止画布频繁刷新抖动
    const debounced = debounce((e) => update(e), 1000, { 'maxWait': 1200 });

    const onValuesChange = (e) => {
        // console.log('onValuesChange', e);
        debounced(e)
    }

    return (

        <Row>
            {/* <Col span={24}>
                    <SelectImage value={imgs} multiple maxNum={3} onChange={(e) => { setImgs(e); console.log('imgs:', e) }} />
                </Col> */}
            <Col span={14} style={{ background: '#fff5', padding: "20px" }}>
                <Spin spinning={loading}>
                    <canvas
                        style={{ border: "1px solid gray", borderRadius: 10, height: canvasheight, width: canvaswidth, margin: 'auto' }}
                        id="customCanvas"
                        width={canvaswidth * 10}
                        height={canvasheight * 10}
                    >
                        当前浏览器不支持画布，请尝试更换浏览器
                    </canvas>
                </Spin>
            </Col>
            <Col span={10} style={{ background: '#f8f9fa', padding: "20px", height: 500, overflowY: 'auto' }}>
                <Form
                    form={form}
                    onValuesChange={(changedValues, allValues) => {
                        onValuesChange(allValues)
                    }}
                >
                    {
                        imageData.map((item, index) => {
                            return (
                                <div>
                                    <span>图片{index + 1}</span>
                                </div>
                            )
                        })
                    }

                </Form>
            </Col>
        </Row>
    )

}

export default SyntheticImages;