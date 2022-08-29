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
    //富文本失焦就触发setContent函数设置表单的content内容
    const setContent = (e) => {
        console.log('setContent--home', e);
        // form.setFieldsValue({
        //     content: ueRef.current.getUEContent()
        // })
    };
    const [rangeValue, setRangeValue] = useState(0);

    return (
        <GridContent>
            <Row>
                <Col span={24}>
                    <Button type='link'>
                        <Link to={'/big-data/demo1'}>大屏可视化demo1</Link>
                    </Button>
                </Col>
            </Row>
        </GridContent>
    );
};

export default Home;
