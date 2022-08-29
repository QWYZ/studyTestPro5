import React, { useState } from 'react';
import styles from './BaseView.less';
import { Button, Input, Upload, message, Spin } from 'antd';
import ProForm, {
    ProFormDependency,
    ProFormFieldSet,
    ProFormSelect,
    ProFormText,
    ProFormTextArea,
} from '@ant-design/pro-form';
import Form from 'antd/lib/form/Form';
import { useRequest, useModel } from 'umi';

const ChangePassword = (props) => {
    const [loading, setLoading] = useState(false);
    // const { initialState, setInitialState } = useModel('@@initialState');
    const loginUserData = JSON.parse(localStorage.getItem('loginUserData'));

    const handleFinish = async() =>{

        message.success('密码修改成功');
    }

    return (
        <Spin spinning={loading}>
            <div className={styles.baseView}>
                <ProForm
                    layout="vertical"
                    onFinish={handleFinish}
                    submitter={{
                        resetButtonProps: {
                            style: {
                                display: 'none',
                            },
                        },
                        submitButtonProps: {
                            children: '修改密码',
                        },
                    }}
                    initialValues={{username:loginUserData?.userInfo?.username}}
                    hideRequiredMark
                >
                    <ProFormText
                        width="md"
                        name="username"
                        label="用户名"
                        fieldProps={{ autoComplete: 'new-password', disabled:true }}
                    />
                    <ProFormText.Password
                        width="md"
                        name="password"
                        label="原密码"
                        rules={[
                            {
                                required: true,
                                message: '请输入您的原密码',
                            },
                        ]}
                        fieldProps={{ autoComplete: 'new-password' }}
                    />
                    <ProFormText.Password
                        width="md"
                        name="newPassword"
                        label="新密码"
                        rules={[
                            {
                                required: true,
                                message: '请输入您的新密码',
                            },
                        ]}
                        fieldProps={{ autoComplete: 'new-password' }}
                    />
                </ProForm>
            </div>
        </Spin>
    );
}

export default ChangePassword;