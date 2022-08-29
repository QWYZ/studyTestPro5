import styles from './index.less';
import React, { Component, useRef } from 'react';
import ProTable, { TableDropdown } from '@ant-design/pro-table';
import { PageContainer } from '@ant-design/pro-layout';
import { Button, Modal, message, Drawer, Tree, Spin, Switch, Popconfirm, Tag, Card, Radio } from 'antd';
import { PlusOutlined, CloseCircleFilled } from '@ant-design/icons';
import { history } from 'umi';



const productList = () => {
    const actionRef = useRef();

    const columns = [
        {
            title: '商品ID',
            dataIndex: 'id',
            align: 'left'
        },
        {
            title: '商品图片',
            dataIndex: 'id',
            align: 'left'
        },
        {
            title: '商品名称',
            dataIndex: 'id',
            align: 'left'
        },
        {
            title: '商品价格',
            dataIndex: 'id',
            align: 'left'
        },
        {
            title: '总销量',
            dataIndex: 'id',
            align: 'left'
        },
        {
            title: '库存总量',
            dataIndex: 'id',
            align: 'left'
        },
        {
            title: '状态',
            dataIndex: 'id',
            align: 'left'
        },
        {
            title: '添加时间',
            dataIndex: 'id',
            align: 'left'
        },
        {
            title: '操作',
            valueType: 'option',
            align: 'left',
            render: (dom, data) => [
                <a key={'option1'} onClick={() => { }}>编辑</a>,
                <a key={'option2'} onClick={() => { }}>复制</a>,
                <Popconfirm
                    title={`确认删除【${data.name}】该角色吗？`}
                    onConfirm={() => { }}
                    okText="确认"
                    cancelText="取消"
                    key={'option3'}
                >
                    <a>删除</a>
                </Popconfirm>
            ]
        },
    ]
    return (
        <PageContainer
            // header={{ title: false }}
            breadcrumb={false}
        >
            <ProTable
                // headerTitle='商品列表'
                actionRef={actionRef}
                rowKey="id"
                pagination={{
                    show: true,
                    pageSize: 10,
                    current: 1,
                }}
                // search={false}
                // options={false}
                toolBarRender={() => {
                    return (
                        <>
                            <Radio.Group defaultValue={1}>
                                <Radio.Button value={1}>全部</Radio.Button>
                                <Radio.Button value={2}>出售中</Radio.Button>
                                <Radio.Button value={3}>已下架</Radio.Button>
                                <Radio.Button value={4}>已售罄</Radio.Button>
                            </Radio.Group>
                            <Button icon={<PlusOutlined />} type={'primary'} onClick={() => {
                                history.push({
                                    pathname: '/goods/createGoods',
                                    query: {},
                                })
                            }}>创建商品</Button>
                        </>
                    )
                }}
                // dataSource={dataSource}
                // request={(params, sorter, filter) => toGetCategoryList(params, sorter, filter)}
                columns={columns}
            >

            </ProTable>
        </PageContainer>
    )
}

export default productList;