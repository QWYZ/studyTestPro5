/**
 * @Description: 菜单接口
 * @author
 * @date 2021/6/21 08:55
 */
 import request from '@/utils/request';

//物业列表
export async function queryPropertyList(params) {
 return request('/sys/property/list', {
   params,
 });
}

//新增物业
export async function addProperty(params) {
 return request('/sys/property/add', {
   method: 'POST',
   data: { ...params },
 });
}


//删除物业
export async function deleteProperty(params) {
 return request('/sys/systemdevice/deleteProperty', {
   method: 'DELETE',
   data: { ...params },
   requestType: 'form'
 });
}

//编辑物业
export async function editProperty(params) {
 return request('/sys/property/modify', {
   method: 'POST',
   data: { ...params },
 });
}


//物业下级列表 (非最后一级)
export async function queryPropertyDownList(params) {
 return request('/sys/propertyDown/list', {
   params,
 });
}

//物业下级列表 (非最后一级)
export async function queryPropertyLastList(params) {
 return request('/sys/propertyDown/listLast', {
   params,
 });
}

//新增一级物业
export async function addFirstProperty(params) {
 return request('/sys/propertyDown/addFirst', {
   method: 'POST',
   data: { ...params },
 });
}

//新增二级物业
export async function addSecondProperty(params) {
 return request('/sys/propertyDown/addSecond', {
   method: 'POST',
   data: { ...params },
 });
}

//新增三级物业
export async function addThirdProperty(params) {
 return request('/sys/propertyDown/addThird', {
   method: 'POST',
   data: { ...params },
 });
}

//编辑物业下级
export async function editPropertyDown(params) {
 return request('/sys/propertyDown/modify', {
   method: 'POST',
   data: { ...params },
 });
}

//删除物业下级
export async function deletePropertyDown(params) {
 return request('/sys/systemdevice/deletePropertyDown', {
    method: 'DELETE',
    data: { ...params },
    requestType: 'form'
 });
}

