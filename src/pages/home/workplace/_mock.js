import moment from 'moment';
// mock data
const visitData = [];
const beginDay = new Date().getTime();
const fakeY = [7, 5, 4, 2, 4, 7, 5, 6, 5, 9, 6, 3, 1, 5, 3, 6, 5];

for (let i = 0; i < fakeY.length; i += 1) {
  visitData.push({
    x: moment(new Date(beginDay + 1000 * 60 * 60 * 24 * i)).format('YYYY-MM-DD'),
    y: fakeY[i],
  });
}

const visitData2 = [];
const fakeY2 = [1, 6, 4, 8, 3, 7, 2];

for (let i = 0; i < fakeY2.length; i += 1) {
  visitData2.push({
    x: moment(new Date(beginDay + 1000 * 60 * 60 * 24 * i)).format('YYYY-MM-DD'),
    y: fakeY2[i],
  });
}

const salesData = [];

for (let i = 0; i < 12; i += 1) {
  salesData.push({
    x: `${i + 1}月`,
    y: Math.floor(Math.random() * 1000) + 200,
  });
}

const searchData = [];

for (let i = 0; i < 50; i += 1) {
  searchData.push({
    index: i + 1,
    keyword: `搜索关键词-${i}`,
    count: Math.floor(Math.random() * 1000),
    range: Math.floor(Math.random() * 100),
    status: Math.floor((Math.random() * 10) % 2),
  });
}

const salesTypeData = [
  {
    x: '家用电器',
    y: 4544,
  },
  {
    x: '食用酒水',
    y: 3321,
  },
  {
    x: '个护健康',
    y: 3113,
  },
  {
    x: '服饰箱包',
    y: 2341,
  },
  {
    x: '母婴产品',
    y: 1231,
  },
  {
    x: '其他',
    y: 1231,
  },
];
const salesTypeDataOnline = [
  {
    x: '家用电器',
    y: 244,
  },
  {
    x: '食用酒水',
    y: 321,
  },
  {
    x: '个护健康',
    y: 311,
  },
  {
    x: '服饰箱包',
    y: 41,
  },
  {
    x: '母婴产品',
    y: 121,
  },
  {
    x: '其他',
    y: 111,
  },
];
const salesTypeDataOffline = [
  {
    x: '家用电器',
    y: 99,
  },
  {
    x: '食用酒水',
    y: 188,
  },
  {
    x: '个护健康',
    y: 344,
  },
  {
    x: '服饰箱包',
    y: 255,
  },
  {
    x: '其他',
    y: 65,
  },
];
const offlineData = [];

for (let i = 0; i < 10; i += 1) {
  offlineData.push({
    name: `Stores ${i}`,
    cvr: Math.ceil(Math.random() * 9) / 10,
  });
}

const offlineChartData = [];

for (let i = 0; i < 20; i += 1) {
  offlineChartData.push({
    x: new Date().getTime() + 1000 * 60 * 30 * i,
    y1: Math.floor(Math.random() * 100) + 10,
    y2: Math.floor(Math.random() * 100) + 10,
  });
}

const titles = [
  '华卓店铺',
  '一当商城',
  '沉香商城',
  '端源商城',
  'Bootstrap',
  'React',
  'Vue',
  'Webpack',
];
const avatars = [
  'https://gw.alipayobjects.com/zos/rmsportal/WdGqmHpayyMjiEhcKoVE.png', // Alipay
  'https://gw.alipayobjects.com/zos/rmsportal/zOsKZmFRdUtvpqCImOVY.png', // Angular
  'https://gw.alipayobjects.com/zos/rmsportal/dURIMkkrRFpPgTuzkwnB.png', // Ant Design
  'https://gw.alipayobjects.com/zos/rmsportal/sfjbOqnsXXJgNCjCzDBL.png', // Ant Design Pro
  'https://gw.alipayobjects.com/zos/rmsportal/siCrBXXhmvTQGWPNLBow.png', // Bootstrap
  'https://gw.alipayobjects.com/zos/rmsportal/kZzEzemZyKLKFsojXItE.png', // React
  'https://gw.alipayobjects.com/zos/rmsportal/ComBAopevLwENQdKWiIn.png', // Vue
  'https://gw.alipayobjects.com/zos/rmsportal/nxkuOJlFJuAUhzlMTCEe.png', // Webpack
];
const avatars2 = [
  'https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png',
  'https://gw.alipayobjects.com/zos/rmsportal/cnrhVkzwxjPwAaCfPbdc.png',
  'https://gw.alipayobjects.com/zos/rmsportal/gaOngJwsRYRaVAuXXcmB.png',
  'https://gw.alipayobjects.com/zos/rmsportal/ubnKSIfAJTxIgXOKlciN.png',
  'https://gw.alipayobjects.com/zos/rmsportal/WhxKECPNujWoWEFNdnJE.png',
  'https://gw.alipayobjects.com/zos/rmsportal/jZUIxmJycoymBprLOUbT.png',
  'https://gw.alipayobjects.com/zos/rmsportal/psOgztMplJMGpVEqfcgF.png',
  'https://gw.alipayobjects.com/zos/rmsportal/ZpBqSxLxVEXfcUNoPKrz.png',
  'https://gw.alipayobjects.com/zos/rmsportal/laiEnJdGHVOhJrUShBaJ.png',
  'https://gw.alipayobjects.com/zos/rmsportal/UrQsqscbKEpNuJcvBZBu.png',
];

const getAppList1 = (_, res) => {
  res.json({
    data: [
      {
        id: 'xxx1',
        title: titles[0],
        logo: avatars[0],
        activeUser: 10000,
        newUser: 12121,
      },
      {
        id: 'xxx2',
        title: titles[1],
        logo: avatars[1],
        description: '希望是一个好东西，也许是最好的，好东西是不会消亡的',
        updatedAt: new Date('2017-07-24'),
        member: '全组都是吴彦祖',
        href: '',
        memberLink: '',
        activeUser: 10000,
        newUser: 12121,
      },
      {
        id: 'xxx3',
        title: titles[2],
        logo: avatars[2],
        activeUser: 10000,
        newUser: 12121,
      },
      {
        id: 'xxx4',
        title: titles[3],
        logo: avatars[3],
        activeUser: 10000,
        newUser: 12121,
      },
      {
        id: 'xxx5',
        title: titles[4],
        logo: avatars[4],
        activeUser: 10000,
        newUser: 12121,
      },
      {
        id: 'xxx6',
        title: titles[5],
        logo: avatars[5],
        activeUser: 10000,
        newUser: 12121,
      },
    ],
  });
};

const getActivities = (_, res) => {
  res.json({
    data: [
      {
        id: 'trend-1',
        orderId: 'ddf202211212',
        auditData: {
          name: '广州一当科技', // 企业名
          code: '123', // 企业代码
          code_type: 1, // 企业代码类型（1：统一社会信用代码， 2：组织机构代码，3：营业执照注册号）
          legal_persona_wechat: '123', // 法人微信
          legal_persona_name: 'candy', // 法人姓名
          idCardImageUrl: [
            'https://img10.51tietu.net/pic/20191029/dccsipxgj3zdccsipxgj3z280x180.jpg',
            'https://img10.51tietu.net/pic/20191029/dccsipxgj3zdccsipxgj3z280x180.jpg',
          ],
          businessLicenseImage:
            'https://img0.baidu.com/it/u=3730681685,1246812468&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=694',
        },
        status: 'process', //wait process finish error
        stepCurrent: 2,
        appletName: '小程序模板名称1',
        creatTime: '2021-10-10 10:24:12',
      },
      {
        id: 'trend-2',
        orderId: 'ddf202211121',
        auditData: {
          name: '广州华卓科技', // 企业名
          code: '11123', // 企业代码
          code_type: 1, // 企业代码类型（1：统一社会信用代码， 2：组织机构代码，3：营业执照注册号）
          legal_persona_wechat: '123', // 法人微信
          legal_persona_name: 'candy', // 法人姓名
          idCardImageUrl: [
            'https://img10.51tietu.net/pic/20191029/dccsipxgj3zdccsipxgj3z280x180.jpg',
            'https://img10.51tietu.net/pic/20191029/dccsipxgj3zdccsipxgj3z280x180.jpg',
          ],
          businessLicenseImage:
            'https://img0.baidu.com/it/u=3730681685,1246812468&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=694',
        },
        status: 'error',
        stepCurrent: 1,
        appletName: '小程序模板名称2',
        creatTime: '2021-10-10 10:24:12',
      },
      {
        id: 'trend-3',
        orderId: 'ddf202211dww1',
        auditData: {
          name: '企业名', // 企业名
          code: '11123', // 企业代码
          code_type: 1, // 企业代码类型（1：统一社会信用代码， 2：组织机构代码，3：营业执照注册号）
          legal_persona_wechat: '123', // 法人微信
          legal_persona_name: 'candy', // 法人姓名
          idCardImageUrl: [
            'https://img10.51tietu.net/pic/20191029/dccsipxgj3zdccsipxgj3z280x180.jpg',
            'https://img10.51tietu.net/pic/20191029/dccsipxgj3zdccsipxgj3z280x180.jpg',
          ],
          businessLicenseImage:
            'https://img0.baidu.com/it/u=3730681685,1246812468&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=694',
        },
        status: 'error',
        stepCurrent: 2,
        appletName: '小程序模板名称3',
        creatTime: '2021-10-10 10:24:12',
      },
    ],
  });
};

const radarOriginData = [
  {
    name: '个人',
    ref: 10,
    koubei: 8,
    output: 4,
    contribute: 5,
    hot: 7,
  },
  {
    name: '团队',
    ref: 3,
    koubei: 9,
    output: 6,
    contribute: 3,
    hot: 1,
  },
  {
    name: '部门',
    ref: 4,
    koubei: 1,
    output: 6,
    contribute: 5,
    hot: 7,
  },
];
const radarData = [];
const radarTitleMap = {
  ref: '引用',
  koubei: '口碑',
  output: '产量',
  contribute: '贡献',
  hot: '热度',
};
radarOriginData.forEach((item) => {
  Object.keys(item).forEach((key) => {
    if (key !== 'name') {
      radarData.push({
        name: item.name,
        label: radarTitleMap[key],
        value: item[key],
      });
    }
  });
});

const getCurrentUser = (_, res) => {
  return res.json({
    data: {
      name: 'Serati Ma',
      avatar: 'https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png',
      userid: '00000001',
      email: 'antdesign@alipay.com',
      signature: '海纳百川，有容乃大',
      title: '交互专家',
      group: '蚂蚁金服－某某某事业群－某某平台部－某某技术部－UED',
      tags: [
        {
          key: '0',
          label: '很有想法的',
        },
        {
          key: '1',
          label: '专注设计',
        },
        {
          key: '2',
          label: '辣~',
        },
        {
          key: '3',
          label: '大长腿',
        },
        {
          key: '4',
          label: '川妹子',
        },
        {
          key: '5',
          label: '海纳百川',
        },
      ],
      notifyCount: 12,
      unreadCount: 11,
      country: 'China',
      geographic: {
        province: {
          label: '浙江省',
          key: '330000',
        },
        city: {
          label: '杭州市',
          key: '330100',
        },
      },
      address: '西湖区工专路 77 号',
      phone: '0752-268888888',
    },
  });
};

const getChartData = (_, res) => {
  res.json({
    data: {
      visitData,
      visitData2,
      salesData,
      searchData,
      offlineData,
      offlineChartData,
      salesTypeData,
      salesTypeDataOnline,
      salesTypeDataOffline,
      radarData,
    },
  });
};

export default {
  'GET  /project/api/project/notice': getAppList1,
  'GET  /project/api/activities': getActivities,
  'GET  /project/api/fake_workplace_chart_data': getChartData,
  'GET  /project/api/currentUser': getCurrentUser,
};
