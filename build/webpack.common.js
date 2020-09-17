const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin') //会在打包结束后自动生成一个html文件，并把打包生成的js自动引入到这个html文件中
const {
    CleanWebpackPlugin
} = require('clean-webpack-plugin')

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
            test: /\.(eot|svg|ttf|woff)$/,
            use: {
                loader: 'file-loader',
            }
        }]
    },
    plugins: [new CleanWebpackPlugin(), new HtmlWebpackPlugin({
        template: 'src/index.html'
    })],
    output: {
        filename: '[name].js', //占位符，打包输出多个入口时
        path: path.resolve(__dirname, '../dist'),
        // publicPath:"http://cdn.example.com" //配合cdn使用
    }
}