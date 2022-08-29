import React, { useCallback } from 'react';
import { DesktopOutlined, LogoutOutlined, SettingOutlined, UserOutlined } from '@ant-design/icons';
import { Avatar, Menu, Spin } from 'antd';
import { history, useModel } from 'umi';
import { stringify } from 'querystring';
import HeaderDropdown from '../HeaderDropdown';
import styles from './index.less';
import { outLogin } from '@/services/system/login';

/**
 * 退出登录，并且将当前的 url 保存
 */
const loginOut = async () => {
  // await outLogin();
  const { query = {}, pathname } = history.location;
  const { redirect } = query; // Note: There may be security issues, please note
  if (window.location.pathname !== '/user/login' && !redirect) {
    history.replace({
      pathname: '/user/login',
      search: stringify({
        redirect: pathname,
      }),
    });
  }
  await outLogin();
  localStorage.removeItem('loginUserData');
};

const AvatarDropdown = ({ menu, openThemes }) => {
  const { initialState, setInitialState } = useModel('@@initialState');
  const loginUserData = JSON.parse(localStorage.getItem('loginUserData'));
  const onMenuClick = useCallback(
    (event) => {
      const { key } = event;

      if (key === 'logout') {
        loginOut();
        setInitialState((s) => ({ ...s, currentUser: undefined }));
        return;
      }
      if (key === 'themes') {
        openThemes();
        return;
      }

      history.push(`/account/${key}`);
    },
    [setInitialState],
  );
  const loading = (
    <span className={`${styles.action} ${styles.account}`}>
      <Spin
        size="small"
        style={{
          marginLeft: 8,
          marginRight: 8,
        }}
      />
    </span>
  );

  // if (!initialState) {
  //   return loading;
  // }
  // const { currentUser } = initialState;
  // if (!currentUser || !currentUser.username) {
  //   return loading;
  // }
  if (!loginUserData) {
    return loading;
  }
  const { userInfo } = loginUserData;
  if (!userInfo || !userInfo.username) {
    return loading;
  }

  const menuHeaderDropdown = (
    <Menu className={styles.menu} selectedKeys={[]} onClick={onMenuClick}>
      {/* {menu && (
        <Menu.Item key="center">
          <UserOutlined />
          个人中心
        </Menu.Item>
      )} */}
      {menu && (
        <Menu.Item key="settings">
          <SettingOutlined />
          个人设置
        </Menu.Item>
      )}
      {menu && <Menu.Divider />}
      <Menu.Item key="themes">
        <DesktopOutlined />
        设置主题
      </Menu.Item>
      <Menu.Item key="logout">
        <LogoutOutlined />
        退出登录
      </Menu.Item>
    </Menu>
  );
  return (
    <HeaderDropdown overlay={menuHeaderDropdown}>
      <span className={`${styles.action} ${styles.account}`}>
        <Avatar size="small" className={styles.avatar} src={userInfo.avatar} alt="avatar"><UserOutlined /></Avatar>
        <span className={`${styles.name} anticon`}>{userInfo.username}</span>
      </span>
    </HeaderDropdown>
  );
};

export default AvatarDropdown;
