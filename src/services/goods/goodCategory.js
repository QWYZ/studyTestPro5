import request from '@/utils/request';

/**新增分类 */
export async function addGoodsCategory(params) {
    return request('', {
        method: 'POST',
        data: params,
    });
}

/**编辑分类 */
export async function updateGoodsCategory(params) {
    return request('', {
        method: 'POST',
        data: params,
    });
}

/**获取商品分类 */
export async function getGoodsCategoryList(params) {
    return request('', {
        params,
    });
}

/** 删除商品分类
 * @param  params
 */
export async function deleteGoodsCategory(params) {
    return request('', {
        method: 'DELETE',
        data: { ...params },
        requestType: 'form'
    });
}