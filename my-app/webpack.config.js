const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TsCheckerPlugin = require('fork-ts-checker-webpack-plugin');

const buildPath = path.resolve(__dirname, 'dist');
const srcPath = path.resolve(__dirname, 'src');
const isProd = process.env.NODE_ENV === 'production';

const getSettingsForStyles = (withModules = false) => {
    return [MiniCssExtractPlugin.loader,
        !withModules ? 'css-loader' : {
            loader: 'css-loader',
            options: {
                modules: {
                    localIdentName: !isProd ? '[path][name]__[local]' : '[hash:base64]'
                }
            }
        }, {
            loader: 'postcss-loader',
            options: {
                postcssOptions: {
                    plugins: ['autoprefixer']
                }
            }
        }, 'sass-loader']
}

module.exports = {
    entry: path.resolve(srcPath, 'index.tsx'),
    output: {
        path: buildPath,
        filename: "bundle.js"
    },
    mode: 'development',
    target: !isProd ? 'web' : 'browserslist',
    devtool: !isProd ? 'hidden-source-map' : 'eval-source-map',
    module: {
        rules: [
            {
                test: /\.[tj]sx?$/,
                use: 'babel-loader'
            },
            {
                test: /\.module\.s?css$/,
                use: getSettingsForStyles(true)
            },
            {
                test: /\.s?css$/,
                exclude: /\.module\.s?css$/,
                use: getSettingsForStyles()
            },
            {
                test: /\.(png|svg|jpg)$/,
                type: "asset",
                parser: {
                    dataUrlCondition: {
                        maxSize: 10 * 1024
                    }
                }
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './public/index.html',
        }),
        !isProd && new ReactRefreshWebpackPlugin(),
        new MiniCssExtractPlugin({
            filename: '[name]-[hash].css'
        }),
        new TsCheckerPlugin ()
    ].filter(Boolean),
    resolve: {
        extensions: ['.tsx', '.jsx', '.js', '.ts'],
        alias: {
            components: path.join(srcPath, 'App/components'),
            config: path.join(srcPath, 'config'),
            styles: path.join(srcPath, 'styles'),
            utils: path.join(srcPath, 'utils'),
            img: path.join(srcPath, 'media/img'),
            app: path.join(srcPath, 'App'),
            store: path.join(srcPath, 'store'),
        }
    },
    devServer:{
        host: "127.0.0.1",
        port: 9000,
        hot: true,
        historyApiFallback: true,
    }
}
