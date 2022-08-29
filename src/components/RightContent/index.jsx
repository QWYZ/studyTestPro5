import { FullscreenExitOutlined, FullscreenOutlined } from '@ant-design/icons';
import { SettingDrawer } from '@ant-design/pro-layout';
import { Space } from 'antd';
import React, { useEffect, useState } from 'react';
import { useModel } from 'umi';
import Avatar from './AvatarDropdown';
import styles from './index.less';

const GlobalHeaderRight = () => {
  const { initialState, setInitialState } = useModel('@@initialState');
  const [fullScreenState, setFullScreenState] = useState(false);
  const [visibleDrawer, setVisibleDrawer] = useState(false);

  const escFunction = () => {
    if (!document.fullscreenElement && !document.webkitIsFullScreen) {
      setFullScreenState(false)
    }
  }

  useEffect(() => {
    // 监听退出全屏事件 --- chrome 用 esc 退出全屏并不会触发 keyup 事件,但是可以监听fullscreenchange
    document.addEventListener('fullscreenchange', escFunction);
    document.addEventListener("webkitfullscreenchange", escFunction); /* Chrome, Safari and Opera */
    return () => {
      //销毁时清除监听
      document.removeEventListener("fullscreenchange", escFunction);
      document.removeEventListener("webkitfullscreenchange", escFunction);
    }
  }, []);

  //开启全屏
  const requestFullScreen = () => {
    setFullScreenState(true)
    let de = document.getElementById('root');
    if (de.requestFullscreen) {
      de.requestFullscreen();
    }
  }

  //退出全屏
  const exitFullScreen = () => {
    setFullScreenState(false)
    let de = document;
    if (de.exitFullscreen) {
      de.exitFullscreen();
    }
  }

  if (!initialState || !initialState.settings) {
    return null;
  }

  const { navTheme, layout } = initialState.settings;
  let className = styles.right;

  if ((navTheme === 'dark' && layout === 'top') || layout === 'mix') {
    className = `${styles.right}  ${styles.dark}`;
  }

  return (
    <Space className={className}>
      <Avatar menu openThemes={() => { setVisibleDrawer(true) }} />
      {/* {
        !fullScreenState ?
          <span style={{ marginRight: 10 }} onClick={requestFullScreen}>
            <FullscreenOutlined />
          </span> : <span style={{ marginRight: 10 }} onClick={exitFullScreen}>
            <FullscreenExitOutlined />
          </span>
      } */}
      {
        visibleDrawer &&
        <SettingDrawer
          onCollapseChange={() => setVisibleDrawer(false)}
          collapse={visibleDrawer}
          hideHintAlert
          hideCopyButton
          enableDarkTheme
          settings={initialState?.settings}
          onSettingChange={(settings) => {
            console.log('onSettingChange', settings)
            localStorage.setItem('themeSetting', JSON.stringify(settings));
            setInitialState((preInitialState) => ({ ...preInitialState, settings }));
          }}
          // pathname={'/'}
          // disableUrlParams
          themeOnly
        />
      }

    </Space>
  );
};

export default GlobalHeaderRight;
