const { merge } = require('webpack-merge')
const commonConfig = require('./webpack.common.js')
const path = require('path')

//plugin 在打包的节点上做一些操作，htmlwebpackplugin是在打包结束后加上html模版，clean是在打包之前
const prodConfig = {
    mode: 'production', //production一般不开启devtool，如果要配置的话使用cheap-module-source-map
    devtool: 'cheap-module-source-map',
    output: {
        filename: '[name].[contenthash].js', //占位符，打包输出多个入口时
        chunkFilename: '[name].[contenthash].js', //间接引入的模块打包生成的文件名走这个
        path: path.resolve(__dirname, '../dist'),
        // publicPath:"http://cdn.example.com" //配合cdn使用
    }
}

module.exports = merge(commonConfig, prodConfig)