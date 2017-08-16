/**
 * Created by fengwenping on 2017/8/16.
 */
function route(handler, pathname, response, request) {
    console.log("About to route a request for " + pathname);
    if (typeof handler[pathname] === 'function') {
        handler[pathname](response, request);
    } else {
        console.log("No request handler found for " + pathname);
        response.writeHead(200, {"Content-Type": "text/plain"});
        response.write("404 Not found");
        response.end();
    }
}

exports.route = route;