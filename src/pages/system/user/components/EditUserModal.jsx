import React, { useEffect, useState } from "react";
import { Col, Form, Input, message, Modal, Row, Select, InputNumber, Drawer, Button } from 'antd';
import { addUser, editUser } from '@/services/system/user';
import { onlyZh, validUserNameRegexp, phoneRegexp, isNumbersAndLetters } from '@/utils/regVerify';
import { queryRoleDropDown } from "@/services/system/role";
import { CloseCircleFilled, IdcardOutlined, MobileOutlined, TeamOutlined, UserOutlined } from "@ant-design/icons";
import { delay } from "lodash-es";
import Avatar from "antd/lib/avatar/avatar";

export const EditUserModal = (props) => {
  if (!props.visible) return null//增加此行判断避免浪费渲染资源
  const { visible, onSuccess, modalData, onClose } = props;
  const relTenant = (modalData?.relTenantIds && modalData?.relTenantIds[0]) ? true : false;
  const editType = modalData?.editType; //编辑类型
  const [form] = Form.useForm();
  const [confirmLoading, setConfirmLoading] = useState(false)
  const [roleDropDownData, setRoleDropDownData] = useState([]);
  const [formVals, setFormVals] = useState({
    userId: modalData?.userId || null,
    realName: modalData?.realName || null,
    roleIds: modalData.roleIds ? (modalData?.roleIds[0] || null) : null,
    phone: modalData?.phone || null,
  });

  const dealRoleDropDownData = (data) => {
    let a = JSON.parse(JSON.stringify(data).replace(/id/g, 'value'));
    let b = JSON.parse(JSON.stringify(a).replace(/roleName/g, 'label'));
    return b
  }

  const roleNameByRoleId = (id) => {
    const roleList = roleDropDownData;
    if (roleDropDownData && roleDropDownData.length > 0) {
      for (let i = 0; i < roleDropDownData.length; i++) {
        if (roleDropDownData[i].value === id) {
          return roleDropDownData[i].label
        }

      }
    }
  }



  useEffect(async () => {
    queryRoleDropDown().then(async (res) => {
      if (res && res.success) {
        let relTenantOption = null;
        const a = await dealRoleDropDownData(res?.result)
        if (relTenant && (modalData?.userType === 0)) {
          relTenantOption = [{ label: modalData?.roleNames[0], value: formVals.roleIds }]
          // console.log('relTenantOption',relTenantOption,a);
          const b = a.concat(relTenantOption)
          setRoleDropDownData(b)
        } else {
          setRoleDropDownData(a)
        }

      } else {
        // message.error({content:'角色数据加载失败，请重试',key:"globalErrorMessage"});
        // delay(()=>{onClose()},500)
      }
    })
  }, [])

  //点击确认按钮，先做表单校验再进行接口请求
  const handleOk = async () => {
    form.validateFields().then((values) => {
      edit(values);
    }).catch((info) => {

    });
  };

  //添加或者修改设备
  const edit = async (values) => {
    const newvalue = {
      userId: values?.userId,
      realName: values?.realName,
      selectedroles: values?.roleIds,
      phone: values?.phone,
    }
    if (editType === 'add') {
      setConfirmLoading(true)
      addUser({ ...newvalue }).then((res) => {
        if (res.success) {
          message.success('添加成功!');
          form.resetFields();
          onSuccess();
        }
        setConfirmLoading(false);
      }).catch(() => { setConfirmLoading(false); })
    } else {
      setConfirmLoading(true);
      editUser({ ...newvalue, id: modalData.id }).then((res) => {
        if (res.success) {
          message.success('修改成功!');
          form.resetFields();
          onSuccess();
        }
        setConfirmLoading(false);
      }).catch(() => { setConfirmLoading(false); })
    }
  };



  const formMenuRender = () => {

    return (
      <Form
        form={form}
        layout="vertical"
        wrapperCol={{ span: 20 }}
        initialValues={{
          userId: formVals?.userId,
          realName: formVals?.realName,
          roleIds: formVals?.roleIds,
          phone: formVals?.phone,
        }}
      >
        <Form.Item
          label={editType === 'update' ? (<span>用户账号<small style={{ color: 'gray' }}>（只读）</small></span>) : "用户账号"}
          name={'userId'}
          rules={[
            { required: true },
            {
              pattern: new RegExp(isNumbersAndLetters(7, 12)),
              message: '账号只能由数字和英文字母混合组成,长度7-12 位！',
            },
          ]}
        >
          <Input disabled={editType === 'update'} placeholder={'请输入用户账户'} allowClear />
        </Form.Item>
        <Form.Item
          label={'用户姓名'}
          name={'realName'}
          rules={[
            { required: true },
            { pattern: onlyZh(2, 20), message: '只能录入2~20个汉字', },
          ]}
        >
          <Input placeholder={'请输入用户姓名'} allowClear />
        </Form.Item>
        <Form.Item
          label={(relTenant && modalData?.userType === 0) ? (<span>用户角色<small style={{ color: 'gray' }}>（只读）</small></span>) : "用户角色"}
          // label={'用户角色'}
          name={'roleIds'}
          rules={[
            { required: true },
          ]}
        >
          <Select disabled={relTenant && modalData?.userType === 0} options={roleDropDownData} placeholder={'请选择用户角色'} allowClear optionFilterProp="label" showSearch />
        </Form.Item>
        <Form.Item
          label={'手机号'}
          name={'phone'}
          rules={[
            // { required: true },
            { pattern: phoneRegexp, message: '手机号格式不正确', },
          ]}
        >
          <Input placeholder={'请输入手机号'} allowClear />
        </Form.Item>
      </Form>
    )
  }

  const userDetailRender = () => {

    const colStyle = { marginTop: 15 }
    const iconSize = { fontSize: 22, color: 'gray', fontWeight: 'bold' }
    const fontSize = { fontSize: 16 }
    const marginLeft1 = { marginLeft: 20 }
    const marginLeft2 = { marginLeft: 5 }
    const lableStyle = { color: 'gray', fontWeight: 'bold' }

    return (
      <>
        <Row style={{ textAlign: 'center' }}>
          <Col span={24} >
            <Avatar size={120} src={`${modalData?.avatar}`}><UserOutlined /></Avatar>
          </Col>
        </Row>
        <Row style={fontSize}>
          <Col span={6}></Col>
          <Col span={12} style={colStyle}>
            <span style={iconSize}><IdcardOutlined /></span>
            <span style={lableStyle}>用户账号</span>
            <span style={marginLeft1}>{modalData?.username}</span>
          </Col>
          <Col span={6}></Col>
        </Row>
        <Row style={fontSize}>
          <Col span={6}></Col>
          <Col span={12} style={colStyle}>
            <span style={iconSize}><UserOutlined /></span>
            <span style={lableStyle}>用户姓名</span>
            <span style={marginLeft1}>{modalData?.realname}</span>
          </Col>
          <Col span={6}></Col>
        </Row>
        <Row style={fontSize}>
          <Col span={6}></Col>
          <Col span={12} style={colStyle}>
            <span style={iconSize}><TeamOutlined /></span>
            <span style={lableStyle}>用户角色</span>
            <span style={marginLeft1}>{roleNameByRoleId(formVals.roleIds)}</span>
          </Col>
          <Col span={6}></Col>
        </Row>
        <Row style={fontSize}>
          <Col span={6}></Col>
          <Col span={12} style={colStyle}>
            <span style={iconSize}><MobileOutlined /></span>
            <span style={lableStyle}>手机号</span>
            <span style={marginLeft1}>{modalData?.phone}</span>
          </Col>
          <Col span={6}></Col>
        </Row>
      </>
    )
  }

  const drawerTitle = () => {
    let title = '新增用户';
    switch (editType) {
      case 'add':
        title = '新增用户';
        break;

      case 'view':
        title = '详情';
        break;
      case 'update':
        title = '编辑用户';
        break;
    }
    return title
  }




  return (
    <Drawer
      destroyOnClose
      title={drawerTitle()}
      width={'34vw'}
      placement="right"
      closeIcon={<CloseCircleFilled style={{ fontSize: 20 }} />}
      closable={true}
      onClose={onClose}
      visible={visible}
      height={'auto'}
      key={'edit-user'}
      bodyStyle={editType !== 'view' ? { border: "1px solid rgba(220, 220, 220, 0.5)", margin: 20 } : { border: "1px solid rgba(220, 220, 220, 0.5)", margin: 20, backgroundColor: '#F4F6F6' }}
      footer={
        <div style={{ textAlign: 'right' }}>
          <Button type={'default'} onClick={onClose}>关闭</Button>
          {editType !== 'view' && <Button loading={confirmLoading} style={{ marginLeft: '10px' }} type={'primary'} onClick={handleOk}>确认</Button>}
        </div>
      }
      destroyOnClose
    >
      {editType !== 'view' && formMenuRender()}
      {editType === 'view' && userDetailRender()}
    </Drawer>
  );
}

export default EditUserModal