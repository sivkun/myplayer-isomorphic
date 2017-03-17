require('babel-polyfill')

require('source-map-support').install()
//babel-register 实际上为require加了一个钩子（hook），
//之后所有被 node 引用的 .es6、.es、.jsx 以及 .js 文件都会先被 Babel 转码。
require('babel-register')({
    presets:['es2015','react','stage-0'],
    plugins:['add-module-exports']
})

//Css require hook
require('css-modules-require-hook')({
    extensions:['.scss','.css'],
    preprocessCss:(data,filename)=>
        require('node-sass').renderSync({
            data,
            file:filename
        }).css,
    camelCase:true,
    generateScopedName:'[name]__[local]__[hash:base64:8]'
})

//Image require hook
require('asset-require-hook')({
    extensions:['jpg','png','gif','webp'],
    limit:8000
})

const app = require('./app.js'),
    convert = require('koa-convert'),//用于转换中间件，将generator式的中间件转化为promise式的中间件，反之亦然。
    webpack = require('webpack'),
    fs = require('fs'),
    path = require('path'),
    devMiddleware  = require('koa-webpack-dev-middleware'),
    hotMiddleware= require('koa-webpack-hot-middleware'),
    views = require('koa-views'),
    router = require('./routes'),
    clientRoute = require('./middlewares/clientRoute'),
    config = require('../build/webpack.dev.config'),
    port = process.env.port||3000,
    compiler = webpack(config)

compiler.plugin('emit',(compilation,callback)=>{
    const assets = compilation.assets
    let file,data
    Object.keys(assets).forEach(key=>{
        if(key.match(/\.html$/)){
            file = path.resolve(__dirname,key)
            data = assets[key].source()
            fs.writeFileSync(file,data)
        }
    })
    callback()
})

app.use(views(path.resolve(__dirname,'../views/dev'),{map:{html:'ejs'}}))//在views/dev目录下的文件，每一个以.html结尾的都会以ejs模板引擎解析
app.use(clientRoute)

app.use(router.routes())
app.use(router.allowedMethods())
console.log(`\n==> 🌎  Listening on port ${port}. Open up http://localhost:${port}/ in your browser.\n`)
app.use(convert(devMiddleware(compiler, {
    noInfo: true,
    publicPath: config.output.publicPath
})))
app.use(convert(hotMiddleware(compiler)))
app.listen(port)
