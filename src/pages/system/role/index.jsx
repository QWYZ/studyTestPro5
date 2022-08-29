import styles from './styles.less';
import React, { Component } from 'react';
// import { connect } from 'dva';
import ProTable, { TableDropdown } from '@ant-design/pro-table';
import { PageContainer } from '@ant-design/pro-layout';
import { PlusOutlined, CloseCircleFilled } from '@ant-design/icons';
import { queryRoleList, deleteRole, setRolePermission } from '@/services/system/role';
import { queryMenuTreeByRoleId } from '@/services/system/menu';
import EditRoleModal from "./components/EditRoleModal";
import { Row, Button, Modal, message, Drawer, Tree, Spin, Col, Popconfirm, Dropdown, Menu } from 'antd';
import { delay } from 'lodash-es';
import {
    handleIds,
} from './shareway';
import { CheckButtonPerms } from "@/components/CheckButtonPerms";
// import { Access, useAccess } from 'umi';
// import access from '@/access';


// const authority = null
const actionRef = React.createRef();

class Role extends Component {
    constructor(props) {
        super(props);
        // console.log('Role',props, authority);

        this.state = {
            editRoleModalType: '',
            modalRoleData: '',
            powerEditModal: false,
            treeData: [],
            autoExpandParent: true,
            expandedKeys: [],
            checkStrictly: true,
            checkedKeys: [],
            checkedIds: [],
            loadingTree: false,
            loadingBtn: false,
            drawerRoleData: null,
            lastPermissionIds: [],
        }
    }

    componentDidMount() {

    }


    /**
     * 删除角色弹窗
     * @param {*} data
     */
    _openDeleteRoleModal = (data) => {
        // console.log('_openDeleteRoleModal', data);
        Modal.confirm({
            title: `确认删除【${data.roleName}】该角色吗？`,
            okText: '确认',
            cancelText: '取消',
            onOk: () => {
                this._deleteRole(data.id);
            },
        });
    }

    /**
     * 删除设备
     * @param {*} id
     */
    _deleteRole = (id) => {
        deleteRole({ id: id }).then((res) => {
            if (res.success) {
                message.success('删除成功!');
                //刷新列表
                if (actionRef.current) {
                    actionRef.current.reload();
                }
            }

        })
    }

    /**
     * 打开添加或者修改设备的窗口Modal
     * @param {String} type
     */
    _openEditRoleModal = (type) => {
        if (type === 'add') {
            this.setState({ modalRoleData: {} });
        }
        this.setState({ editRoleModalType: type });
    }

    /**
     * 添加或者修改设备成功返回函数
    */
    _editRoleSuccess = () => {
        this.setState({ editRoleModalType: '', modalRoleData: {} });
        //刷新当前页面
        if (actionRef.current) {
            actionRef.current.reload();
        }
    }

    //展开勾选某个的方法
    onCheck = async (checkedKeysValue, info) => {
        // console.log('_onCheck--checkedKeysValue--', checkedKeysValue, info);
        let cureentCheckedKeys = checkedKeysValue.concat(info?.halfCheckedKeys);
        // console.log('cureentCheckedKeys',cureentCheckedKeys);
        await this.setState({ checkedKeys: checkedKeysValue, checkedIds: cureentCheckedKeys });
    };

    //展开具体某个的方法
    onExpand = expandedKeys => {
        this.setState({
            expandedKeys,
            autoExpandParent: false,
        });
    };

    deepTraversa = (node, nodeList = []) => {
        if (node !== null) {
            nodeList.push(node.key)
            if (node.children) {
                let children = node.children
                for (let i = 0; i < children.length; i++) {
                    this.deepTraversa(children[i], nodeList)
                }
            }
        }
        return nodeList
    }

    //勾选全部
    onCheckAll = () => {
        const checkedKeys = [];
        this.state.treeData.forEach(item => {
            checkedKeys.push(this.deepTraversa(item))
        })
        // console.log(checkedKeys.flat());
        this.setState({
            checkedKeys: checkedKeys.flat(),
            checkedIds: checkedKeys.flat(),
        });
    }
    //展开全部
    onExpandAll = () => {
        const expandedKeys = [];
        this.state.treeData.forEach(item => {
            expandedKeys.push(this.deepTraversa(item))
        })
        this.setState({
            autoExpandParent: true,
            expandedKeys: expandedKeys.flat()
        });
    }
    //全部取消勾选
    onCheckClose = () => {
        this.setState({
            checkedKeys: [],
            checkedIds: []
        });
    }


    //收起全部
    onExpandClose = () => {
        this.setState({
            expandedKeys: []
        });
    }

    /**
     * 提交权限设置
     * @param {*} ids
     */
    _httpRolePower = (ids, data, type) => {
        // console.log('_httpRolePower--', ids)
        let body = {
            permissionIds: (ids).toString(),
            roleId: data?.id,
            lastpermissionIds: (this.state.lastPermissionIds).toString()
        }
        // console.log('_httpRolePower--', body)
        setRolePermission(body).then((res) => {
            if (res.success) {
                message.success('权限设置成功🎉');
                if (type) {
                    this.setState({ powerEditModal: false });
                    if (actionRef.current) { actionRef.current.reload(); }
                } else {
                    this.setState({ lastPermissionIds: this.state.checkedIds });
                }

            }
            this.setState({ loadingBtn: false });
        })
    }

    /**
     * 获取权限树
     * @param {*} data
     */
    _getTreeList = (data) => {
        this.setState({ loadingTree: true })
        queryMenuTreeByRoleId({ roleId: data.id }).then((res) => {
            if (res.success) {
                this.setState({
                    treeData: res?.result?.all,
                    checkedKeys: handleIds({ ids: res?.result?.role, treeList: res?.result?.all }),
                    lastPermissionIds: res?.result?.role,
                });
            }
            delay(() => {
                this.setState({ loadingTree: false })
            }, 300)
        })
    }

    menuButton = () => (
        <Menu>
            <Menu.Item><a onClick={() => { this.onCheckAll() }}>全部勾选</a></Menu.Item>
            <Menu.Item><a onClick={() => { this.onCheckClose() }}>取消勾选</a></Menu.Item>
            <Menu.Item><a onClick={() => { this.onExpandAll() }}>展开所有</a></Menu.Item>
            <Menu.Item><a onClick={() => { this.onExpandClose() }}>合并所有</a></Menu.Item>
        </Menu>
    );

    powerEditRender = () => {
        return (
            <Drawer
                title="设置角色权限"
                placement="right"
                width={'34vw'}
                closeIcon={<CloseCircleFilled style={{ fontSize: 20 }} />}
                closable={true}
                onClose={() => {
                    this.setState({ powerEditModal: false, treeData: [], drawerRoleData: null });
                    //刷新当前页面
                    if (actionRef.current) {
                        actionRef.current.reload();
                    }
                }}
                visible={this.state.powerEditModal}
                style={this.state.loadingTree ? { textAlign: 'center' } : null}
                footer={
                    <Row gutter={24}>
                        <Col span={8} style={{ textAlign: 'left' }}>
                            <Dropdown overlay={this.menuButton} placement={'topCenter'}>
                                <Button>树操作</Button>
                            </Dropdown>
                        </Col>
                        <Col span={16} style={{ textAlign: 'right' }}>
                            <Button
                                type={'default'}
                                onClick={() => {
                                    this.setState({ powerEditModal: false, drawerRoleData: null })
                                    if (actionRef.current) { actionRef.current.reload(); }
                                }}
                            >
                                关闭
                            </Button>
                            <Button
                                style={{ marginLeft: 10 }}
                                type={'primary'}
                                loading={this.state.loadingBtn}
                                onClick={() => { this.setState({ loadingBtn: true }); this._httpRolePower(this.state.checkedIds, this.state.drawerRoleData, false) }}
                            >
                                仅保存
                            </Button>
                            <Button
                                style={{ marginLeft: 10 }}
                                type={'primary'}
                                loading={this.state.loadingBtn}
                                onClick={() => { this.setState({ loadingBtn: true }); this._httpRolePower(this.state.checkedIds, this.state.drawerRoleData, true) }}
                            >
                                保存并关闭
                            </Button>
                        </Col>

                    </Row>
                }
            >
                {this.state.loadingTree && <Spin spinning={this.state.loadingTree} />}
                {!this.state.loadingTree &&
                    <Tree
                        expandedKeys={this.state.expandedKeys}
                        checkedKeys={this.state.checkedKeys}
                        onCheck={this.onCheck}
                        onExpand={this.onExpand}
                        // checkStrictly={this.state.checkStrictly}
                        // autoExpandParent={this.state.autoExpandParent}
                        checkable={true}
                        treeData={this.state.treeData}
                    />
                }

            </Drawer>
        )
    }

    render() {

        const columns = [
            {
                title: '序号',
                valueType: 'index',
                hideInSearch: true,
                align: 'left',
            },
            {
                title: '角色名称',
                dataIndex: 'roleName',
                align: 'left',
            },
            {
                title: '角色描述',
                dataIndex: 'description',
                hideInSearch: true,
                align: 'left',
                render: (_, data) => {
                    if (data.description && data.description.length > 10) {
                        return (data.description.substring(0, 30) + '...');
                    }
                    return (data.description || '-')
                }
            },
            {
                title: '创建时间',
                dataIndex: 'createTime',
                hideInSearch: true,
                align: 'left',
            },
            {
                title: '操作',
                hideInSearch: true,
                align: 'left',
                valueType: 'option',
                render: (_, data) => [
                    <CheckButtonPerms key={'link1'} perms={'system-role_update'}><a onClick={() => { this.setState({ modalRoleData: data }); this._openEditRoleModal('update') }}>编辑</a></CheckButtonPerms>,
                    <CheckButtonPerms key={'link2'} perms={'system-role_accredit'}><a onClick={() => { this.setState({ powerEditModal: true, drawerRoleData: data }); this._getTreeList(data) }}>角色授权</a></CheckButtonPerms>,
                    <CheckButtonPerms key={'link3'} perms={'system-role_delete'}>
                        <Popconfirm
                            title={`确认删除【${data.roleName}】该角色吗？`}
                            onConfirm={() => { this._deleteRole(data.id) }}
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
                        headerTitle={'角色列表'}
                        toolBarRender={() => [
                            <CheckButtonPerms perms={'system-role_add'}>
                                <Button type="primary" onClick={() => this._openEditRoleModal('add')}>
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
                                queryRoleList({ ...params }).then((res) => {
                                    if (res.success) {
                                        return {
                                            data: res.result?.records || [],
                                            total: res.result?.total || 0,
                                            success: true,
                                            pageSize: res.result?.size || 10,
                                            current: res.result?.current || 1,
                                        }
                                    }
                                })
                        }
                    />
                    {this.powerEditRender()}
                    <EditRoleModal
                        editRoleModalType={this.state.editRoleModalType}
                        onSuccess={this._editRoleSuccess}
                        onCancel={() => { this.setState({ editRoleModalType: '', modalRoleData: {} }); }}
                        modalVisible={this.state.editRoleModalType}
                        data={this.state.modalRoleData}
                    />

                </div>
            </PageContainer>
        )
    }
}

export default Role;
