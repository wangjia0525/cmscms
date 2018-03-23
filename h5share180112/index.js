// 使用 node.js 做代理服务实现前后台分离
var express = require("express");
var proxy = require("express-http-proxy");// https://www.npmjs.com/package/express-http-proxy
var path = require("path");
var cdr = require('child_process');
// 设定端口
var port = 9191;
// 设定代理地址
var proxyUrl = "http://16p73762o8.iask.in:43521";//http://16p73762o8.iask.in:43521
//http://12407.imwork.net:35445
// 声明 服务器实例
var app = express();
app.set('port', process.env.PORT || port);

// 配置代理
var apiProxy = proxy(proxyUrl, {
    forwardPath:function(req,res) {
        return req._parsedUrl.path;
    }
});

// 设定路由匹配规则
// '/ixinghui/*'    指的是，所有以'ixinghui'开头的api都会走代理
// 
app.use("/in/*",apiProxy);

app.use("/ixinghui/*",apiProxy);

// 设置静态站点
app.use(express.static(path.join(__dirname,"src")));

// 监听端口 port
app.listen(app.get('port'));

console.log("Now serving is proxy at " + port);

// 打开浏览器
cdr.exec('start http://localhost:' + port);
