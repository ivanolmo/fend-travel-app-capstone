const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
    mode: 'development',
    devtool: 'source-map',
    stats: 'verbose',
    // devServer: {
    //     host: "localhost",
    //     port: "8080",
    //     proxy: [
    //         {
    //             context: ['/sentiment', '/summarize'],
    //             target: 'http://localhost:9000'
    //         }
    //     ]
    // },
    module: {
        rules: [
            {
                test: /\.scss$/,
                loader: ['style-loader', 'css-loader', 'sass-loader']
            }
        ]
    }
});