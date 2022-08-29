import styles from './index.less';
import { PageContainer } from '@ant-design/pro-layout';
import ProTable from '@ant-design/pro-table';
import React, { useRef } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { Button, Popconfirm } from 'antd';
import { useState } from 'react';
import EditModal from './components/EditModal';

const cityData = [
    {
        code: '0001',
        name: '北京市',
        parentCode: null,
        parentName: null,
        children: [
            {
                code: '00011',
                name: '北京市',
                parentCode: '0001',
                parentName: '北京市',
                children: []
            }
        ]
    }
]
const Area = () => {
    const actionRef = useRef();
    const [editModalType, setEditModalType] = useState({ type: '' });
    const [modalData, setModalData] = useState();

    /**新增1 */
    const _clickAdd = () => {
        setEditModalType({
            type: 'add',
            index: 1
        })
    }

    /**新增2 */
    const _clickSonAdd = (data) => {
        setEditModalType({
            type: 'add',
            index: 2
        })
        setModalData(data)
    }

    /**编辑1 */
    const _clickUpdate = (data) => {
        setEditModalType({
            type: 'update',
        })
        setModalData(data)
    }

    /**删除 */
    const _clickDelete = (data) => {

    }

    const columns = [
        {
            title: '编号',
            dataIndex: 'code',
            align: 'left',
        },
        {
            title: '地区名称',
            dataIndex: 'name',
            align: 'left',
        },
        {
            title: '操作',
            align: 'left',
            valueType: 'option',
            render: (_, data) => [
                <a key='option1' onClick={() => { _clickUpdate(data) }}>编辑</a>,
                <a key='option2' hidden={data?.menuType === 2} onClick={() => { _clickSonAdd(data) }}>添加下级</a>,
                <Popconfirm
                    key={'option3'}
                    title={`确认删除【${data.name}】吗？`}
                    onConfirm={() => { _delete(data.code) }}
                    okText="确认"
                    cancelText="取消"
                >
                    <a>删除</a>
                </Popconfirm>,
            ]
        },
    ]
    return (
        <PageContainer
            // header={{ title: false }}
            breadcrumb={false}
        >
            <div className={styles.container}>
                <ProTable
                    toolBarRender={() => [
                        <Button type="primary" onClick={() => { _clickAdd() }}>
                            <PlusOutlined />新增
                        </Button>,
                    ]}
                    pagination={false}
                    headerTitle="城市数据"
                    search={false}
                    actionRef={actionRef}
                    rowKey="code"
                    columns={columns}
                    dataSource={cityData}
                // request={(params, sorter, filter) => this._httpMemuList()}
                >

                </ProTable>
            </div>
            <EditModal
                editModalType={editModalType}
                onSuccess={() => { }}
                onCancel={() => {
                    setEditModalType({ type: '' });
                    setModalData({})
                }}
                modalVisible={editModalType.type}
                modalData={modalData}
            />
        </PageContainer>
    )
}

export default Area
