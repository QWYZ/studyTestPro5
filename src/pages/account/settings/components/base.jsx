import React from 'react';
import { UploadOutlined } from '@ant-design/icons';
import { Button, Input, Upload, message, Spin } from 'antd';
import ProForm, {
  ProFormDependency,
  ProFormFieldSet,
  ProFormSelect,
  ProFormText,
  ProFormTextArea,
} from '@ant-design/pro-form';
import { useRequest } from 'umi';
import { queryCurrent } from '../service';
import { queryProvince, queryCity } from '../service';
import styles from './BaseView.less';
import Form from 'antd/lib/form/Form';

const validatorPhone = (rule, value, callback) => {
  const values = value.split('-');

  // if (!values[0]) {
  //   callback('请输入区号');
  // }

  if (!value) {
    callback('请输入手机号!');
  }

  callback();
};

// 头像组件 方便以后独立，增加裁剪之类的功能
const AvatarView = ({ avatar }) => (
  <>
    <div className={styles.avatar_title}>头像</div>
    <div className={styles.avatar}>
      <img src={avatar} alt="avatar" />
    </div>
    <Upload showUploadList={false}>
      <div className={styles.button_view}>
        <Button>
          <UploadOutlined />
          更换头像
        </Button>
      </div>
    </Upload>
  </>
);

const BaseView = () => {
  const { data: currentUser, loading } = useRequest(() => {
    return queryCurrent();
  });

  const getAvatarURL = () => {
    if (currentUser) {
      if (currentUser.avatar) {
        return currentUser.avatar;
      }

      const url = 'https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png';
      return url;
    }

    return '';
  };

  const handleFinish = async () => {
    message.success('更新基本信息成功');
  };

  return (
    <Spin spinning={loading}>
      <div className={styles.baseView}>
        {loading ? null : (
          <>
            <div className={styles.left}>
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
                    children: '更新基本信息',
                  },
                }}
                initialValues={{ ...currentUser, phone: currentUser?.phone }}
                hideRequiredMark
              >
                <ProFormText
                  width="md"
                  name="username"
                  label="用户名"
                  disabled
                  rules={[
                    {
                      required: true,
                      message: '请输入您的用户名!',
                    },
                  ]}
                />
                <ProFormText
                  width="md"
                  name="email"
                  label="邮箱"
                  rules={[
                    {
                      // required: true,
                      message: '请输入您的邮箱!',
                    },
                  ]}
                />
                <ProFormTextArea
                  name="profile"
                  label="个人简介"
                  rules={[
                    {
                      // required: true,
                      message: '请输入个人简介!',
                    },
                  ]}
                  placeholder="个人简介"
                />
                <ProFormText
                  name="phone"
                  label="联系电话"
                  rules={[
                    {
                      // required: true,
                      message: '请输入您的联系电话!',
                    },
                    {
                      validator: validatorPhone,
                    },
                  ]}
                >
                  {/* <Input className={styles.area_code} /> */}
                  <Input className={styles.phone_number} />
                </ProFormText>
              </ProForm>
            </div>

            <div className={styles.right}>
              <AvatarView avatar={getAvatarURL()} />
            </div>
          </>
        )}

      </div>
    </Spin>
  );
};

export default BaseView;
