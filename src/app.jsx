import { PageLoading, SettingDrawer } from '@ant-design/pro-layout';
import { notification } from 'antd';
import { history, Link } from 'umi';
import RightContent from '@/components/RightContent';
import Footer from '@/components/Footer';
import { queryUserMenu } from '@/services/system/login';
import { BookOutlined, LinkOutlined } from '@ant-design/icons';
import { iconData } from './utils/iconData';
import { defaultSettings } from '../config/defaultSettings'
import { initWebSocket } from '@/utils/globalWebSocket';
import { treeToList } from '@/utils/utils'
import HeaderContent from "@/components/HeaderContent";
import BreadcrumbComponent from '@/components/Breadcrumb';
import defaultLogo from '../public/logo.svg';
import { systemInfo } from '@/utils/utils';


const isDev = process.env.NODE_ENV === 'development';
const loginPath = '/user/login';
/** 获取用户信息比较慢的时候会展示一个 loading */
export const initialStateConfig = {
  loading: <PageLoading />,
};
/**
 * @see  https://umijs.org/zh-CN/plugins/plugin-initial-state
 * */

export async function getInitialState() {
  const fetchUserInfo = async () => {
    try {
      const msg = await queryUserMenu();
      return msg.result;
    } catch (error) {
      console.log('fetchUserInfo_error', error);
      history.push(loginPath);
    }

    return undefined;
  }; // 如果是登录页面，不执行
  const loginUserData = JSON.parse(localStorage.getItem('loginUserData'))

  //初始化WebSocket
  false && initWebSocket();
  // console.log('getInitialState--',loginUserData,history.location.pathname);
  //获取自定义主题配置
  const themeSetting = JSON.parse(localStorage.getItem('themeSetting'));

  if (loginUserData && history.location.pathname !== loginPath) {
    // const userInfo = JSON.parse(localStorage.getItem('loginUserData')).userInfo;
    const userMenu = await fetchUserInfo();
    const currentUser = { menuData: userMenu }

    return {
      fetchUserInfo,
      currentUser,
      settings: { ...themeSetting },
    };
  }

  return {
    fetchUserInfo,
    settings: { ...themeSetting },
  };
}

export const layout = (props) => {
  const { initialState, setInitialState } = props;
  const onCollapse = (collapsed) => {
    setInitialState({ ...initialState, collapsed }).then();
  };
  return {
    rightContentRender: () => <RightContent />,
    logo: initialState?.collapsed && systemInfo().isWindows ? defaultLogo : defaultLogo,
    disableContentMargin: false,
    waterMarkProps: {
      // 注释掉下面这句可去掉页面的水印
      // content: initialState?.currentUser?.name,
    },
    //自定义菜单折叠按钮位置
    headerContentRender: (data) => (
      systemInfo().isWindows && <HeaderContent collapse={initialState?.collapsed} onCollapse={onCollapse} data={data} breadcrumbShow={true} />
    ),
    collapsedButtonRender: false,//关闭默认的折叠按钮
    collapsed: initialState?.collapsed,
    onCollapse: onCollapse,
    // footerRender: () => <Footer />,
    onPageChange: () => {
      const { location } = history; // 如果没有登录，重定向到 login
      console.log('onPageChange', 'boolean1:', !(initialState?.currentUser && initialState?.currentUser?.menuData), 'boolean2:', location.pathname !== loginPath);
      console.log('initialState?.currentUser', initialState?.currentUser)
      if (!(initialState?.currentUser && initialState?.currentUser?.menuData) && location.pathname !== loginPath) {
        history.push(loginPath);
      }
    },
    menu: {
      // 每当 initialState?.currentUser?.userid 发生修改时重新执行 request
      params: {
        userId: initialState?.currentUser?.menuData,
      },
      request: async (params, defaultMenuData) => {
        // console.log(initialState?.currentUser?.menuData);
        return menuIconChange(initialState?.currentUser?.menuData, defaultMenuData);
      },
      locale: false
    },
    siderWidth: systemInfo().isWindows ? 180 : 0,//菜单栏宽度
    menuHeaderRender: undefined,
    childrenRender: (children, props) => {
      //确保组件存在，以用来触发组件中的更换主题方法
      return (
        <>
          {children}
          {!props?.location?.pathname?.includes('/login') && (
            <SettingDrawer
              themeOnly
              hideHintAlert
              hideCopyButton
              enableDarkTheme
              settings={initialState?.settings}
              onSettingChange={(settings) => {
                setInitialState((preInitialState) => ({ ...preInitialState, settings }));
              }}
            />
          )}
        </>
      );
    },
    // 自定义 403 页面
    // unAccessible: <div>unAccessible</div>,
    ...initialState?.settings,
  };
};


const menuIconChange = (data, routes) => {
  let a = JSON.parse(JSON.stringify(data).replace(/children/g, 'routes'));
  data = JSON.parse(JSON.stringify(a).replace(/url/g, 'path'))
  let routesList = treeToList(routes);
  let hiddenRoutes = [];
  routesList.map(item => {
    if (item.hideInMenu) {
      hiddenRoutes.push(item)
    }
  })
  // console.log('routesList',routesList,hiddenRoutes);
  if (data && data.length > 0) {
    for (let i = 0; i < data.length; i++) {
      if (data[i].icon) {
        let keyString = data[i].icon;
        data[i].icon = iconData[keyString]
      }
    }
  }
  //从routes.js文件中获取菜单隐藏属性
  let re_data = hiddenMenu(data, hiddenRoutes);
  // console.log('re_data',re_data);
  return re_data
}

const hiddenMenu = (treelist, list) => {
  if (treelist && treelist.length > 0) {
    let a = treelist.map(item => {
      for (let i = 0; i < list.length; i++) {
        if (item.path === list[i].path) {
          item.hideInMenu = true;
        }
        if (item.routes && item.routes.length > 0) {
          item.routes = hiddenMenu(item.routes, list);
        }
      }
      // console.log('item',item);
      return item
    })
    return a
  }
}
