const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin') //会在打包结束后自动生成一个html文件，并把打包生成的js自动引入到这个html文件中
const {
    CleanWebpackPlugin
} = require('clean-webpack-plugin')
const webpack = require('webpack')

//plugin 在打包的节点上做一些操作，htmlwebpackplugin是在打包结束后加上html模版，clean是在打包之前
module.exports = {
    mode: 'development', //production一般不开启devtool，如果要配置的话使用cheap-module-source-map
    devtool: 'cheap-module-eval-source-map',
    devServer: {
        contentBase: './dist',
        open: true, //自动打开浏览器
        hot: true, //热更新
        hotOnly: true //即使热更新不起作用也不重新打开浏览器
    },
    entry: {
        main: './src/index.js',
    },
    module: {
        rules: [{
            test: /\.js$/,
            exclude: /node_modules/,
            loader: "babel-loader"
        }, {
            test: /\.(jpg|png|gif)$/,
            use: {
                loader: 'url-loader',
                options: {
                    name: '[name]_[hash].[ext]',
                    outputPath: 'images/',
                    limit: 40960
                }
            }
        }, {
            test: /\.scss$/,
            use: ['style-loader', {
                loader: 'css-loader',
                options: {
                    importLoaders: 2
                }
            }, 'sass-loader', 'postcss-loader']
        }, {
            test: /\.(eot|svg|ttf|woff)$/,
            use: {
                loader: 'file-loader',
            }
        }]
    },
    plugins: [new CleanWebpackPlugin(), new HtmlWebpackPlugin({
        template: 'src/index.html'
    }), new webpack.HotModuleReplacementPlugin()],
    optimization: {
        usedExports: true //devlopoment模式下配置tree-shaking 对没有使用到的模块中的方法不进行打包，只支持es6中import这种方法的导入
    },
    output: {
        filename: '[name].js', //占位符，打包输出多个入口时
        path: path.resolve(__dirname, 'dist'),
        // publicPath:"http://cdn.example.com" //配合cdn使用
    }
}