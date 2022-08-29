/**
 * @Description: 上传接口
 * @date 2021/9/3 14:22
 */

import request from '@/utils/request';

/** 上传图片
 * @param  params
 */
export async function uploadImage(params) {
  return request('/sys/common/imgUpload.do', {
    method: 'POST',
    data: params,
    requestType: 'form',
  });
}
