const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
// const apiMocker = require('webpack-api-mocker');
// const path = require('path');

const config = require('./webpack.config.js');


new WebpackDevServer(webpack(config), {
    hot: true,
    historyApiFallback: true,
    proxy: {
        '/api': {
            target: 'http://localhost:3000',
        }
    },
    publicPath: config.output.publicPath,
}).listen(9000, 'localhost', function (err) {
    console.log('Listening at http://localhost:9000/');
});
