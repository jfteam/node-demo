/**
 * Created by fengwenping on 2017/8/16.
 */
var exec = require("child_process").exec,
    querystring = require("querystring"),
    fs = require("fs"),
    formidable = require("formidable");

function start(response, postData) {
    console.log("Request handler 'start' was called.");
    showForm(response);
}

function showForm(response) {
    var body = '<html>' +
        '<head>' +
        '<meta http-equiv="Content-Type" content="text/html; ' +
        'charset=UTF-8" />' +
        '</head>' +
        '<body>' +
        '<form action="/upload" enctype="multipart/form-data" ' +
        'method="post">' +
        '<input type="file" name="upload" multiple="multiple">' +
        '<input type="submit" value="Upload file" />' +
        '</form>' +
        '</body>' +
        '</html>';

    response.writeHead(200, {"Content-Type": "text/html"});
    response.write(body);
    response.end();
}

function ls(response) {
    exec("ls -lah", function (error, stdout, stderr) {
        response.writeHead(200, {"Content-Type": "text/plain"});
        response.write(stdout);
        response.end();
    });
}

function find(response) {
    exec("find /",
        {timeout: 10000, maxBuffer: 20000 * 1024},
        function (error, stdout, stderr) {
            response.writeHead(200, {"Content-Type": "text/plain"});
            response.write(stdout);
            response.end();
        });
}

function upload(response, request) {
    if (request.method.toLowerCase() == 'post') {
        var form = new formidable.IncomingForm();
        console.log("about to parse");
        form.parse(request, function (error, fields, files) {
            console.log("parsing done");
            fs.renameSync(files.upload.path, "./tmp/test.png");
            response.writeHead(200, {"Content-Type": "text/html"});
            response.write("received image:<br/>");
            response.write("<img src='/show' />");
            response.end();
        });
        return;
    }
    showForm(response);
}

function show(response) {
    console.log("Request handler 'show' was called.");
    fs.readFile("./tmp/test.png", "binary", function (error, file) {
        if (error) {
            response.writeHead(500, {"Content-Type": "text/plain"});
            response.write(error + "\n");
            response.end();
        } else {
            response.writeHead(200, {"Content-Type": "image/png"});
            response.write(file, "binary");
            response.end();
        }
    });
}

exports.start = start;
exports.upload = upload;
exports.show = show;