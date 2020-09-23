const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin') //会在打包结束后自动生成一个html文件，并把打包生成的js自动引入到这个html文件中
const {
    CleanWebpackPlugin
} = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const TerserJSPlugin = require('terser-webpack-plugin');

//plugin 在打包的节点上做一些操作，htmlwebpackplugin是在打包结束后加上html模版，clean是在打包之前
module.exports = {
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
            test: /\.css$/i,
            use: [MiniCssExtractPlugin.loader, 'css-loader'],
        }, {
            test: /\.(eot|svg|ttf|woff)$/,
            use: {
                loader: 'file-loader',
            }
        }]
    },
    optimization: {
        minimizer: [new TerserJSPlugin({}), new OptimizeCSSAssetsPlugin({})],
        usedExports: true, //devlopoment模式下配置tree-shaking 对没有使用到的模块中的方法不进行打包，只支持es6中import这种方法的导入
        splitChunks: {
            chunks: 'async', //代码分割时只对异步代码进行分割 -all 同步异步都会代码分割
            minSize: 20000, //最小的大小，超过这个数值会帮你做代码分割
            // maxSize: 0,//对代码进行二次分割
            minChunks: 1, //当一个模块至少被用了多少次才做代码分割
            maxAsyncRequests: 30,
            maxInitialRequests: 30,
            automaticNameDelimiter: '~', //连接符
            enforceSizeThreshold: 50000,
            cacheGroups: {
                defaultVendors: {
                    test: /[\\/]node_modules[\\/]/,
                    priority: -10, //对于都满足打包条件的库，到底应该放在那个哪个组里呢，根据priority来配置的，值越大优先级越高，
                    filename: 'vendors.js'
                }, //当遇到同步的代码时，webpack知道你要做代码分割，于是会走到cacheGroups中配置，当发现你的库时在nodemodule文件夹下时会统一打包到vendor文件下
                default: {
                    priority: -20,
                    reuseExistingChunk: true, //如果一个模块在之前打包过了，不会再重新打包一次
                    filename: 'common.js'
                } //不再nodemodule下的文件会走到这里来配置打包
            }
        }
    },
    plugins: [new CleanWebpackPlugin(), new HtmlWebpackPlugin({
        template: 'src/index.html'
    }), new MiniCssExtractPlugin()]
}