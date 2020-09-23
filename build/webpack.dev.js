const webpack = require('webpack')
const { merge } = require('webpack-merge')
const commonConfig = require('./webpack.common.js')
const path = require('path')

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
    output: {
        filename: '[name].js', //占位符，打包输出多个入口时
        chunkFilename: '[name].chunk.js', //间接引入的模块打包生成的文件名走这个
        path: path.resolve(__dirname, '../dist'),
        // publicPath:"http://cdn.example.com" //配合cdn使用
    }
}

module.exports = merge(commonConfig, devConfig)