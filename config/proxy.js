/**
 * 在生产环境 代理是无法生效的，所以这里没有生产环境的配置
 * -------------------------------
 * The agent cannot take effect in the production environment
 * so there is no configuration of the production environment
 * For details, please see
 * https://pro.ant.design/docs/deploy
 */
export default {
  dev: {
    '/project': {
      target: 'http://192.168.124.122:9999',
      // 依赖 origin 的功能可能需要这个，比如 cookie
      changeOrigin: true,
      pathRewrite: {},
    },
    // '/jeecg-system/': {
    //   target: 'http://192.168.124.122:9999',
    //   changeOrigin: true,
    // },
  },
};
