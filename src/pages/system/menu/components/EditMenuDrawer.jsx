import React, { useState, useEffect } from "react";
import { useRequest } from 'umi';
import { Col, Form, Input, message, Modal, Row, Radio, Space, Button, Drawer, Select, Spin, InputNumber, Switch } from 'antd';
import { iconData } from '@/utils/iconData';
import ChoiceIconModal from './iconClassifyModal';
import { CloseCircleFilled, SettingOutlined } from '@ant-design/icons';
// import { connect } from 'dva';
import { optionBtn } from '@/utils/dictionary';
import { editMenu, addMenu } from '@/services/system/menu'
import Checkbox from "antd/lib/checkbox/Checkbox";
import { delay } from "lodash-es";
import { NoEmojiRegexp, keyPerms } from '@/utils/regVerify';


const wrapperCol = {
    xs: 24,
    sm: 24,
    md: 24,
    lg: 24,
    xl: 16,
}
const labelCol = {
    xs: 24,
    sm: 24,
    md: 24,
    lg: 24,
    xl: 6,
}
export const EditMenuDrawer = (props) => {
    if (!props.visible) return null//增加此行判断避免浪费渲染资源
    const { visible, onClose, onSuccess, modalData } = props;
    const editType = modalData?.editType; //编辑类型
    const menuType = editType === 'add' ? String(Number(modalData?.menuType) + 1) : String(modalData?.menuType); //菜单类型
    const { data, error, loading, run } = useRequest(editType === 'add' ? addMenu : editMenu, { manual: true, });
    const [confirmLoading, setConfirmLoading] = useState(false)
    const [form] = Form.useForm();
    // console.log('data1', editType, menuType, modalData)
    const [formVals, setFormVals] = useState(
        editType === 'update' ?
            {
                menuType: modalData?.menuType,
                parentId: modalData?.parentId || null,
                name: modalData?.title || null,
                perms: modalData?.perms || null,
                menuAttributes: modalData?.menuAttributes,
                tenantDefaultMenu: modalData?.tenantDefaultMenu,
                url: modalData?.url || null,
                icon: modalData?.icon || null,
                sortNo: modalData?.sortNo || null,
                parentName: modalData?.parentName || null,
            }
            :
            {
                menuType: menuType,
                parentId: modalData?.key || null,
                menuAttributes: modalData?.menuAttributes,
                sortNo: 1,
                parentName: modalData?.parentName || null,
            }
    );


    const [modalVisible, setModalVisible] = useState(false);
    const [modalIconData, setModalIconData] = useState(null);
    const [btnDis, setBtnDis] = useState(false);
    const [businessMenu, setBusinessMenu] = useState(((editType === 'update' || menuType !== '0') && modalData.menuAttributes && modalData.menuAttributes === 1) ? 1 : 0);
    const [modalTitle, setModalTitle] = useState('新增菜单');


    const handleOk = async () => {
        form.validateFields().then(async (values) => {
            // console.log(values);
            //编辑类型存在
            if (editType && editType != '') {
                if (editType === 'add') {
                    setConfirmLoading(true);
                    addMenu({ ...values, menuType: Number(formVals?.menuType) }).then((res) => {
                        if (res.success) {
                            message.success('添加成功!');
                            form.resetFields();
                            onSuccess();
                        }
                        setConfirmLoading(false);
                    }).catch(() => { setConfirmLoading(false); })

                } else {
                    setConfirmLoading(true);
                    editMenu({ ...values, id: modalData.id }).then((res) => {
                        if (res.success) {
                            message.success('修改成功!');
                            form.resetFields();
                            onSuccess();
                        }
                        setConfirmLoading(false);
                    }).catch(() => { setConfirmLoading(false); })
                }
            } else { //提示开发者
                message.error("编辑类型未传（'add'/'update'）")
            }
        }).catch((info) => {

        });
    }


    const formMenuRender = () => {
        const selectOnChange = (e, parentPerms) => {
            for (let i = 0; i < optionBtn.length; i++) {
                if (optionBtn[i].value === e) {
                    form.setFieldsValue({
                        perms: parentPerms + optionBtn[i].perm
                    });
                    break;
                }
            }
        }
        return (
            <Form
                labelAlign={'right'}
                form={form}
                initialValues={{
                    name: formVals?.name,
                    icon: formVals?.icon,
                    perms: formVals?.perms,
                    menuAttributes: formVals?.menuAttributes,
                    url: formVals?.url,
                    parentId: formVals?.parentId,
                    sortNo: formVals?.sortNo,
                    parentName: formVals?.parentName,
                    tenantDefaultMenu: formVals?.tenantDefaultMenu,
                }}
            >
                {
                    (menuType === '1' || menuType === '2') &&
                    <>
                        <Form.Item
                            hidden={true}
                            labelCol={labelCol}
                            wrapperCol={wrapperCol}
                            tooltip={'上级菜单ID不可编辑'}
                            name={'parentId'}
                            label="上级菜单ID"
                        >
                            <Input readOnly />
                        </Form.Item>
                        <Form.Item
                            labelCol={labelCol}
                            wrapperCol={wrapperCol}
                            tooltip={'上级菜单名称不可编辑'}
                            name={'parentName'}
                            label="上级菜单"
                        >
                            <Input readOnly />
                        </Form.Item>
                    </>
                }

                {
                    (menuType === '0' || menuType === '1') &&
                    <Form.Item
                        labelCol={labelCol}
                        wrapperCol={wrapperCol}
                        name={'name'}
                        label="菜单名称"
                        rules={[
                            { required: true },
                            { pattern: /^[a-zA-Z0-9_\u4e00-\u9fa5]+$/, message: '请输入汉字、数字、英文,不超过20个字', },
                            { max: 20, message: '请输入汉字、数字、英文,不超过20个字', },
                        ]}
                    >
                        <Input allowClear />
                    </Form.Item>
                }

                {
                    (menuType === '0' || menuType === '1') &&
                    <Form.Item labelCol={labelCol} wrapperCol={wrapperCol} name={'menuAttributes'} label="菜单属性" rules={[{ required: true }]} tooltip={menuType !== '0' ? '子菜单属性跟随父级不可更改' : false}>
                        <Radio.Group onChange={(e) => { setBusinessMenu(e.target.value) }} disabled={menuType !== '0'}>
                            <Radio value={0}>系统菜单</Radio>
                            <Radio value={1}>业务菜单</Radio>
                        </Radio.Group>
                    </Form.Item>
                }

                {(businessMenu === 1) &&

                    <Form.Item
                        labelCol={labelCol}
                        wrapperCol={wrapperCol}
                        label="基础业务"
                    >
                        <Form.Item name={'tenantDefaultMenu'} valuePropName="checked" noStyle>
                            {/* <Checkbox /> */}
                            <Switch />
                            {/* <Input type={'checkbox'}/> */}
                        </Form.Item>
                        <span style={{ color: 'gray', marginLeft: 5 }}> <small>开启此项设置为租户基础菜单</small></span>
                    </Form.Item>

                }

                {
                    (menuType === '1' || menuType === '0') &&
                    <Form.Item
                        labelCol={labelCol}
                        wrapperCol={wrapperCol}
                        name={'perms'}
                        label="关键字"
                        rules={[
                            { required: true },
                            { pattern: keyPerms, message: '能录入英文字母和"-"' }
                        ]}
                    >
                        <Input allowClear />
                    </Form.Item>
                }

                {
                    (menuType === '1' || menuType === '0') &&
                    <Form.Item
                        labelCol={labelCol}
                        wrapperCol={wrapperCol}
                        name={'url'}
                        label="URL路径"
                        rules={[
                            { required: true },
                            { pattern: /^[A-Za-z-/]+$/, message: '只能录入英文和"/"' },
                        ]}
                    >
                        <Input allowClear />
                    </Form.Item>
                }

                {
                    (menuType === '1' || menuType === '0') &&
                    <Form.Item labelCol={labelCol} wrapperCol={wrapperCol} name={'icon'} label="菜单图标">
                        <Input
                            onFocus={() => { delay(() => { _openEditIconModal(), 500 }) }}
                            // readOnly
                            allowClear
                            addonAfter={
                                <SettingOutlined style={{ color: '#3165D9' }} onClick={() => { _openEditIconModal() }} />
                            }
                        />
                        {/* {this.state.icon && iconData[this.state.icon]} */}
                    </Form.Item>
                }
                {
                    menuType === '2' &&
                    <>
                        <Form.Item
                            labelCol={labelCol}
                            wrapperCol={wrapperCol}
                            name={'name'}
                            label="功能按钮"
                            rules={[{ required: true, message: '请选择按钮' }]}
                        >
                            <Select
                                disabled={editType === 'update' ? true : false}
                                placeholder={'选择按钮功能'}
                                options={optionBtn}
                                onChange={(e) => { selectOnChange(e, modalData?.perms) }}
                            ></Select>
                        </Form.Item>
                        <Form.Item
                            labelCol={labelCol}
                            wrapperCol={wrapperCol}
                            name={'perms'}
                            label="关键字"
                            rules={[
                                { required: true }
                            ]}
                        >
                            <Input readOnly />
                        </Form.Item>
                    </>
                }
                {menuType !== '2' &&
                    <Form.Item labelCol={labelCol} wrapperCol={wrapperCol} label="菜单排序" name={'sortNo'} rules={[{ required: true }]}>
                        <InputNumber min={1} step={1} precision={0} />
                    </Form.Item>
                }
            </Form>
        )
    }

    // 打开图标选择框
    const _openEditIconModal = (type) => {
        // console.log('_editIconSuccess', form.getFieldValue['icon']);
        setModalVisible(true);
        setModalIconData({
            icon: form.getFieldValue('icon')
        })
    }

    // 图标选择成功
    const _editIconSuccess = (value) => {
        // console.log('_editIconSuccess', value, form);
        form.setFieldsValue({
            icon: value
        });
        setModalVisible(false);
        setModalIconData({})
    }

    const getModalTitle = (editType, menuType) => {
        let title = '';
        if (editType === 'add') {
            title = '新增';
        } else {
            title = '编辑';
        }
        if (menuType === '1') {
            title = title + '子菜单'
        } else if (menuType === '2') {
            title = title + '按钮权限'
        } else {
            title = title + '顶级菜单'
        }

        return title
    }



    return (
        <>
            <Drawer
                title={getModalTitle(editType, menuType)}
                width={'34vw'}
                placement="right"
                closeIcon={<CloseCircleFilled style={{ fontSize: 20 }} />}
                closable={true}
                onClose={onClose}
                visible={visible}
                height={'auto'}
                key={'add'}
                bodyStyle={{ border: "1px solid rgba(220, 220, 220, 0.5)", margin: 20 }}
                // maskClosable={false}
                footer={
                    <div style={{ textAlign: 'right' }}>
                        <Button type={'default'} onClick={onClose}>关闭</Button>
                        <Button loading={confirmLoading} style={{ marginLeft: '10px' }} disabled={btnDis} type={'primary'} onClick={handleOk}>确认</Button>
                    </div>
                }
                destroyOnClose
            >

                {formMenuRender()}
            </Drawer>
            <ChoiceIconModal
                onSuccess={_editIconSuccess}
                onCancel={() => { setModalVisible(false); setModalIconData({}) }}
                modalVisible={modalVisible}
                data={modalIconData}
            />
        </>
    )
}

export default EditMenuDrawer