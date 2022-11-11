import { PlusOutlined, SwapOutlined } from '@ant-design/icons';
import { PageContainer } from '@ant-design/pro-layout';
import ProTable from '@ant-design/pro-table';
import { Button, Popconfirm, Tag } from 'antd';
import React, { useState, useEffect, useRef } from 'react';
import styles from './index.less';
import { CheckCard } from '@ant-design/pro-card';
import ApiCheckModal from './components/ApiCheckModal';
import ApiCardList from './components/ApiCardList';
import { backTagRender } from './share';
const testData = [
    {
        id: 'A',
        name: '公共A',
        children: [
            {
                id: 1,
                name: '用户登录接口',
                requestType: 'POST',
                apiUrl: '/login/loginIn',
            },
            {
                id: 2,
                name: '退出登录接口',
                requestType: 'POST',
                apiUrl: '/login/loginOut',
            },
        ],
    },
    {
        id: 'A1',
        name: '菜单管理',
        children: [
            {
                id: 3,
                name: '菜单列表接口',
                requestType: 'GET',
                apiUrl: '/menu/list',
            },
            {
                id: 4,
                name: '新增菜单接口',
                requestType: 'POST',
                apiUrl: '/menu/list',
            },
            {
                id: 5,
                name: '删除菜单接口',
                requestType: 'DELETE',
                apiUrl: '/menu/list',
            },
        ],
    },
];

const ApiList = () => {
    const actionRef = useRef();
    const [apiCheckModalVisible, setApiCheckModalVisible] = useState(false);
    const [editModalType, setEditModalType] = useState({ type: '' });
    const [modalData, setModalData] = useState();
    const columns = [
        {
            title: '接口名称',
            dataIndex: 'name',
            align: 'left',
        },
        {
            title: '请求方式',
            ellipsis: true,
            dataIndex: 'requestType',
            hideInSearch: true,
            align: 'left',
            render: (dom, record, index, action) => {
                return record.requestType ? backTagRender(record.requestType) : '-';
            },
        },
        {
            title: '接口地址',
            dataIndex: 'apiUrl',
            hideInSearch: true,
            align: 'left',
            ellipsis: true,
        },
        // {
        //     title: '操作',
        //     valueType: 'option',
        //     colSize:3,
        //     align: 'left',
        //     render: (_, data) => [
        //         <a key='option1' onClick={() => {  }}>编辑</a>,
        //         <a key='option2' onClick={() => {  }}>添加下级</a>,
        //         <Popconfirm
        //             key={'option3'}
        //             title={`确认删除【${data.title}】吗？`}
        //             onConfirm={() => {  }}
        //             okText="确认"
        //             cancelText="取消"
        //         >
        //             <a>删除</a>
        //         </Popconfirm>,
        //     ]
        // }
    ];
    const [model1, setModel1] = useState(true);

    /**请求列表数据 */
    const httpList = () => { };

    /**新增 */
    const addMenu = () => {
        setEditModalType({ type: 'add' });
    };

    return (
        <>
            {model1 && (
                <PageContainer
                    breadcrumb={false}
                    extra={[
                        <Button
                            key="1"
                            type="primary"
                            icon={<SwapOutlined />}
                            onClick={() => {
                                setModel1(false);
                            }}
                        >
                            切换模式
                        </Button>,
                    ]}
                >
                    <div className={styles.container}>
                        <ProTable
                            toolBarRender={() => [
                                <Button
                                    type="primary"
                                    onClick={() => {
                                        setApiCheckModalVisible(true);
                                    }}
                                >
                                    编辑
                                </Button>,
                                <Button type="primary" onClick={() => { }}>
                                    <PlusOutlined />
                                    新增
                                </Button>,
                            ]}
                            pagination={false}
                            headerTitle="API列表"
                            search={false}
                            actionRef={actionRef}
                            rowKey="id"
                            columns={columns}
                            request={(params, sorter, filter) => httpList()}
                            dataSource={testData}
                         />
                    </div>
                    <ApiCheckModal
                        modalVisible={apiCheckModalVisible}
                        onSuccess={(value) => {
                            console.log(value);
                            setApiCheckModalVisible(false);
                        }}
                        onCancel={() => {
                            setApiCheckModalVisible(false);
                        }}
                        modalData={testData}
                    />
                </PageContainer>
            )}

            {!model1 && (
                <ApiCardList
                    data={testData}
                    changeModel={() => {
                        setModel1(true);
                    }}
                />
            )}
        </>
    );
};

export default ApiList;
