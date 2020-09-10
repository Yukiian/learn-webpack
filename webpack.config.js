const path = require('path')

module.exports = {
    entry: './src/index.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    module: {
        rules: [{
            test: /\.(jpg|png|gif)$/,
            use: {
                loader:'url-loader',
                options:{
                    name:'[name]_[hash].[ext]',
                    outputPath:'images/',
                    limit:40960
                }
            }
        }]
    }
}