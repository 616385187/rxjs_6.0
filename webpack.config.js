var HtmlWebpackPlugin = require('html-webpack-plugin');
var webpack=require("webpack");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
module.exports =
    {
        entry:
            {
                // //入口文件
                // "index":__dirname+'/src/jssrc/index.js',
                // "rxjs_a":__dirname+'/src/jssrc/rxjs_a.js',
                // "hello":__dirname+'/src/jssrc/hello.js',
                "login":__dirname+'/src/jssrc/login.js',

            },
        output: {
            path: __dirname+'/src/webapp/js',  //输出文件夹
            filename:'[name].js'   //最终打包生成的文件名(只是文件名，不带路径的哦)
        },
        /*resolve: {
            alias: {
                vue: 'vue/dist/vue.js'
            }
        },*/
        externals: {

        },
        module:{
            rules :[
                {test:/\.js$/,  loader: "babel-loader",query:{compact:true}},


                {
                    test:/\.css$/,
                    loader:['style-loader','css-loader']
                },
                // {
                //     test:/\.css$/,
                //     // loader:['style-loader','css-loader']
                //     use:ExtractTextPlugin.extract({
                //         use:'css-loader'
                //     })//不再需要style-loader
                //
                // }
                //这里肯定要加入n个loader 譬如vue-loader、babel-loader、css-loader等等
            ]
        },
        plugins:[
            // new HtmlWebpackPlugin({
            //     filename: __dirname+'/src/webapp/index.html',   //目标文件
            //     template: __dirname+'/src/html/index.html', //模板文件
            //     inject:'body',
            //     hash:true,  //代表js文件后面会跟一个随机字符串,解决缓存问题
            //     chunks:["index"]
            // }),
            new HtmlWebpackPlugin({
                filename: __dirname+'/src/webapp/login.html',   //目标文件
                template: __dirname+'/src/html/login.html', //模板文件
                inject:'body',
                hash:true,  //代表js文件后面会跟一个随机字符串,解决缓存问题
                chunks:["login"]
            }),
            new ExtractTextPlugin(__dirname+'/src/webapp/[name].bundle.css', {
                allChunks: true
            }),
            new webpack.ProvidePlugin({
                $: "jquery",
                jQuery: "jquery",
                "window.jQuery": "jquery"
            })
        ],
        mode: "development",
        resolve: {
            alias: {
                'vue': 'vue/dist/vue.js',
            }
        },
        devtool: "cheap-module-eval-source-map"
    }