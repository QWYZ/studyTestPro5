import styles from './styles.less';
import React, { Component } from 'react';
import ProTable, { TableDropdown } from '@ant-design/pro-table';
import { PageContainer } from '@ant-design/pro-layout';
import { Button, Modal, message, Drawer, Tree, Spin, Switch, Popconfirm, Tag } from 'antd';
import { PlusOutlined, CloseCircleFilled } from '@ant-design/icons';
import {
    listUser,
    resetPassword,
    deleteUser,
    freezeUser
} from '@/services/system/user';
import EditUserModal from './components/EditUserModal';
import { CheckButtonPerms } from "@/components/CheckButtonPerms";

// const authority = access();
const actionRef = React.createRef();

class SysUser extends Component {
    constructor() {
        super();
        this.state = {
            visibleDrawer: false,
            menuModalData: {},
            editType: null,
        }
    }

    componentDidMount() {

    }

    _openEditUserModal = (type, data) => {
        if (type === 'add') {
            this.setState({
                visibleDrawer: true,
                menuModalData: {
                    editType: 'add',
                }
            })
        }
        if (type === 'update') {
            this.setState({
                visibleDrawer: true,
                menuModalData: {
                    editType: 'update',
                    ...data
                }
            })
        }
        if (type === 'view') {
            this.setState({
                visibleDrawer: true,
                menuModalData: {
                    editType: 'view',
                    ...data
                }
            })
        }

    }

    /**重置密码弹窗*/
    _openConfirmModal = (data, type) => {
        let title = '';
        let content = null;
        if (type === 'freezeUser') { title = `确认冻结【${data.realName}】该用户吗？` }
        if (type === 'unfreezeUser') { title = `确认解冻【${data.realName}】该用户吗？` }
        if (type === 'resetPassword') {
            title = `确认重置【${data.realName}】该账号的密码吗？`;
            content = <span style={{ color: 'gray' }}>密码将重置为：<b>123456</b></span>
        }
        Modal.confirm({
            title: title,
            content: content,
            okText: '确认',
            cancelText: '取消',
            onOk: () => {
                if (type === 'freezeUser') { this._freezeUser(data.id, 2); }
                if (type === 'unfreezeUser') { this._freezeUser(data.id, 1); }
                if (type === 'resetPassword') { this._resetPassword(data.id); }
            },
        });
    }

    /**重置密码 */
    _resetPassword = (id) => {
        resetPassword({ id: id }).then((res) => {
            if (res.success) {
                message.success('重置成功！');
                //刷新列表
                if (actionRef.current) {
                    actionRef.current.reload();
                }
            }

        })
    }

    /**删除用户 */
    _deleteUser = (id) => {
        deleteUser({ id: id }).then((res) => {
            if (res.success) {
                message.success('删除成功！');
                //刷新列表
                if (actionRef.current) {
                    actionRef.current.reload();
                }
            }
        })
    }

    /**冻结用户 */
    _freezeUser = (id, type) => {
        freezeUser({ ids: id, status: type }).then((res) => {
            if (res.success) {
                message.success(type === 1 ? '解冻成功！' : '冻结成功！');
                //刷新列表
                if (actionRef.current) {
                    actionRef.current.reload();
                }
            }
        })
    }

    /**菜单编辑成功回调 */
    _editSuccess = () => {
        this.setState({ visibleDrawer: false, menuModalData: {} })
        //刷新当前页面
        if (actionRef.current) {
            actionRef.current.reload();
        }
    }

    render() {
        const columns = [
            {
                title: '用户账户',
                dataIndex: 'userId',
                //   hideInSearch: true,
                align: 'left',
            },
            {
                title: '所属租户',
                dataIndex: 'tenantName',
                hideInSearch: true,
                align: 'left',
                render: (_, data) => {
                    const tenantName = data.relTenantIds ? (data?.tenantName || '-') : '平台'
                    return (
                        <Tag
                            style={{ backgroundColor: data.relTenantIds ? '#F38C35' : 'skyblue', borderWidth: 0, borderRadius: 4, color: 'white', cursor: 'default' }}
                            size='small'
                        >{tenantName}
                        </Tag>
                    )
                }

            },
            {
                title: '用户姓名',
                dataIndex: 'realName',
                hideInSearch: true,
                align: 'left',
            },
            {
                title: '用户角色',
                dataIndex: 'roleName',
                hideInSearch: true,
                align: 'left',
                render: (dom, data) => {
                    return dom
                }
            },
            {
                title: '手机号',
                dataIndex: 'phone',
                hideInSearch: true,
                align: 'left',
            },
            {
                title: '最近登录时间',
                dataIndex: 'lastLogin',
                hideInSearch: true,
                align: 'left',
            },
            {
                title: '用户状态',
                dataIndex: 'status',
                valueEnum: {
                    1: '正常',
                    2: '冻结',
                },
                align: 'left',
                render: (_, data) => {
                    return (
                        <Button
                            type="primary"
                            style={{ backgroundColor: data.status === 1 ? 'yellowgreen' : 'gray', borderWidth: 0, borderRadius: 4, cursor: 'default' }}
                            size={'small'}
                        >{data.status === 1 ? '正常' : '冻结'}
                        </Button>
                    )
                }
            },
            {
                title: '操作',
                hideInSearch: true,
                align: 'left',
                valueType: 'option',
                render: (_, data) => [
                    <CheckButtonPerms key={'option1'} perms={'system-user_update'}>
                        <a onClick={() => { this._openEditUserModal('update', data) }}>编辑</a>
                    </CheckButtonPerms>,
                    // <CheckButtonPerms key={'option11'} perms={'system-user_view'}>
                    //     <a onClick={() => { this._openEditUserModal('view', data) }}>查看</a>
                    // </CheckButtonPerms>,
                    <CheckButtonPerms key={'option2'} perms={'system-user_resetPassword'}>
                        <a onClick={() => { this._openConfirmModal(data, 'resetPassword') }}>重置密码</a>
                    </CheckButtonPerms>,
                    <CheckButtonPerms key={'option3'} perms={'system-user_freezeAndUnfreeze'}>
                        <a onClick={() => {
                            const type = data.status === 1 ? "freezeUser" : "unfreezeUser"
                            this._openConfirmModal(data, type)
                        }}
                        >
                            {data.status === 1 ? "冻结用户" : "解结用户"}
                        </a>
                    </CheckButtonPerms>,
                    <CheckButtonPerms key={'option4'} perms={'system-user_delete'}>
                        <Popconfirm
                            title={`确认删除【${data.realName}】该用户吗？`}
                            onConfirm={() => { this._deleteUser(data.id) }}
                            okText="确认"
                            cancelText="取消"
                        >
                            <a>删除</a>
                        </Popconfirm>
                    </CheckButtonPerms>
                ]
            }
        ]

        return (
            <PageContainer
                // header={{ title: false }}
                breadcrumb={false}
            >
                <div className={styles.container}>
                    <ProTable
                        toolBarRender={() => [
                            <CheckButtonPerms perms={'system-user_add'}>
                                <Button type="primary" onClick={() => this._openEditUserModal('add')}>
                                    <PlusOutlined />新增
                                </Button>
                            </CheckButtonPerms>
                        ]}
                        columns={columns}
                        pagination={{
                            pageSize: 10,
                            current: 1,
                        }}
                        rowKey={'id'}
                        actionRef={actionRef}
                        request={
                            (params, sorter, filter) =>
                                listUser({ ...params }).then((res) => {
                                    if (res.success) {
                                        return {
                                            data: res.result?.data || [],
                                            total: res.result?.total || 0,
                                            success: true,
                                            pageSize: res.result?.pageSize || 10,
                                            current: res.result?.current || 1,
                                        }
                                    }
                                })
                        }
                    />
                    <EditUserModal
                        visible={this.state.visibleDrawer}
                        onClose={() => { this.setState({ visibleDrawer: false }) }}
                        modalData={this.state.menuModalData}
                        onSuccess={this._editSuccess}
                    />
                </div>
            </PageContainer>
        )
    }
}

export default SysUser;