import styles from './index.less';
import React, { Component, useState } from 'react';
import { GridContent } from '@ant-design/pro-layout';
import { Col, Row, Layout, Card, Button, Space, Tabs, Statistic, Input } from 'antd';
import Chart1 from './components/Chart1';
import { ArrowUpOutlined, ArrowDownOutlined, LikeOutlined } from '@ant-design/icons';
import { UEditor } from '@/components/UEditor';
import StatiaticComponent1 from './components/financeStatiatic/StatiaticComponent1';
import Chart2 from './components/Chart2';
// const actionRef = React.createRef();

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
            <Row gutter={24}>
                <Col {...topColResponsiveProps}>
                    <Card>
                        <Statistic
                            title={<h2 style={{ color: 'gray' }}>自定义统计数值</h2>}
                            formatter={(value) => (
                                <Row gutter={15}>
                                    <Col span={12} style={{ color: '#3f8600' }}>
                                        <ArrowUpOutlined />
                                        {`${value[0]} %`}
                                    </Col>
                                    <Col span={12} style={{ color: '#cf1322' }}>
                                        <ArrowDownOutlined />
                                        {`${value[1]} %`}
                                    </Col>
                                </Row>
                            )}
                            value={[11.28, 12.11]}
                            precision={2}
                        />
                    </Card>
                </Col>
                <Col {...topColResponsiveProps}>
                    <Card>
                        <Statistic title={<h2 style={{ color: 'gray' }}>基本统计</h2>} value={112893} />
                    </Card>
                </Col>
                <Col {...topColResponsiveProps}>
                    <Card>
                        <Statistic
                            title={<h2 style={{ color: 'gray' }}>添加前后缀</h2>}
                            value={11.28}
                            precision={2}
                            valueStyle={{ color: '#3f8600' }}
                            prefix={<LikeOutlined />}
                            suffix="%"
                        />
                    </Card>
                </Col>
                <Col {...topColResponsiveProps}>
                    <Card>
                        <Countdown
                            title={<h2 style={{ color: 'gray' }}>倒计时</h2>}
                            value={deadline}
                            format="HH:mm:ss:SSS"
                            valueStyle={{ color: '#cf1322' }}
                        />
                    </Card>
                </Col>
            </Row>
            <Row>
                <Col span={24} style={{ marginBottom: 24 }}>
                    <Chart2 />
                </Col>
            </Row>
            <Row>
                <Col span={24} style={{ marginBottom: 24 }}>
                    <StatiaticComponent1 />
                </Col>
            </Row>

            <Row style={{ marginBottom: 24 }}>
                <Col span={24} style={{ backgroundColor: '#fffffe', padding: 10 }}>
                    <Tabs
                        tabBarExtraContent={
                            <Space size={10} align={'end'}>
                                <Button shape={'circle'} type={'primary'}>
                                    W
                                </Button>
                                <Button shape={'circle'} type={'primary'}>
                                    Y
                                </Button>
                                <Button shape={'circle'} type={'primary'}>
                                    X
                                </Button>
                            </Space>
                        }
                    >
                        <TabPane tab="首选项" key="1">
                            <Row gutter={24}>
                                <Col xs={24} sm={24} md={24} lg={24} xl={18} style={{ marginBottom: 24 }}>
                                    <Card style={{ width: '100%' }} title={'柱形图1'}>
                                        <Chart1 idString={'chart4'} cardWidth={945} />
                                    </Card>
                                </Col>
                                <Col xs={24} sm={24} md={12} lg={12} xl={6} style={{ marginBottom: 24 }}>
                                    <Card style={{ width: '100%', textAlign: 'center' }} title={'柱形图1'}>
                                        <Chart1
                                            resize={true}
                                            idString={'chart5'}
                                            cardHeight={200}
                                            cardWidth={313.8}
                                            data={{ xValue: ['Mon', 'Tue', 'Wed'], yValue: [150, 230, 224] }}
                                        />
                                    </Card>
                                </Col>
                            </Row>
                        </TabPane>
                        <TabPane tab="次选项" key="2">
                            <Row>
                                <Col span={24}>
                                    {/* <Line  data={[{x:'一',y:1},{x:'二',y:2}]} xField={'x'}  yField={'y'} height={100} width={100}  /> */}
                                </Col>
                            </Row>
                        </TabPane>
                        <TabPane tab="次选项1" key="3" />
                        <TabPane tab="次选项2" key="4" />
                        <TabPane tab="次选项3" key="5" />
                        <TabPane tab="次选项4" key="6" />
                        <TabPane tab="次选项5" key="7" />
                        <TabPane tab="次选项6" key="8" />
                        <TabPane tab="次选项7" key="9" />
                        <TabPane tab="次选项8" key="10" />
                        <TabPane tab="次选项9" key="11" />
                        <TabPane tab="次选项10" key="12" />
                        <TabPane tab="次选项11" key="13" />
                        <TabPane tab="次选项12" key="14" />
                        <TabPane tab="次选项13" key="15" />
                        <TabPane tab="次选项14" key="16" />
                        <TabPane tab="次选项15" key="17" />
                    </Tabs>
                </Col>
            </Row>
            <Row gutter={24}>
                <Col {...towCol}>
                    <Card title={'柱形图1'}>
                        <Chart1 idString={'chart1'} />
                    </Card>
                </Col>
                <Col {...towCol}>
                    <Card title={'柱形图2'}>
                        <Chart1 idString={'chart2'} />
                    </Card>
                </Col>
                <Col {...towCol}>
                    <Card title={'柱形图3'}>
                        <Chart1 idString={'chart3'} />
                    </Card>
                </Col>
            </Row>
            {/* <Row>
        <Col span={24}>
          <UEditor
            ueditorId={'ueditor1'}
            config={config}
            initData={initData}
            setContent={(e) => setContent(e)}
          ></UEditor>
        </Col>
      </Row> */}
        </GridContent>
    );
};

export default Home;
