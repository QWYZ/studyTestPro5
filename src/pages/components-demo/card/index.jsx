import { StarOutlined } from '@ant-design/icons';
import { PageContainer } from '@ant-design/pro-layout';
import { Alert, Card, Col, Input, Row } from 'antd';
import React, { useState, useEffect } from 'react';
import Card1 from './components/card1';

const CardDomo = () => {
    return (
        <PageContainer breadcrumb={false} subTitle={<a target={'_blank'} href={'https://qwyz.github.io/rcomponents/docs-dist/#/'} rel="noreferrer">ðæçç»ä»¶åº</a>}>
            <div>
                <Alert
                    message={<h4>Card1ç»ä»¶APIè¯´æ</h4>}
                    description={
                        <>
                            <div><b>iconï¼</b><span>å¾æ ç»ä»¶ï¼ä¾ï¼<StarOutlined /></span></div>
                            <div><b>title1ï¼</b><span>æ é¢æå­1</span></div>
                            <div><b>title2ï¼</b><span>æ é¢æå­2</span></div>
                            <div><b>background1ï¼</b><span>å¾æ ç»ä»¶æå¤å±èæ¯é¢è²ï¼ä¾ï¼</span> <span><Input size={'small'} style={{ width: 50 }} type={'color'} disabled value={'#e4ecff'} /> </span> </div>
                            <div><b>background2ï¼</b><span>å¾æ ç»ä»¶å¤å±èæ¯é¢è²ï¼ä¾ï¼</span> <span><Input size={'small'} style={{ width: 50 }} type={'color'} disabled value={'#4d7cfe'} /> </span></div>
                        </>

                    }
                    type="info"
                    showIcon
                />
                <Row gutter={15} style={{marginTop:10}}>
                    <Col span={6}>
                        <Card1 title1={'æ é¢æå­1'} title2={'æ é¢æå­2'} background1={'#e4ecff'} background2={'#4d7cfe'} icon={<StarOutlined style={{ color: '#fff', fontSize: 24 }} />} />
                    </Col>
                    <Col span={6}>
                        <Card1 title1={'74638.83'} title2={'æªæç°éé¢'} background1={'#fff3e0'} background2={'#ffab2b'} icon={<StarOutlined style={{ color: '#fff', fontSize: 24 }} />} />
                    </Col>
                    <Col span={6}>
                        <Card1 title1={'74638.83'} title2={'æªæç°éé¢'} background1={'#eaf9e1'} background2={'#6dd230'} icon={<StarOutlined style={{ color: '#fff', fontSize: 24 }} />} />
                    </Col>
                    <Col span={6}>
                        <Card1 title1={'74638.83'} title2={'æªæç°éé¢'} background1={'#ffeaf4'} background2={'#ff85c0'} icon={<StarOutlined style={{ color: '#fff', fontSize: 24 }} />} />
                    </Col>
                </Row>
            </div>

        </PageContainer>
    );
}

export default CardDomo;