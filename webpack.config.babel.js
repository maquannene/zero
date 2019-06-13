import webpack from 'webpack'
import path from 'path'
import globby from 'globby'

const files = globby.sync(['**/pages/**'], { cwd: `${process.cwd()}/src` })

export default env => {
    const config = {}
    //  需要打包的文件列表
    config.entry = files.reduce((result, file) => {
        return {
            ...result,
            [file]: `./src/${file}`
        }
    }, {})
    //  输出列表
    config.output = {
        path: path.resolve(__dirname, 'dist'),
        publicPath: 'dist',
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
    config.plugins = [new webpack.DefinePlugin({})]

    //  优化设置
    config.optimization = {
        splitChunks: {
            chunks: 'async', // 哪些代码需要优化，有三个可选值：initial(初始块)、async(按需加载块)、all(全部块)，默认为async
            minSize: 30000,
            minChunks: 1, // 被引用次数，默认为1
            maxAsyncRequests: 5, // 按需加载时候最大的并行请求数，默认为5
            maxInitialRequests: 3, // 最大的并行请求数，默认为3
            automaticNameDelimiter: '~', // 公共chunks的分隔符
            name: true,
            cacheGroups: {
                vendor: {
                    // 打包资源变动较少的资源
                    test: /[\\/]node_modules[\\/]/,
                    priority: -10,
                    name: 'vendor',
                    chunks: 'all'
                },
                default: false // 默认不使用default缓存分组
            }
        },
        runtimeChunk: {
            name: 'runtime'
        }
    }

    return config
}
