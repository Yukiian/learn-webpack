const { merge } = require('webpack-merge')
const commonConfig = require('./webpack.common.js')

//plugin 在打包的节点上做一些操作，htmlwebpackplugin是在打包结束后加上html模版，clean是在打包之前
const prodConfig = {
    mode: 'production', //production一般不开启devtool，如果要配置的话使用cheap-module-source-map
    devtool: 'cheap-module-source-map',
}

module.exports = merge(commonConfig, prodConfig)