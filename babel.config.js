module.exports = {
    // 解析ES6
    presets: [
        [
            '@babel/preset-env',
            {
                modules: false, // 不转换import export成require，方便后面进行treeshaking

                // 这里组件打包的时候估计是被polifills了，被挂载到了window上不能被import
                // useBuiltIns: 'usage', // 是为浏览器添加polyfills
                // corejs: '3.x',
                // targets: {
                //     ie: '11',
                //     chrome: '57',
                //     browsers: 'cover 99.5%'
                // },
            }
        ]
    ],
    plugins: [
        '@babel/plugin-syntax-dynamic-import',
        [
            'component',
            {
                'libraryName': 'element-ui',
                'styleLibraryName': 'theme-chalk'
            }
        ]
    ]
};
