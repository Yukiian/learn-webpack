const webpack = require('webpack')
const { merge } = require('webpack-merge')
const commonConfig = require('./webpack.common.js')

//plugin 在打包的节点上做一些操作，htmlwebpackplugin是在打包结束后加上html模版，clean是在打包之前
const devConfig = {
    mode: 'development', //production一般不开启devtool，如果要配置的话使用cheap-module-source-map
    devtool: 'cheap-module-eval-source-map',
    devServer: {
        contentBase: './dist',
        open: true, //自动打开浏览器
        hot: true, //热更新
        hotOnly: true //即使热更新不起作用也不重新打开浏览器
    },
    plugins: [new webpack.HotModuleReplacementPlugin()],
    optimization: {
        usedExports: true, //devlopoment模式下配置tree-shaking 对没有使用到的模块中的方法不进行打包，只支持es6中import这种方法的导入
    }
}

module.exports = merge(commonConfig, devConfig)