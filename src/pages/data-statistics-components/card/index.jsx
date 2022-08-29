import { StarOutlined } from '@ant-design/icons';
import { PageContainer } from '@ant-design/pro-layout';
import { Alert, Card, Col, Input, Row } from 'antd';
import React, { useState, useEffect } from 'react';
import Card1 from './components/card1';

const CardDomo = () => {
    return (
        <PageContainer breadcrumb={false} subTitle={<a target={'_blank'} href={'https://qwyz.github.io/rcomponents/docs-dist/#/'}>👉我的组件库</a>}>
            <div>
                <Alert
                    message={<h4>Card1组件API说明</h4>}
                    description={
                        <>
                            <div><b>icon：</b><span>图标组件，例：<StarOutlined /></span></div>
                            <div><b>title1：</b><span>标题文字1</span></div>
                            <div><b>title2：</b><span>标题文字2</span></div>
                            <div><b>background1：</b><span>图标组件最外层背景颜色，例：</span> <span><Input size={'small'} style={{ width: 50 }} type={'color'} disabled value={'#e4ecff'} /> </span> </div>
                            <div><b>background2：</b><span>图标组件外层背景颜色，例：</span> <span><Input size={'small'} style={{ width: 50 }} type={'color'} disabled value={'#4d7cfe'} /> </span></div>
                        </>

                    }
                    type="info"
                    showIcon
                />
                <Row gutter={15} style={{marginTop:10}}>
                    <Col span={6}>
                        <Card1 title1={'标题文字1'} title2={'标题文字2'} background1={'#e4ecff'} background2={'#4d7cfe'} icon={<StarOutlined style={{ color: '#fff', fontSize: 24 }} />} />
                    </Col>
                    <Col span={6}>
                        <Card1 title1={'74638.83'} title2={'未提现金额'} background1={'#fff3e0'} background2={'#ffab2b'} icon={<StarOutlined style={{ color: '#fff', fontSize: 24 }} />} />
                    </Col>
                    <Col span={6}>
                        <Card1 title1={'74638.83'} title2={'未提现金额'} background1={'#eaf9e1'} background2={'#6dd230'} icon={<StarOutlined style={{ color: '#fff', fontSize: 24 }} />} />
                    </Col>
                    <Col span={6}>
                        <Card1 title1={'74638.83'} title2={'未提现金额'} background1={'#ffeaf4'} background2={'#ff85c0'} icon={<StarOutlined style={{ color: '#fff', fontSize: 24 }} />} />
                    </Col>
                </Row>
            </div>

        </PageContainer>
    );
}

export default CardDomo;