/**
 * @Description: 菜单接口
 * @author
 * @date 2021/6/21 08:55
 */
import request from '@/utils/request';

 //查询菜单全部(菜单tree)
export async function querySystemMenuTreeList(params) {
  return request('/menu/listMenu.do', {
    params,
  });
}

//新增菜单
export async function addMenu(params) {
  return request('/sys/permission/add.do', {
    method: 'POST',
    data: { ...params },
  });
}


//删除菜单
export async function deleteMenu(params) {
  return request('/sys/permission/delete.do', {
    method: 'DELETE',
    data: { ...params },
    requestType: 'form'
  });
}

//编辑菜单
export async function editMenu(params) {
  return request('/sys/permission/edit.do', {
    method: 'POST',
    data: { ...params },
  });
}

/**根据角色id获取菜单及角色已有菜单 */
export async function queryMenuTreeByRoleId(params) {
  return request('/sys/permission/getUserSysPermissionAndRoleByRole.do', {
    params
  });
}
