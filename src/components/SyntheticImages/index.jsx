import React, { Component, useEffect, useState } from 'react';
import SelectImage from '@/components/SelectImage'
import { Col, Divider, Form, Input, InputNumber, Row, Spin } from 'antd';
import { debounce, delay } from 'lodash';

/**合成的图像
 * @description 使用画布将多张图片合成一张图像
 */
const SyntheticImages = (props) => {

    const [loading, setLoading] = useState(false)
    const [allData, setAllData] = useState({});
    const { canvaswidth, canvasheight } = props;

    useEffect(() => {
        delay(() => {
            setLoading(false);
            initCanvas()
        }, 600)

    }, [allData])

    const initCanvas = () => {
        let canvas1 = document.getElementById("customCanvas");
        canvas1.width = props.canvaswidth;
        canvas1.height = props.canvasheight;
        let context1 = canvas1.getContext("2d");
        context1.rect(0, 0, canvas1.width, canvas1.height);
        context1.fillStyle = "#fff";
        context1.fill();

        var myImage = new Image();
        myImage.width = canvas1.width;
        myImage.height = canvas1.height;
        myImage.src = allData.backUrl && allData.backUrl[0] ? allData.backUrl[0].preview_url : '';  //背景图片 你自己本地的图片或者在线图片
        myImage.crossOrigin = 'Anonymous';
        myImage.onload = function () {
            context1.drawImage(myImage, 0, 0, canvas1.width, canvas1.height);
            var myImage2 = new Image();
            myImage2.src = allData.img1 && allData.img1[0] ? allData.img1[0].preview_url : '';  //你自己本地的图片或者在线图片
            myImage2.crossOrigin = 'Anonymous';
            myImage2.onload = function () {
                context1.drawImage(myImage2, allData.img1_left, allData.img1_top, allData.img1_width, allData.img1_height);
                var myImage3 = new Image();
                myImage3.src = allData.img2 && allData.img2[0] ? allData.img2[0].preview_url : '';  //你自己本地的图片或者在线图片
                myImage3.crossOrigin = 'Anonymous';
                myImage3.onload = function () {
                    context1.drawImage(myImage3, allData.img2_left, allData.img2_top, allData.img2_width, allData.img2_height);
                }
            }
            context1.font = `${allData.text1_fontSize}px serif`;//字体大小和类型
            // context1.font = "20px 微软雅黑";
            context1.fillStyle = allData.text1_color ?? '#000';//文字颜色
            context1.fillText(allData.text1, allData.text1_left, allData.text1_top, allData.text1_width);

            context1.font = `${allData.text2_fontSize}px serif`;//字体大小和类型
            // context1.font = "20px 微软雅黑";
            context1.fillStyle = allData.text2_color ?? '#000';//文字颜色
            context1.fillText(allData.text2, allData.text2_left, allData.text2_top, allData.text2_width);

        }

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
                    onValuesChange={(changedValues, allValues) => {
                        onValuesChange(allValues)
                    }}
                    initialValues={{
                        img1_width: 60,
                        img1_height: 60,
                        img1_left: 10,
                        img1_top: 10,
                        img2_width: 60,
                        img2_height: 60,
                        img2_left: 430,
                        img2_top: 10,
                        text1_fontSize: 30,
                        text1_width: 200,
                        text1_left: 10,
                        text1_top: 290,
                        text2_fontSize: 60,
                        text2_width: 200,
                        text2_left: 30,
                        text2_top: 100
                    }}
                >
                    <Form.Item label="背景图" name={'backUrl'} >
                        <SelectImage multiple maxNum={1} />
                    </Form.Item>
                    <Divider />
                    <Row gutter={10}>
                        <Col span={12}>
                            <Form.Item label="图片一" name={'img1'} >
                                <SelectImage multiple maxNum={1} />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item label="图标宽" name={'img1_width'} >
                                <InputNumber size='small' />
                            </Form.Item>
                            <Form.Item label="图标高" name={'img1_height'} >
                                <InputNumber size='small' />
                            </Form.Item>
                            <Form.Item label="左边距" name={'img1_left'} >
                                <InputNumber size='small' />
                            </Form.Item>
                            <Form.Item label="上边距" name={'img1_top'} >
                                <InputNumber size='small' />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Divider />
                    <Row gutter={10}>
                        <Col span={12}>
                            <Form.Item label="图片二" name={'img2'} >
                                <SelectImage multiple maxNum={1} />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item label="图标宽" name={'img2_width'} >
                                <InputNumber size='small' />
                            </Form.Item>
                            <Form.Item label="图标高" name={'img2_height'} >
                                <InputNumber size='small' />
                            </Form.Item>
                            <Form.Item label="左边距" name={'img2_left'} >
                                <InputNumber size='small' />
                            </Form.Item>
                            <Form.Item label="上边距" name={'img2_top'} >
                                <InputNumber size='small' />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Divider />
                    <Row gutter={10}>
                        <Col span={12}>
                            <Form.Item label="文字1" name={'text1'} >
                                <Input.TextArea />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item label="字体大小" name={'text1_fontSize'} >
                                <InputNumber size='small' />
                            </Form.Item>
                            <Form.Item label="字体颜色" name={'text1_color'} >
                                <Input type={'color'} style={{ width: 60 }} />
                            </Form.Item>
                            <Form.Item label="内容宽" name={'text1_width'} >
                                <InputNumber size='small' />
                            </Form.Item>
                            <Form.Item label="左边距" name={'text1_left'} >
                                <InputNumber size='small' />
                            </Form.Item>
                            <Form.Item label="上边距" name={'text1_top'} >
                                <InputNumber size='small' />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Divider />
                    <Row gutter={10}>
                        <Col span={12}>
                            <Form.Item label="文字2" name={'text2'} >
                                <Input.TextArea />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item label="字体大小" name={'text2_fontSize'} >
                                <InputNumber size='small' />
                            </Form.Item>
                            <Form.Item label="字体颜色" name={'text2_color'} >
                                <Input type={'color'} style={{ width: 60 }} />
                            </Form.Item>
                            <Form.Item label="内容宽" name={'text2_width'} >
                                <InputNumber size='small' />
                            </Form.Item>
                            <Form.Item label="左边距" name={'text2_left'} >
                                <InputNumber size='small' />
                            </Form.Item>
                            <Form.Item label="上边距" name={'text2_top'} >
                                <InputNumber size='small' />
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
            </Col>
        </Row>
    )

}

export default SyntheticImages;