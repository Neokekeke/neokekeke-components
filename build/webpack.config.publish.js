const path = require('path');
const base = require('./webpack.config.base');
const {
    merge
} = require('webpack-merge');
const TerserPlugin = require('terser-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = merge(base, {
    mode: 'production',
    entry: path.resolve(__dirname, '../src/components/index.js'),
    output: {
        filename: 'k-ui.js',
        path: path.resolve(__dirname, '../lib'),
        publicPath: '/lib/',
        library: 'k-ui',
        libraryTarget: 'umd',
        umdNamedDefine: true
    },
    module: {
        rules: [{
            test: /\.(less|css)$/,
            use: [{
                    loader: MiniCssExtractPlugin.loader,
                    options: {
                        hmr: false, // hmr热更新
                    },
                }, // style-loader creates style nodes from JS strings
                {
                    loader: 'css-loader', // translates CSS into CommonJS
                    options: {
                        modules: {
                            mode: 'local', // enable css module 模块化
                            localIdentName: '[local]', // 模块化名称
                        },
                    },
                },
                'postcss-loader', // process CSS with PostCSS addprefix
                'less-loader', // compiles Less to CSS
            ],
        }, ]
    },
    optimization: {
        minimize: true,
        minimizer: [
            new TerserPlugin({
                sourceMap: false, // 开启sourceMap
                parallel: false,
                terserOptions: {
                    ecma: 8,
                    output: {
                        comments: false, // 保留注释
                        beautify: false, // 不需要格式化
                    },
                    compress: {
                        drop_console: true, // 去除console
                        collapse_vars: true, // 内嵌定义了但是只有用到一次的变量
                        reduce_vars: true, // 提取出出现多次但是没有定义成变量去引用的静态值
                    },
                },
            }),
        ],
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: 'css/k-ui.css',
        }),
    ]
});
