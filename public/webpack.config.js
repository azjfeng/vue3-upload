const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { VueLoaderPlugin } = require('vue-loader')
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const {CleanWebpackPlugin} = require("clean-webpack-plugin");
module.exports = {
    entry: __dirname+'/main.js',

    devtool:"inline-source-map",
    performance: { hints: false },
    plugins: [
        new HtmlWebpackPlugin(
            {
                filename: '../../common/index.html', // 输出文件【注意：这里的根路径是module.exports.output.path】
                template: './src/template.html', // 源模板文件
            }
        ),
        new VueLoaderPlugin(),
        new MiniCssExtractPlugin(),
        new CleanWebpackPlugin()
        
    ],
    output: {
        filename: '[name].js',
        chunkFilename: '[name].js',
        // path: path.resolve(__dirname, 'dist')
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader'
                ]
            },
            {
                test: /\.js$/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            },
            {
                test:/\.vue$/,
                use:[
                    'vue-loader'
                ]
            },
            {
                test: /\.(png|jpg|gif|svg|ttf|woff|woff2)$/,
                use: [
                  {
                    loader: 'file-loader',
                    options: {}
                  }
                ]
              }
        ]
    }
};