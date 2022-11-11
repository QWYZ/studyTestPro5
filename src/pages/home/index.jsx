import styles from './index.less';
import React, { Component, useState } from 'react';
import { GridContent, PageContainer } from '@ant-design/pro-layout';
import { Col, Row, Layout, Card, Button, Space, Tabs, Statistic, Input } from 'antd';
import Chart1 from './components/Chart1';
import { ArrowUpOutlined, ArrowDownOutlined, LikeOutlined } from '@ant-design/icons';
import { UEditor } from '@/components/UEditor';
import StatiaticComponent1 from './components/financeStatiatic/StatiaticComponent1';
import Chart2 from './components/Chart2';
// const actionRef = React.createRef();
import SearchForm from '@/components/SearchForm';
import MapEchart from './components/mapEchart';
import { Link } from 'umi';
import ImageUpload from '@/components/ImageUpload';
import { useId } from 'react';
import Test from './Test';

const { Header, Footer, Sider, Content } = Layout;
const { TabPane } = Tabs;
const { Countdown } = Statistic;

const topColResponsiveProps = {
    xs: 24,
    sm: 12,
    md: 12,
    lg: 12,
    xl: 6,
    style: {
        marginBottom: 24,
    },
};
const towCol = {
    xs: 24,
    sm: 24,
    md: 12,
    lg: 12,
    xl: 8,
    style: {
        marginBottom: 24,
    },
};
const Home = () => {
    const deadline = Date.now() + 1000 * 60 * 60 * 24 * 2 + 1000 * 30; // Moment is also OK
    const [config] = useState({
        initialFrameWidth: '100%',
        initialFrameHeight: 400,
    });
    const [initData] = useState('');
    const [title1,setTitle1] = useState('大屏数据可视化')
    const [rangeValue, setRangeValue] = useState(0);
    //富文本失焦就触发setContent函数设置表单的content内容
    const setContent = (e) => {
        console.log('setContent--home', e);
        // form.setFieldsValue({
        //     content: ueRef.current.getUEContent()
        // })
    };


    const getlinkCss = () => {
        let headHTML = document.getElementsByTagName('head')[0].innerHTML;
        headHTML += '<link type="text/css" rel="stylesheet" href="src/assets/test.css">';
        document.getElementsByTagName('head')[0].innerHTML = headHTML;
    }
    function addCssByLink(url) {
        var doc = document;
        var link = doc.createElement("link");
        link.setAttribute("rel", "stylesheet");
        link.setAttribute("type", "text/css");
        link.setAttribute("href", url);

        var heads = doc.getElementsByTagName("head");
        if (heads.length)
            heads[0].appendChild(link);
        else
            doc.documentElement.appendChild(link);

    }
    
    return (
        <GridContent>
            <Row>
                <Col span={24}>
                    <Button type='link'>
                        <Link to={'/big-data/demo1'}>{title1}</Link>
                    </Button>
                    <Button onClick={()=>{title1 = 'hhaah'; console.log(title1)}}>一</Button>
                    <Button onClick={()=>{setTitle1('hhaah'); console.log(title1)}}>二</Button>
                    <Test />
                </Col>
            </Row>
            <Card>
                <Row>
                    <Col span={24}>
                        <ImageUpload />
                    </Col>
                </Row>
            </Card>


            <Button onClick={() => { getlinkCss(); }}>点击</Button>
        </GridContent>
    );
};

export default Home;
