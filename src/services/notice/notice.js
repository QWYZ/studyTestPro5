/**
 * @Description: 消息通知
 * @author 千万样子
 * @date 2021/11/8
 */

import request from '@/utils/request';
import { encodeQueryParam } from '@/utils/utils';
import { defer, from } from 'rxjs';
import { map, filter, flatMap } from 'rxjs/operators';


/**消息通知列表 */
export async function findNotifierConfigList(params) {
    return request(`/jetlinks/notifier/config/_query`, {
        params,
    });
}

/**消息通知类型列表 */
export async function notifierConfigTypeList(params) {
    return request(`/jetlinks/notifier/config/types`, {
        params,
    });
}

/**通知模板列表 */
export async function notifierTemplateList(params) {
    return request(`/jetlinks/notifier/template/_query`, {
        params,
    });
}
