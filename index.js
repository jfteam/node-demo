/**
 * Created by fengwenping on 2017/8/16.
 */
let server = require("./server");
let router = require("./router");
let requestHandlers = require("./requestHandlers");


//对象构造
var handler = {}
handler["/"] = requestHandlers.start;
handler["/start"] = requestHandlers.start;
handler["/upload"] = requestHandlers.upload;
handler["/show"] = requestHandlers.show;

server.start(router.route, handler);