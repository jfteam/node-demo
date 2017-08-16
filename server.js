let formidable = require("formidable"),
    http = require("http"),
    url = require("url");


//用一个函数将之前的内容包裹起来
let start = (route, handler) => {
    let onRequest = (request, response) => {
        let postData = "";
        let pathname = url.parse(request.url).pathname;
        console.log("Request for " + pathname + " received.");

        route(handler, pathname, response, request);
    }

    http.createServer(onRequest).listen(8888);
    console.log("Server has started.");
    console.log("请在浏览器中打开 http://127.0.0.1:8888...");
}


//这个对象导入到其他文件中即可使用，可以用任意的名字来接收这个对象
exports.start = start;