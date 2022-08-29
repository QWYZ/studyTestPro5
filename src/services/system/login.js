import request from '@/utils/request';

/**登录 */
export async function fakeAccountLogin(params) {
  return request('/login', {
    method: 'POST',
    data: params,
  });
}

// export async function fakeAccountLogin(params) {
//   return request('/api-uaa/oauth/token', {
//     headers:{
//       'Authorization':'Basic d2ViQXBwOndlYkFwcA==',
//     },
//     method: 'POST',
//     params
//   });
// }

/**获取用户菜单和权限 */
export async function queryUserMenu(params) {
  return request('/sys/permission/getUserSysPermissionByToken.do', {
    params,
  });
}

// export async function queryUserMenu(params) {
//   return request('/api-user/users/current', {
//     params,
//   });
// }

/**退出登录 */
export async function outLogin(params) {
  return request('/sys/logout', {
    params,
  });
}
