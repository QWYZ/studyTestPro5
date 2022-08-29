import request from '@/utils/request';

/**登录 */
export async function fakeAccountLogin(params) {
  return request('', {
    method: 'POST',
    data: params,
  });
}

/**获取用户菜单和权限 */
export async function queryUserMenu(params) {
  return request('', {
    params,
  });
}