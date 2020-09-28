
const path = require('path')
const TerserPlugin = require('terser-webpack-plugin')

module.exports = {
  publicPath: '',
  productionSourceMap: false,
  devServer: {
    // open: true,
    port: 8000,
    disableHostCheck: true,
   
  },
  chainWebpack: config => {
    config.resolve.symlinks(true)
  },
  configureWebpack: config => {
    if (process.env.VUE_APP_MODE === 'production') {
      config.optimization.minimizer[0].options.terserOptions.compress.warnings = false
      config.optimization.minimizer[0].options.terserOptions.compress.drop_console = true
      config.optimization.minimizer[0].options.terserOptions.compress.drop_debugger = true
      config.optimization.minimizer[0].options.terserOptions.compress.pure_funcs = ['console.log']
    }
    config.externals = {
      AMap: 'AMap',
    }
  }
}