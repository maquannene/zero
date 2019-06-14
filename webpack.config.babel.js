import webpack from 'webpack'
import path from 'path'
import globby from 'globby'
import htmlWebpackPlugin from 'html-webpack-plugin'
import { ReactLoadablePlugin } from 'react-loadable/webpack'
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer'

// const files = globby.sync(['**/pages/**'], { cwd: `${process.cwd()}/src` })

export default env => {
    const config = {}
    //  需要打包的文件列表
    // config.entry = files.reduce((result, file) => {
    //     return {
    //         ...result,
    //         [file]: `./src/${file}`
    //     }
    // }, {})
    config.entry = {
        'page/demo1/index': './src/page/demo1/index.jsx',
        'page/demo2/index': './src/page/demo2/index.jsx'
    }
    console.log(__dirname)
    //  输出列表
    config.output = {
        path: path.resolve(__dirname, 'dist'),
        publicPath: '/dist',
        filename: '[name].js',
        chunkFilename: '[name].js'
    }
    //  解析配置
    config.resolve = {
        //  自动解析确定的扩展，能够使用户在引入模块时不带扩展
        extensions: ['.js', '.jsx']
    }
    //
    config.module = {
        rules: [
            {
                test: /\.jsx$/,
                loader: 'babel-loader',
                exclude: /node_modules/
            }
        ]
    }

    //  插件
    config.plugins = [
        new htmlWebpackPlugin({
            chunks: ['page/demo1/index', 'vendor', 'runtime'],
            template: 'src/demo/index.html',
            filename: 'page/demo1/index.html'
        }),
        new htmlWebpackPlugin({
            chunks: ['page/demo2/index', 'vendor', 'runtime'],
            template: 'src/demo/index.html',
            filename: 'page/demo2/index.html'
        }),
        new ReactLoadablePlugin({
            filename: './dist/react-loadable.json'
        })
        //  webpack 打包分析插件
        // new BundleAnalyzerPlugin()
    ]

    //  优化设置
    config.optimization = {
        minimize: false,
        splitChunks: {
            //  哪些代码需要优化，有三个可选值：initial(初始块)、async(按需加载块)、all(全部块)，默认为async
            //  选择使用 async，使用按需动态加载，会自动将动态引用单独打包，提高公用性；
            chunks: 'async',
            minSize: 30,
            // 被引用次数，默认为1
            minChunks: 1,
            // 按需加载时候最大的并行请求数，默认为5
            maxAsyncRequests: 5,
            // 最大的并行请求数，默认为3
            maxInitialRequests: 3,
            // 公共chunks的分隔符
            automaticNameDelimiter: '~',
            name: true,
            cacheGroups: {
                vendor: {
                    //  打包资源变动较少的资源
                    test: /[\\/]node_modules[\\/]/,
                    priority: -10,
                    name: 'vendor',
                    //  使用 all 模式，会最大化优化公用代码，无论 动态引用、直接引用，都会打进 vendor 文件中；
                    chunks: 'all'
                },
                default: false // 默认不使用default缓存分组
            }
        },
        runtimeChunk: {
            name: 'runtime'
        }
    }

    // config.devtool = 'source-map'
    return config
}
