const path = require('path');

// vue loader
const VueLoaderPlugin = require('vue-loader/lib/plugin');

module.exports = {
    resolve: {
        extensions: ['.js', '.vue'],
        alias: {
            '@components': path.resolve(__dirname, '../src/components'),
            '@util': path.resolve(__dirname, '../src/utils'),
            vue$: 'vue/dist/vue.esm.js',
        },
    },
    module: {
        rules: [
            {
                test: /\.js?$/,
                loader: 'babel-loader',
                exclude: path.resolve(__dirname, '../node_modules')
            },
            {
                test: /\.vue$/,
                loader: 'vue-loader',
            },
            {
                test: /\.(jpe?g|png|gif|ico|woff|woff2|eot|ttf|svg|swf|otf)$/i,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 5000, // 5kb内编译成为base64，大于5kb使用file-loader，打包出文件
                            name: 'static/[name]_[contentHash:8].[ext]',
                        },
                    },
                ],
            },
        ],
    },
    plugins: [
        // vue loader plugin
        new VueLoaderPlugin(),
    ],
};
