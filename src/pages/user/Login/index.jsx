import {
  LockOutlined,
  MobileOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Alert, Space, message, Tabs } from 'antd';
import React, { useState } from 'react';
import ProForm, { ProFormCaptcha, ProFormCheckbox, ProFormText } from '@ant-design/pro-form';
import { Link, history, useModel } from 'umi';
import Footer from '@/components/Footer';
import { connect } from 'dva';
import { fakeAccountLogin } from '@/services/system/login';
import styles from './index.less';
import style from './styles.less';
import defaultSettings from '../../../../config/defaultSettings';
import logo from '../../../../public/logo.svg'
import imgUrlBack2 from '../../../../public/img/home_bg.gif';
import imgUrlBack1 from './img/bg1.svg';
import { debounce } from '@/utils/utils'
import Chart from '@/utils/chart';

const LoginMessage = ({ content }) => (
  <Alert
    style={{
      marginBottom: 24,
    }}
    message={content}
    type="error"
    showIcon
  />
);

const Login = () => {
  // console.log('登录页面', REACT_APP_ENV);
  const [submitting, setSubmitting] = useState(false);
  const [userLoginState, setUserLoginState] = useState({});
  const [type, setType] = useState('account');
  const { initialState, setInitialState } = useModel('@@initialState');
  const rememberPassword = JSON.parse(localStorage.getItem('rememberPassword')) || false;
  const [expires, setExpires] = useState(rememberPassword); //是否记住密码
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const fetchUserInfo = async (data) => {
    // console.log('fetchUserInfo', data);
    const userMenu = await initialState?.fetchUserInfo?.();
    // const userMenu = data.menu;
    // const userInfo = JSON.parse(localStorage.getItem('loginUserData')).userInfo;
    if (userMenu) {
      await setInitialState((s) => ({ ...s, currentUser: { menuData: userMenu } }));
    }
    return userMenu
  };

  const handleSubmit = async (values) => {
    setSubmitting(true);
    try {
      // 登录
      const msg = await fakeAccountLogin({ ...values });
      if (msg.success) {
        const defaultLoginSuccessMessage = '登录成功！';
        await localStorage.setItem('loginUserData', JSON.stringify(msg.result));
        const menuData = await fetchUserInfo();

        if (menuData) {
          message.success(defaultLoginSuccessMessage);
        }
        /** 此方法会跳转到 redirect 参数所在的位置 */
        if (!history) return;

        const { query } = history.location;
        const { redirect } = query;
        history.push(redirect || '/');
        return;
      }
    } catch (error) {
      // const defaultLoginFailureMessage = '登录失败，请重试！';
      // message.error(defaultLoginFailureMessage);
    }

    setSubmitting(false);
  };

  const option3 = {
    graphic: {
      elements: [
        {
          type: 'text',
          left: 'center',
          top: 'center',
          style: {
            text: '商品、订单、库存统一管理',
            fontSize: 16,
            // fontWeight: 'bold',
            lineDash: [0, 200],
            lineDashOffset: 0,
            fill: 'transparent',
            stroke: '#2f89cf',
            lineWidth: 1
          },
          keyframeAnimation: {
            duration: 4000,
            loop: true,
            keyframes: [
              {
                percent: 0.7,
                style: {
                  fill: 'transparent',
                  lineDashOffset: 200,
                  lineDash: [200, 0]
                }
              },
              {
                // Stop for a while.
                percent: 0.8,
                style: {
                  fill: 'transparent'
                }
              },
              {
                percent: 1,
                style: {
                  fill: '#2f89cf'
                }
              }
            ]
          }
        }
      ]
    }
  };


  const loginUI2 = () => {
    const enable = false;
    return (
      <div className={style.login}>

        <div className={style.bg1} />
        <div className={style.gyl}>

          <h1>学习与积累</h1>
          <div className={style.gy2}>
            商品、订单、库存统一管理
            <div style={{ height: 20, width: '100%' }}>
              <Chart renderer={'canvas'} option={option3} />
            </div>
          </div>
        </div>
        {/* style={{ height: enable ? '387px' : '330px' }} */}
        <div className={style.box}>
          <div className={style.box1} >
            <div className={style.header}>用户登录</div>

            <div className={style.item}>
              <div className={style.userLabel}><UserOutlined className={styles.prefixIcon} /></div>{/**用户名 */}
              <input
                style={{ borderStyle: 'none none solid none' }}
                onChange={e => setUsername(e.target.value)}
                value={username}
                type="text"
                autoComplete={!rememberPassword ? 'new-password' : 'on'}
              />
            </div>
            <div className={style.item}>
              <div className={style.userLabel}>
                <LockOutlined className={styles.prefixIcon} />{/**密<span style={{ marginLeft: '1em' }} />码 */}
              </div>
              <input
                style={{ borderStyle: 'none none solid none' }}
                onChange={e => setPassword(e.target.value)}
                value={password}
                type="password"
                autoComplete={!rememberPassword ? 'new-password' : 'on'}
              />
            </div>
            {
              enable ? <div className={style.item}>
                <div className={style.userLabel}>验证码</div>
                <input onKeyUp={e => { if (e.keyCode === 13) { handleSubmit(); } }}
                  style={{ borderStyle: 'none none solid none' }}
                  onChange={e => setCode(e.target.value)}
                  value={code}
                  type="text"
                />
                <div className={style.code} onClick={() => { getCodeImg(); }}><img src={captchaImg} className={style.code_img} /></div>
              </div> : <div></div>
            }


            <div className={style.remember}>
              <div className={style.remember_box}>
                <input
                  type="checkbox"
                  checked={expires}
                  onChange={(e) => {
                    setExpires(e.target.checked);
                  }}
                />
                <div className={style.text}>记住密码</div>
              </div>
            </div>

            <input
              onClick={() => {
                !submitting && handleSubmit({ username: username, password: password });
                localStorage.setItem('rememberPassword', JSON.stringify(expires));
              }}
              className={style.btn}
              type="button"
              name="登录"
              value="登录"
            />
          </div>
        </div>
      </div>
    )
  }


  return (
    <>
      {loginUI2()}
    </>
  );
};

export default Login;
