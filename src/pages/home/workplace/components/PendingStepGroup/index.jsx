// import RefundModal from '@/pages/order/components/RefundModal';
import { EllipsisOutlined } from '@ant-design/icons';
import { Button, Col, Descriptions, Dropdown, List, Menu, Progress, Row, Steps, Tooltip } from 'antd';
import React, { useState, useEffect, useRef } from 'react';
import AccountBindingModal from '../AccountBindingModal';
import styles from './index.less';


/**小程序待完善组 */
const PendingStepGroup = (props) => {
    const { loading, dataSource, size, stepSize } = props;
    // console.log(dataSource);
    //小程序账号绑定
    const [editModalType, setEditModalType] = useState({ type: '' });
    const [modalData, setModalData] = useState();
    //退款售后
    const [editModalType2, setEditModalType2] = useState({ type: '' });
    const [modalData2, setModalData2] = useState();
    const actionRef = useRef()

    const renderItem = (item) => {
        const menuOnClick = (e) => {
            // console.log('menuOnClick', e);
            switch (e.key) {
                case '1':
                    setEditModalType2({ type: 'refund' });
                    setModalData2(item.auditData)

                    break;

                default:
                    break;
            }
        }

        const menu = (
            <Menu onClick={menuOnClick}>
                <Menu.Item key="1">
                    <a>退款售后</a>
                </Menu.Item>
                {
                    item.stepCurrent === 1 && item.status === 'error' &&
                    <Menu.Item key="2">
                        <a>重新认证</a>
                    </Menu.Item>
                }
                {/* <Menu.Item key="1">
                    <a>编辑资料</a>
                </Menu.Item> */}

            </Menu>
        )
        return (
            <List.Item
                key={item.id}
                style={{ overflowX: 'auto' }}
                actions={[
                    <span>{`创建于 ${item.creatTime}`}</span>,
                    <Dropdown overlay={menu}>
                        <Button type='link'>更多操作<EllipsisOutlined /></Button>
                    </Dropdown>
                ]}
            >
                <List.Item.Meta
                    avatar={
                        null // <Progress width={40} type="circle" percent={((item.stepCurrent + 1) / 4 * 100).toFixed(1)} />
                    }
                    title={`订单号：${item.orderId}`}
                    description={
                        <div style={{ fontSize: 12 }}>
                            <Row>
                                <Col span={8}><span>小程序模板：{item.appletName}</span></Col>
                                <Col span={8}><span>企业名称：{item.auditData.name}</span></Col>
                                <Col span={8}><span>企业法人：{item.auditData.legal_persona_name}</span></Col>
                                <Col span={8}><span>企业代码：{item.auditData.code}</span></Col>
                                <Col span={8}><span>企业代码类型：{`营业执照注册号`}</span></Col>
                                <Col span={8}><span>法人微信：{item.auditData.legal_persona_wechat}</span></Col>
                            </Row>
                        </div>
                    }
                />
                <Steps
                    current={item.stepCurrent}
                    percent={50}
                    status={item.status}
                    size={stepSize || 'small'}
                // onChange={current => {
                //     console.log('onChange:', current);
                // }}
                >
                    <Steps.Step title="订单付款" />
                    <Steps.Step
                        title={<Tooltip title={item.status === 'error' && <span>审核未通过, <a>重新提交</a></span>}><span>资料认证</span></Tooltip>}
                        description={
                            item.stepCurrent === 1 &&
                            <>
                                {item.status === 'process' && <p style={{ color: '#52c41a' }}>进行中...</p>}
                                {item.status === 'error' && <Tooltip title={<span>审核未通过, <a>重新提交</a></span>}><p style={{ color: 'red' }}>未通过</p></Tooltip>}
                            </>
                        }

                    />
                    <Steps.Step
                        title="小程序账号绑定"
                        description={
                            item.stepCurrent === 2 &&
                            <a onClick={() => { setEditModalType({ type: 'blind' }); setModalData(item.auditData) }} >去绑定</a>
                        }

                    />
                    {/* <Steps.Step title="生成小程序" />
                    <Steps.Step
                        title="授权"
                        description={<Tooltip title={'我方平台对该小程序的部分操作权限'}><a disabled >授权</a></Tooltip>}
                    ></Steps.Step> */}
                    <Steps.Step title="完成" />
                </Steps>
            </List.Item>
        );
    }
    return (
        <>
            <List
                loading={loading}
                renderItem={(item) => renderItem(item)}
                dataSource={dataSource}
                itemLayout={'vertical'}
                // className={styles.activitiesList}
                size={size || "large"}
            />
            <AccountBindingModal
                editModalType={editModalType}
                onSuccess={() => {
                    actionRef.current && actionRef.current.reload()
                }}
                onCancel={() => {
                    setEditModalType({ type: '' });
                    setModalData({})
                }}
                modalVisible={editModalType.type}
                modalData={modalData}
            />
            
        </>

    );
}

export default PendingStepGroup;