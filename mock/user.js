const waitTime = (time = 100) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
};

async function getFakeCaptcha(req, res) {
  await waitTime(2000);
  return res.json('captcha-xxx');
}

const { ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION } = process.env;
/**
 * 当前用户的权限，如果为空代表没登录
 * current user access， if is '', user need login
 * 如果是 pro 的预览，默认是有权限的
 */

let access = ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION === 'site' ? 'admin' : '';

const getAccess = () => {
  return access;
}; // 代码中会兼容本地 service mock 以及部署站点的静态数据

//处理菜单的方法
import routes from '../config/routes';

const dealRouteMenu = (a) => {
  let b = JSON.parse(JSON.stringify(a).replace(/routes/g, 'children'));
  let c = JSON.parse(JSON.stringify(b).replace(/path/g, 'url'));
  return JSON.parse(JSON.stringify(c).replace(/access/g, 'perm'));
};

export default {
  // 支持值为 Object 和 Array
  'GET /project/sys/permission/getUserSysPermissionByToken.do': async (req, res) => {
    await waitTime(0);

    res.send({
      success: true,
      message: '操作成功！',
      code: 200,
      result: dealRouteMenu(routes),
    });
  },
  // GET POST 可省略
  'GET /api/users': [
    {
      key: '1',
      name: 'John Brown',
      age: 32,
      address: 'New York No. 1 Lake Park',
    },
    {
      key: '2',
      name: 'Jim Green',
      age: 42,
      address: 'London No. 1 Lake Park',
    },
    {
      key: '3',
      name: 'Joe Black',
      age: 32,
      address: 'Sidney No. 1 Lake Park',
    },
  ],
  'POST /project/login': async (req, res) => {
    const { password, username, type } = req.body;
    await waitTime(0);
    res.setHeader('Access-Control-Allow-Origin', '*');
    if (password === '123456' && username === 'admin') {
      res.send({
        success: true,
        message: '登录成功',
        code: 200,
        result: {
          multi_depart: 1,
          userInfo: {
            id: 'e9ca23d68d884d4ebb19d07889727dae',
            username: 'admin',
            realname: '管理员',
            avatar:
              'https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png',
            birthday: '2018-12-05',
            sex: 1,
            email: 'jeecg@163.com',
            phone: '18611111111',
            orgCode: 'A01',
            orgCodeTxt: null,
            status: 1,
            delFlag: 0,
            workNo: '00001',
            post: '总经理',
            telephone: null,
            createBy: null,
            createTime: '2019-06-21 17:54:10',
            updateBy: 'admin',
            updateTime: '2020-07-10 15:27:10',
            activitiSync: 1,
            userIdentity: 2,
            departIds: 'c6d7cb4deeac411cb3384b1b31278596',
            relTenantIds: '',
            clientId: null,
            userType: 0,
            tenantName: null,
            roleNames: null,
            roleIds: null,
          },
          token:
            'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2Mzg4NDU5MjksInVzZXJuYW1lIjoiYWRtaW4ifQ.B-nYCFgmJA5B4Jb1gRTKBZvPNxHNrRjonF3caquOMqo',
        },
      });
      access = 'admin';
      return;
    }

    res.send({
      code: 500,
      message: '该用户不存在，请注册',
      result: null,
      success: false,
    });
  },
  'POST /project/login/outLogin': (req, res) => {
    access = '';
    res.send({
      data: {},
      success: true,
    });
  },
  'POST /api/register': (req, res) => {
    res.send({
      status: 'ok',
      currentAuthority: 'user',
      success: true,
    });
  },
  'GET /api/500': (req, res) => {
    res.status(500).send({
      timestamp: 1513932555104,
      status: 500,
      error: 'error',
      message: 'error',
      path: '/base/category/list',
    });
  },
  'GET /api/404': (req, res) => {
    res.status(404).send({
      timestamp: 1513932643431,
      status: 404,
      error: 'Not Found',
      message: 'No message available',
      path: '/base/category/list/2121212',
    });
  },
  'GET /api/403': (req, res) => {
    res.status(403).send({
      timestamp: 1513932555104,
      status: 403,
      error: 'Forbidden',
      message: 'Forbidden',
      path: '/base/category/list',
    });
  },
  'GET /api/401': (req, res) => {
    res.status(401).send({
      timestamp: 1513932555104,
      status: 401,
      error: 'Unauthorized',
      message: 'Unauthorized',
      path: '/base/category/list',
    });
  },
  'GET  /api/login/captcha': getFakeCaptcha,
};
