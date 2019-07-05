import webpack from 'webpack'
import path from 'path'
import globby from 'globby'
import htmlWebpackPlugin from 'html-webpack-plugin'
import { ReactLoadablePlugin } from 'react-loadable/webpack'
import { CheckerPlugin } from 'awesome-typescript-loader'
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer'

const cwd = `${process.cwd()}/src`
const files = globby.sync(['pages/*'], { cwd, onlyFiles: false })
const fileIndexs = globby.sync(['pages/*/index.(js|ts|jsx|tsx)'], { cwd, onlyFiles: false })
const { DEV } = process.env

const publicPath = '//test.alicdn.com/'

export default env => {
    const config = {}
    //  需要打包的文件列表
    config.mode = DEV ? 'development' : 'production'

    //  入口文件
    config.entry = files.reduce((result, file, index) => {
        return {
            ...result,
            [`${file}/index`]: `./src/${fileIndexs[index]}`
        }
    }, {})

    //  输出列表
    config.output = {
        path: path.resolve(__dirname, 'dist'),
        publicPath,
        filename: '[name].js',
        chunkFilename: '[name].js'
    }

    //  解析配置
    config.resolve = {
        //  自动解析确定的扩展，能够使用户在引入模块时不带扩展
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
        alias: {
            utils: path.join(__dirname, 'src/utils'),
            pages: path.join(__dirname, 'src/pages')
        }
    }

    //
    config.module = {
        rules: [
            {
                test: /\.ts(x?)$/,
                loader: 'awesome-typescript-loader',
                exclude: /node_modules/,
                options: {
                    useCache: true
                }
            },
            {
                test: /\.jsx$/,
                loader: 'babel-loader',
                exclude: /node_modules/
            },

            {
                test: /\.css$/i,
                use: [
                    {
                        loader: 'style-loader'
                    },
                    {
                        loader: 'css-loader'
                    }
                ],
                /**
                 * 排除掉 module css 部分
                 */
                exclude: /\.module\.css$/i
            },
            {
                test: /\.module\.css$/i,
                use: [
                    {
                        loader: 'style-loader'
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            modules: {
                                localIdentName: '[local]--[hash:base64:5]'
                            }
                        }
                    }
                ]
            },
            {
                test: /\.scss$/i,
                use: [
                    {
                        loader: 'style-loader'
                    },
                    {
                        loader: 'css-loader'
                    },
                    {
                        loader: 'sass-loader'
                    }
                ],
                /**
                 * 排除掉 module css 部分
                 */
                exclude: /\.module\.scss$/i
            },
            {
                test: /\.module\.scss$/i,
                use: [
                    {
                        loader: 'style-loader'
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            modules: {
                                localIdentName: '[local]--[hash:base64:5]'
                            }
                        }
                    },
                    {
                        loader: 'sass-loader'
                    }
                ]
            }
        ]
    }

    const htmlWebpackPlugins = files.map(file => {
        return new htmlWebpackPlugin({
            chunks: [`${file}/index`, 'vendor', 'runtime'],
            template: 'src/demo/index.html',
            filename: `${file}/index.html`
        })
    })

    //  插件
    config.plugins = [
        ...htmlWebpackPlugins,
        new ReactLoadablePlugin({
            filename: './dist/react-loadable.json'
        }),
        //  webpack 打包分析插件
        // new BundleAnalyzerPlugin(),
        //  环境变量定义
        new webpack.DefinePlugin({}),
        new CheckerPlugin()
    ]

    //  优化设置
    config.optimization = {
        minimize: false,
        splitChunks: {
            //  哪些代码需要优化，有三个可选值：initial(初始块)、async(按需加载块)、all(全部块)，默认为async
            //  选择使用 async，使用按需动态加载，会自动将动态引用单独打包，提高公用性；
            chunks: 'async',
            minSize: 30000,
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
                    //  使用 all 模式，会最大化优化公用代码，无论 动态引用、直接引用，都会打进 vendor 文件中；
                    chunks: 'all',
                    //  打包资源变动较少的资源
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendor'
                },
                default: false // 默认不使用default缓存分组
            }
        },
        runtimeChunk: {
            name: 'runtime'
        }
    }

    config.devServer = {
        publicPath,
        disableHostCheck: true,
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Credentials': 'true'
        },
        host: '127.0.0.1',
        port: '8080',
        stats: {
            colors: true,
            chunks: false,
            children: false,
            modules: false,
            chunkModules: false
        }
    }

    config.devtool = 'source-map'
    return config
}
