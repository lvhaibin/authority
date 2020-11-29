const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    entry: {
        main: './src/main.jsx'
    },
    mode: 'development',
    devtool: 'source-map',
    output: {
        filename: '[name].js',
        chunkFilename: '[name].[chunkhash:8].js',
        publicPath: '/'
    },

    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                use: 'babel-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.(less|css)$/,
                // use: [MiniCssExtractPlugin.loader, 'css-loader', 'less-loader']
                use: ['style-loader', 'css-loader', 'less-loader']
            }
        ]
    },

    optimization: {
        runtimeChunk: 'single',
        splitChunks: {
            cacheGroups: {
                reactBase: {
                    name: 'reactBase',
                    test: (module) => {
                        return /react|redux|/.test(module.context);
                    },
                    chunks: 'initial',
                    priority: 10,
                },
                immutableBase: {
                    name: 'immutableBase',
                    test: (module) => {
                        return /immutable/.test(module.context);
                    },
                    chunks: 'initial',
                    priority: 10,
                },
                momentBase: {
                    name: 'momentBase',
                    test: (module) => {
                        return /moment/.test(module.context);
                    },
                    chunks: 'initial',
                    priority: 10,
                },
                lodashBase: {
                    name: 'lodashBase',
                    test: (module) => {
                        return /lodash/.test(module.context);
                    },
                    chunks: 'initial',
                    priority: 10,
                },
                antdBase: {
                    name: 'lantdBase',
                    test: (module) => {
                        return /antd|@ant-design\/icons/.test(module.context);
                    },
                    chunks: 'initial',
                    priority: 10,
                },
                common: {
                    name: 'common',
                    chunks: 'initial',
                    priority: 2,
                    minChunks: 2,
                    reuseExistingChunk: true
                },
            },
        },
    },

    plugins: [
        new CleanWebpackPlugin(),
        new webpack.ids.HashedModuleIdsPlugin(),
        new HtmlWebpackPlugin({
            title: '如风少年~',
            template: './build/index.html'
        }),
        new webpack.HotModuleReplacementPlugin(),
        // new BundleAnalyzerPlugin(),
        // new MiniCssExtractPlugin({
        //     filename: '[name].css',// 分离后的文件名
        //     chunkFilename: '[id].css',//
        //     ignoreOrder: false
        // })
    ],

    resolve: {
        extensions: ['.js', '.css', '.jsx', '.less', '.css'],
        alias: {
            '@component': path.resolve(__dirname, '../src/components/'),
            '@request': path.resolve(__dirname, '../src/request/'),
            '@utils': path.resolve(__dirname, '../src/utils/'),
            '@actions': path.resolve(__dirname, '../src/redux/actions/'),
        }
    },
}
