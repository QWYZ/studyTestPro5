import request from '@/utils/request';


/** 获取用户列表*/
 export async function listUser(params) {
  return request('/sys/user/list.do', {
    params,
  });
}

/** 新增用户*/
export async function addUser(params) {
  return request('/sys/user/add.do', {
    method: 'POST',
    data: params,
  });
}

/**编辑用户*/
 export async function editUser(params) {
  return request('/sys/user/edit.do', {
    method: 'PUT',
    data: params,
  });
}

/**删除用户*/
 export async function deleteUser(params) {
  return request('/sys/user/delete', {
    method: 'DELETE',
    data: params,
    requestType:'form'
  });
}

/**重置用户密码 */
export async function resetPassword(params){
  return request('/sys/user/resetDefaultPassword.do', {
    method: 'PUT',
    data: params,
  });
}

/** 冻结用户 */
export async function freezeUser(params){
  return request('/sys/user/frozenBatch', {
    method: 'PUT',
    data: params,
  });
}