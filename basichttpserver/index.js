const http = require('http');
const port = 8000;

const fs = require('fs');

function requestHandler(req, res) {
    console.log(req.url);
    res.writeHead(200, { 'content-type': 'text/html' });

    let fileName;

    switch (req.url) {
        case '/': fileName = './index.html';
            break;

        case '/profile': fileName = './profile.html';
            break;

        default: fileName = './404.html';
            break;
    }
    fs.readFile(fileName, function (err, data) {
        if (err) {
            console.log('error', err);
            return res.end('<h1> Error !</h1>');
        }

        return res.end(data);
    })
}

const server = http.createServer(requestHandler);

server.listen(port, function (error) {
    if (error) {
        console.log(error);
        return;
    }

    console.log('server is running up on port : ', port);
});

