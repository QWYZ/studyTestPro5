import { PlusOutlined } from '@ant-design/icons';
import { PageContainer } from '@ant-design/pro-layout';
import ProTable from '@ant-design/pro-table';
import { Button, message, Popconfirm } from 'antd';
import React, { useState, useEffect, useRef } from 'react';
import styles from './index.less';
import EditMenuModal from './components/EditMenuModal';

const testData = [
  {
    id: '1',
    parentIds: null,
    name: '系统管理',
    type: 1,
    icon: 'setting',
    routeUrl: '/system',
    authorityKeyword: 'system',
    sortNo: 1,
    children: [
      {
        id: '11',
        parentIds: ['1'],
        name: '菜单权限',
        type: 1,
        routeUrl: '/system/menu',
        authorityKeyword: 'system-menu',
        sortNo: 1,
      },
    ],
  },
];

const Menu = () => {
  const actionRef = useRef();
  const [editModalType, setEditModalType] = useState({ type: '' });
  const [modalData, setModalData] = useState();
  const columns = [
    {
      title: '名称',
      dataIndex: 'name',
      align: 'left',
    },
    // {
    //     title: '图标',
    //     ellipsis: true,
    //     dataIndex: 'icon',
    //     hideInSearch: true,
    //     align: 'left',
    // },
    // {
    //   title: '接口路径',
    //   dataIndex: 'apiUrl',
    //   hideInSearch: true,
    //   align: 'left',
    //   ellipsis: true,
    // },
    {
      title: '路由地址',
      dataIndex: 'routeUrl',
      hideInSearch: true,
      align: 'left',
      ellipsis: true,
    },
    {
      title: '权限标识',
      ellipsis: true,
      dataIndex: 'authorityKeyword',
      hideInSearch: true,
      align: 'left',
    },
    {
      title: '操作',
      valueType: 'option',
      colSize: 3,
      align: 'left',
      render: (_, data) => [
        <a
          key="option1"
          onClick={() => {
            setEditModalType({ type: 'update' });
            setModalData(data);
          }}
        >
          编辑
        </a>,
        // <a key='option2' onClick={() => {  }}>添加下级</a>,
        <Popconfirm
          key={'option3'}
          title={`确认删除【${data.name}】吗？`}
          onConfirm={() => { }}
          okText="确认"
          cancelText="取消"
        >
          <a>删除</a>
        </Popconfirm>,
      ],
    },
  ];

  const _httpMemuList = () => { };

  const addMenu = () => {
    setEditModalType({ type: 'add' });
  };

  const editSuccess = (value) => {
    console.log(value);
    setEditModalType({ type: '' });
    message.success('假装编辑成功');
  };

  return (
    <PageContainer breadcrumb={false}>
      <div className={styles.container}>
        <ProTable
          toolBarRender={() => [
            <Button
              type="primary"
              onClick={() => {
                addMenu();
              }}
            >
              <PlusOutlined />
              新增
            </Button>,
          ]}
          pagination={false}
          headerTitle="菜单管理"
          search={false}
          actionRef={actionRef}
          rowKey="id"
          columns={columns}
          request={(params, sorter, filter) => _httpMemuList()}
          dataSource={testData}
         />
      </div>
      <EditMenuModal
        editModalType={editModalType}
        onSuccess={editSuccess}
        onCancel={() => {
          setEditModalType({ type: '' });
          setModalData({});
        }}
        modalVisible={editModalType.type}
        modalData={modalData}
      />
    </PageContainer>
  );
};

export default Menu;
