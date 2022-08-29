import request from '@/utils/request';
/** 分销管理接口*/

/**分销员列表查询接口 */
export async function queryDistributionList(params) {
  return request('/sys/distribution/list', {
    method: 'GET',
    params,
  });
}

/**提现申请列表查询接口 */
export async function queryWithdrawList(params) {
  return request('/sys/distribution/withdrawList', {
    method: 'GET',
    params,
  });
}
