/**
 * @Description: 租户管理接口文件
 * @author yeship
 * @date 2021/8/16 17:35
 */
import request from '@/utils/request';

// 获取租户列表
export async function getTenantList(params) {
  return request('/sys/tenant/listTenant', {
    method: 'GET',
    params
  });
}

/**获取所有租户下拉 */
export async function listAllEffectiveTenant(params) {
 return request('/sys/tenant/listAllEffectiveTenant', {
   params,
 });
}

// 新增租户
export async function addTenant(params) {
  return request('/sys/tenant/createTenant', {
    method: 'POST',
    data: { ...params }
  });
}

// 修改租户
export async function updateTenant(params) {
  return request('/sys/tenant/modifyTenant', {
    method: 'POST',
    data: { ...params }
  });
}

// 解禁，禁用租户
export async function frozenTenant(params) {
  return request('/sys/tenant/frozenTenantOrNot', {
    method: 'POST',
    data: { ...params }
  });
}

// 获取业务菜单权限树
export async function getMenuTree(params) {
  return request('/sys/permission/listBusinessTree.do', {
    method: 'GET',
    params
  });
}

// 业务授权
export async function subscribeService(params) {
  return request('/sys/tenant/subscribeService', {
    method: 'POST',
    data: { ...params }
  });
}

// 获取租户物业树形列表
export async function getTenantAndPropertyTreeList(params) {
  let relTenantIds = JSON.parse(localStorage.getItem('loginUserData'))?.userInfo?.relTenantIds || ''
  if(relTenantIds){
    params['tenantId'] = relTenantIds
  }
  return request('/sys/tenant/treeTenantAndProperty', {
    method: 'GET',
    params
  });
}
