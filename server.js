/*
* @file 本地起静态服务
*/
const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');

const getMine = {
    '.css': 'text/css',
    '.js': 'text/jsvascript'
}
// 创建服务器
const sever = http.createServer((req, res) => {
    const pathname = url.parse(req.url).pathname;
    const filepath = path.extname(pathname);
    // 获取文件状态
    fs.readFile(`./${pathname}`, (err, data) => {
        if (err) {
            // 发送404响应
            res.writeHead(404);
            res.end("404 Not Found.");
        } else {
            // 发送200响应
            res.writeHead(200, {'Content-Type': `${getMine[filepath] ? getMine[filepath] : 'text/html'};charset='utf-8'`});
            res.write(data);
            res.end();
        }
    });
});
sever.listen(8080);
console.log('Sever is running at http://127.0.0.1:8080/');