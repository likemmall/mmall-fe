/*
 * @Author: like 
 * @Date: 2017-08-30 15:46:35 
 * @Last Modified by: like
 * @Last Modified time: 2017-09-04 14:36:24
 */
var webpack = require('webpack')
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var HtmlWebpackPlugin = require("html-webpack-plugin");

//获取html-webpack-plugin 参数的方法
var getHtmlConfig = function (name,title) {
    return {
        template: './src/view/' + name + '.html',
        filename: 'view/' + name + '.html',
        title:title,
        inject: true,
        hash: true,
        chunks: ['common',name]
    }
}
//weboack config
var config = {
    entry: {
        'common': ['./src/page/common/index.js'],//通用模块
        'index': ['./src/page/index/index.js'],
        'user-login': ['./src/page/user-login/index.js'],
        'user-register': ['./src/page/user-register/index.js'],
        'user-pass-reset': ['./src/page/user-pass-reset/index.js'],
        'user-center': ['./src/page/user-center/index.js'],
        'user-center-update': ['./src/page/user-center-update/index.js'],
        'user-pass-update': ['./src/page/user-pass-update/index.js'],
        'result': ['./src/page/result/index.js'],
    },
    output: {
        path: './dist',//存储文件用的路径
        publicPath:'/dist',//访问文件时用的路径
        filename: 'js/[name].js'
    },
    externals: {
        'jquery': 'window.jQuery' //使用外部资源
    },
    module: {
        loaders: [
            {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract("style-loader", "css-loader")
            },
            {
                test: /\.(gif|png|jpg|woff|svg|eot|ttf|ico)\??.*$/,
                loader: "url-loader?limit=100&name=resource/[name].[ext]"
            },
            {
                test: /\.string$/,
                loader: "html-loader"
            },
        ]
    },
    resolve:{
        alias:{
            node_modules:__dirname+'/node_modules',
            util:__dirname + '/src/util',
            page:__dirname + '/src/page',
            service:__dirname + '/src/service',
            image:__dirname + '/src/image'
        }
    },
    plugins: [
        //独立通用模块到js/base.js
        new webpack.optimize.CommonsChunkPlugin({
            name: 'common',//通用模块
            filename: 'js/base.js'   //输出目录
        }),
        //css单独打包
        new ExtractTextPlugin("css/[name].css"),
        //html模板的处理
        new HtmlWebpackPlugin(getHtmlConfig('index','首页')),
        new HtmlWebpackPlugin(getHtmlConfig('user-login','用户登录')),
        new HtmlWebpackPlugin(getHtmlConfig('user-register','用户注册')),
        new HtmlWebpackPlugin(getHtmlConfig('result','操作结果')),
        new HtmlWebpackPlugin(getHtmlConfig('user-center','个人中心')),
        new HtmlWebpackPlugin(getHtmlConfig('user-center-update','修改个人信息')),
        new HtmlWebpackPlugin(getHtmlConfig('user-pass-update','修改密码')),
        new HtmlWebpackPlugin(getHtmlConfig('user-pass-reset','找回密码'))
    ]
};

module.exports = config;