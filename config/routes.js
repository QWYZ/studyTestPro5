
export default [
  {
    path: '/user',
    layout: false,
    routes: [
      {
        path: '/user',
        routes: [
          {
            name: '登录',
            path: '/user/login',
            component: './user/Login',
          },
          {
            component: './404',
          },
        ],
      },
    ],
  },
  {
    path: '/big-data',
    layout: false,
    routes: [
      {
        path: '/big-data',
        routes: [
          {
            name: '大数据演示一',
            path: '/big-data/demo1',
            component: './big-data/demo1',
          },
          {
            component: './404',
          },

        ],
      }
    ],

  },
  {
    path: '/home',
    component: './home',
    name: '首页',
    // access: 'home',
    icon: 'home',
  },
  // {
  //   path: '/mobile',
  //   layout: false,
  //   component: './mobile',
  //   name: '移动端',
  //   icon: 'phone',
  // },
  {
    path: '/workplace',
    component: './home/workplace',
    // access: 'workplace',
    name: '工作台',
    icon: 'desktop',
  },
  {
    name: '个人中心',
    icon: 'user',
    path: '/account',
    hideInMenu: true,
    routes: [
      {
        name: '个人设置',
        path: '/account/settings',
        access: 'usersettings',
        component: './account/settings',
      },
      {
        component: './404',
      },
    ],
  },
  {
    path: '/system',
    name: '系统管理',
    icon: 'setting',
    routes: [
      {
        path: '/system',
        redirect: '/system/menu',
      },
      {
        path: '/system/menu',
        name: '菜单管理',
        component: './system/menu',
      },
      {
        path: '/system/apiList',
        name: 'API权限',
        component: './system/apiList',
      },
      {
        component: './404',
      },
    ],
  },
  {
    path: '/users',
    name: '用户管理',
    icon: 'team',
    routes: [
      {
        path: '/users',
        redirect: '/users/userList',
      },
      {
        path: '/users/role',
        name: '角色管理',
        component: './system/role',
      },
      {
        path: '/users/userList',
        name: '用户列表',
        component: './system/user',
      },
      {
        component: './404',
      },
    ],
  },
  {
    path: '/goods',
    name: '商品管理',
    icon: 'appstore',
    routes: [
      {
        path: '/goods',
        redirect: '/goods/goodsList',
      },
      {
        path: '/goods/goodsList',
        name: '商品列表',
        component: './goods/goodsList',
      },
      {
        path: '/goods/createGoods',
        name: '创建商品',
        hideInMenu: true,
        component: './goods/createGoods',
      },
      {
        component: './404',
      },
    ],
  },
  {
    path: '/store',
    name: '店铺管理',
    icon: 'shop',
    // hideInMenu:true,
    routes: [
      {
        path: '/store',
        redirect: '/store/setting',
      },
      // {
      //   path: '/store/setting',
      //   name: '店铺设置',
      //   component: './store/storeSetting',
      // },
      {
        path: '/store/decoration',
        name: '店铺装修',
        component: './store/storeDecoration',
      },
      {
        component: './404',
      }
    ]
  },
  {
    path: '/componentsDemo',
    name: '组件',
    icon: 'star',
    routes: [
      {
        path: '/componentsDemo/card',
        name: '卡片组件',
        component: './components-demo/card',
      },
      {
        path: '/componentsDemo/cameraPc',
        name: 'PC端拍照',
        component: './components-demo/cameraPc',
      },
      {
        component: './404',
      },
    ],
  },
  {
    path: '/',
    redirect: '/home',
  },
  {
    component: './404',
  },
];
