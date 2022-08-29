/**
 * @Description: 角色接口
 * @author
 * @date 2021/6/23
 */
import request from '@/utils/request';

/** 分页查询角色列表
 * @param {}  params
 */
export async function queryRoleList(params) {
  return request('/sys/role/list.do', {
    params,
  });
}

/** 新增角色
 * @param {}  params
 */
export async function addRole(params) {
  return request('/sys/role/add.do', {
    method: 'POST',
    data: { ...params },
  });
}

/** 编辑角色
 * @param {}  params
 */
 export async function editRole(params) {
  return request('/sys/role/edit.do', {
    method: 'PUT',
    data: { ...params },
  });
}

/** 删除角色
 * @param {id}  params
 */
 export async function deleteRole(params) {
  return request('/sys/role/delete.do', {
    method: 'DELETE',
    data: { ...params },
    requestType: 'form'
  });
}

/** 查询角色菜单权限树
 * @param {}  params
 */
 export async function queryTreeList(params) {
  return request('/sys/role/queryTreeList', {
    params,
  });
}

/** 设置角色权限
 * @param {}  params
 */
 export async function setRolePermission(params) {
  return request('/sys/permission/saveRolePermission.do', {
    method: 'POST',
    data: { ...params },
  });
}



/**
 * 获取角色下拉
 */
 export async function queryRoleDropDown(params) {
  return request('/sys/role/getUserRoleList.do', {
    params,
  });
}
