import React, { useState } from "react";
import { Col, Form, Input, message, Modal, Row, Select } from 'antd';
// import { connect } from "dva";
import { addRole, editRole } from '@/services/system/role';

const regNoEmoji = /^((?!(?:[\u2700-\u27bf]|(?:\ud83c[\udde6-\uddff]){2}|[\ud800-\udbff][\udc00-\udfff]|[\u0023-\u0039]\ufe0f?\u20e3|\u3299|\u3297|\u303d|\u3030|\u24c2|\ud83c[\udd70-\udd71]|\ud83c[\udd7e-\udd7f]|\ud83c\udd8e|\ud83c[\udd91-\udd9a]|\ud83c[\udde6-\uddff]|\ud83c[\ude01-\ude02]|\ud83c\ude1a|\ud83c\ude2f|\ud83c[\ude32-\ude3a]|\ud83c[\ude50-\ude51]|\u203c|\u2049|[\u25aa-\u25ab]|\u25b6|\u25c0|[\u25fb-\u25fe]|\u00a9|\u00ae|\u2122|\u2139|\ud83c\udc04|[\u2600-\u26FF]|\u2b05|\u2b06|\u2b07|\u2b1b|\u2b1c|\u2b50|\u2b55|\u231a|\u231b|\u2328|\u23cf|[\u23e9-\u23f3]|[\u23f8-\u23fa]|\ud83c\udccf|\u2934|\u2935|[\u2190-\u21ff])).)+$/


export const EditRoleModal = (props) => {
  if (!props.modalVisible) return null//增加此行判断避免浪费渲染资源

  const { editModalType, modalVisible, onSuccess, onCancel, modalData } = props;
  // console.log('data---ss-s--', data);
  const [form] = Form.useForm();
  const [formVals, setFormVals] = useState(
    (editModalType.type == 'add')?
    {
      name: '',
      code: '',
      parentCode: modalData?.code || null,
      parentName: modalData?.name || null,
    }
    :
    {
      name: modalData?.name || '',
      code: modalData?.code || '',
      parentCode: modalData?.parentCode || null,
      parentName: modalData?.parentName || null,
    }
  );
  const [confirmLoading, setConfirmLoading] = useState(false)

  //点击确认按钮，先做表单校验再进行接口请求
  const handleOk = async () => {
    form.validateFields().then((values) => {
      edit(values);
    }).catch((info) => {

    });
  };

  //添加或者修改设备
  const edit = async (values) => {
    if (editModalType.type === 'add') {
      setConfirmLoading(true);
      addRole({ ...values }).then((res) => {
        if (res.success) {
          message.success('添加成功!');
          form.resetFields();
          onSuccess();
        }
        setConfirmLoading(false);
      }).catch(() => { setConfirmLoading(false); })
    } else {
      setConfirmLoading(true);

    }
  };


  return (
    <Modal
      destroyOnClose
      title={editModalType.type === 'update' ? '修改' : '新增'}
      visible={editModalType.type !== ''}
      okText="确认"
      cancelText="取消"
      onCancel={() => onCancel()}
      onOk={handleOk}
      width={'30vw'}
      confirmLoading={confirmLoading}
    >
      <Form
        form={form}
        layout="vertical"
        initialValues={{
          name: formVals.name,
          code: formVals.code,
          parentCode: formVals.parentCode,
          parentName: formVals.parentName,
        }}
      >
        {
          (editModalType.type === 'add' && editModalType.index == 2 || formVals.parentCode) &&
          <>
            <Form.Item
              label={'上级编号'}
              hidden
              name={'parentCode'}
              rules={[
                { required: true }
              ]}
            >
              <Input disabled />
            </Form.Item>
            <Form.Item
              label={'上级名称'}
              name={'parentName'}
              rules={[
                { required: true }
              ]}
            >
              <Input disabled />
            </Form.Item>
          </>
        }

        <Form.Item
          label={'编号'}
          name={'code'}
          rules={[
            { required: true }
          ]}
        >
          <Input placeholder={'请输入编号'} allowClear />
        </Form.Item>
        <Form.Item
          label={'地区名称'}
          name={'name'}
          rules={[
            { required: true },
            { max: 100, message: '不能录入表情，最长100个字符', },
            { pattern: regNoEmoji, message: '不能录入表情，最长100个字符' }
          ]}
        >
          <Input placeholder={'请输入地区名称'} allowClear />
        </Form.Item>
      </Form>
    </Modal>
  );
}

export default EditRoleModal