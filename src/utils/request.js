/** Request 网络请求工具 更详细的 api 文档: https://github.com/umijs/umi-request */
import { extend } from 'umi-request';
import { notification, message } from 'antd';
import defaultSettings from "../../config/defaultSettings";

const codeMessage = {
  404: '请求接口不存在',
  500: '登录信息失效，请重新登录',
  502: '网关错误',
  504: '网关超时',
};

/** 异常处理程序 */
const errorHandler = (error) => {
  if(error && error.response){
    const { response } = error;
    
    if (response && response.status) {
        const errorText = codeMessage[response.status];
        message.error({content:errorText,key:"globalErrorMessage"})
    } else if (!response) {
        message.error({content:'网络请求超时，请检查网络',key:"globalErrorMessage"});
    }
    // console.log('执行1');
    return response;
  }
};
/** 配置request请求时的默认参数 */

const request = extend({
  errorHandler,
  // 默认错误处理
  credentials: 'include', // 默认请求是否带上cookie
});

//请求拦截
request.interceptors.request.use((url, options) => {
  // console.log('请求拦截');
  
  // const token = url.match("jetlinks")? "6bef34e77fad28468b57788deba79bf4" : JSON.parse(localStorage.getItem('loginUserData'))?.token;
  // const headers = {};
  // token ? headers['X-Access-Token'] = token : null;
  // token ? headers['Authorization'] = token : null;
  return {
    url: defaultSettings.serverApiName + url,
    options: {
      ...options,
      headers: options?.headers,
      timeout: 30000 
    },
  };
});

//响应拦截
request.interceptors.response.use(async (response, options) => {

  const data = await response.clone().json();
  if (data.success === false) {
    // 界面报错处理
    switch (data.code) {
      // case 500:
      //   message.error('服务器出错')
      //   break;
      default:
        message.error(data.message)
        break;
    }
  }
  if(data && data.resp_msg){
    message.error(data.resp_msg)
  }
  // console.log('响应拦截', response, data, options);
  return response;
});

export default request;
