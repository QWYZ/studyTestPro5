const waitTime = (time = 100) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
};

const listData = [
  {
    id: '1',
    userId: 'user001',
    tenantName: '',
    realName: '用户002',
    roleName: null,
    phone: null,
    status: 2,
    lastLogin: '2022-10-21 10:24:12',
  },
  {
    id: '1',
    userId: 'user002',
    tenantName: '',
    realName: '用户002',
    roleName: null,
    phone: null,
    status: 2,
    lastLogin: '2022-02-21 02:24:12',
  },
];

export default {
  'GET /project/sys/user/list.do': async (req, res) => {
    await waitTime(0);
    const { current, pageSize } = req.query;
    res.send({
      message: '查询成功',
      result: {
        data: listData,
        total: 10,
        success: true,
        pageSize: Number(pageSize),
        current: Number(current),
      },
      success: true,
    });
  },
};
