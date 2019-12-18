// vue.config.js
const path = require('path')

function resolve(dir) {
  return path.join(__dirname, dir)
}

module.exports = {
    publicPath: './',
    assetsDir: 'assets',
    productionSourceMap: false,
    devServer: {
        // 关闭eslint配置
         overlay: {warnings: false, errors: false },
         lintOnSave: false,
     },
    chainWebpack: config => {
    },
    css: {
      loaderOptions: {
        sass: {
          data: `
            @import "@/scss/functions.scss";
          `
        }
      }
    },
    devServer: {
        /**
         * proxy: {
         *     '/api': {
         *         target: 'http://192.168.14.29:31006/xindai/',
         *         changeOrigin: true,
         *         ws: true,
         *         pathRewrite: {
         *             '^/api': '/',
         *         }
         *     }
         * },
         */
    },
}