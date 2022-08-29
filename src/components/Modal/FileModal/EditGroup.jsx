import { Cascader, Form, Input, Modal } from 'antd';
import React, { useState } from 'react';

const EditGroup = (props) => {
    if (!props.modalVisible) return null//增加此行判断避免浪费渲染资源
    const [form] = Form.useForm();

    const { editModalType, modalVisible, onSuccess, onCancel, modalData } = props;

    const [confirmLoading, setConfirmLoading] = useState(false);

    const [formVals, setFormVals] = useState({
        id: modalData?.id || null,
        title: modalData?.title || null,
        position: modalData?.position || null,
    })

    const handleOk = () => {

    }

    const wrapperCol = {
        xs: 24,
        sm: 24,
        md: 24,
        lg: 24,
        xl: 16,
    };
    const labelCol = {
        xs: 24,
        sm: 24,
        md: 24,
        lg: 24,
        xl: 6,
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
            centered
        >
            <Form
                form={form}
                initialValues={{
                    position: formVals?.position,
                    title: formVals?.title,
                }}
            >
                <Form.Item
                    labelCol={labelCol}
                    wrapperCol={wrapperCol}
                    name={'position'}
                    label="上级分组"
                    extra={'不填时默认为顶级分组'}
                >
                    <Cascader
                        placeholder="请选择上级分组"
                        options={[{ title: '全部', id: '-1', children: [{ title: '未知组', id: '-2' }] }]}
                        changeOnSelect
                        fieldNames={{ label: 'title', value: 'id' }}
                    />
                </Form.Item>
                <Form.Item
                    labelCol={labelCol}
                    wrapperCol={wrapperCol}
                    name={'title'}
                    label={`分组名`}
                    rules={[
                        { required: true },
                        { max: 10, message: '不超过20个字' },
                    ]}
                >
                    <Input placeholder="请输入分组名" allowClear />
                </Form.Item>
            </Form>

        </Modal>
    );
}

export default EditGroup;