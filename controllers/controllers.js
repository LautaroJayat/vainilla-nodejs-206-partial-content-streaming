const http = require('http');
const fs = require('fs');
const ctrl = {};


ctrl.forInvalidMethod = function (req, res) {
    res.statusCode = 405;
    res.setHeader('Allow', 'GET');
    return res.end();
}

ctrl.forIndex = function (req, res) {
    fs.readFile('./views/index.html', (err, data) => {
        if (err) {
            res.writeHead(404);
            res.write('file not found');
            throw err;
        } else {
            res.writeHead(200, {
                'Content-Length': data.length,
                'Content-Type': 'text/html',
            });
            res.end(data);
        }

    })
}

ctrl.forJavascript = function (req, res) {
    fs.readFile('./public/buttons.js', (err, data) => {
        if (err) {
            res.writeHead(404);
            res.write('file not found');
            throw err;
        } else {
            res.writeHead(200, {
                'Content-Length': data.length,
                'Content-Type': 'text/javascript',
            });
            res.end(data);
        }

    })
}

ctrl.forCSS = function (req, res) {
    let ext = req.url.split('.')[1];
    let file = (function () {
        let splitted = req.url.split('/');
        return splitted[splitted.length - 1];
    })()
    fs.readFile('public/' + file, (err, data) => {
        if (err) {

            res.writeHead(404)
            res.end();
            throw err
        } else {
            res.writeHead(200, {
                'Concent-Length': data.length,
                'Content-Type': mimeNames['.' + ext],
            });
            res.write(data);
            res.end();
        }
    })
}

ctrl.forVideo = function (req, res) {
    let file = (function () {
        let splitted = req.url.split('/');
        return splitted[splitted.length - 1];
    })();
    fs.stat('public/media/' + file, (err, data) => {
        if (err) {
            res.writeHead(404)
            res.end();
            throw err

        } else {
            //Check for 'range' header;
            if (req.headers['range']) {
                let ext = req.url.split('.')[1];
                let range = req.headers['range'];
                var array = range.replace('bytes=', "").split("-");
                var start = parseInt(array[0], 10);
                var end = array[1] ? parseInt(array[1], 10) : data.size - 1;
                var chunck = 1024 * 1000;
                res.writeHead(206, {
                    'Accept-Ranges': 'bytes',
                    "Content-Range": "bytes " + start + "-" + end + "/" + data.size,
                    'Content-Length': chunck,
                    'Content-Type': mimeNames + '.' + ext,
                    'Cache-Control': 'no-cache'
                });




                // If the range can't be fulfilled.

                let readable = fs.createReadStream('public/media/banjo.mp4', { start, end });
                if (readable == null) {
                    console.log('readable = null');
                    return res.end();
                } else {
                    readable.on('open', () => {
                        console.log('we are on open');
                        readable.pipe(res);
                    });
                    readable.on('error', (err) => {
                        res.end(err);
                        console.log(err);
                    });

                }
            }

        }


    })

}

ctrl.forAudio = function (req, res) {
    let file = (function () {
        let splitted = req.url.split('/');
        return splitted[splitted.length - 1];
    })();
    fs.stat('public/media/' + file, (err, data) => {
        if (err) {
            res.writeHead(404)
            res.end();
            throw err

        } else {
            //Check for 'range' header;
            if (req.headers['range']) {
                let ext = req.url.split('.')[1];
                let range = req.headers['range'];
                var array = range.replace('bytes=', "").split("-");
                var start = parseInt(array[0], 10);
                var end = array[1] ? parseInt(array[1], 10) : data.size - 1;
                var chunck = 1024 * 1000;
                res.writeHead(206, {
                    'Accept-Ranges': 'bytes',
                    "Content-Range": "bytes " + start + "-" + end + "/" + data.size,
                    'Content-Length': chunck,
                    'Content-Type': mimeNames + '.' + ext,
                    'Cache-Control': 'no-cache'
                });




                // If the range can't be fulfilled.

                let readable = fs.createReadStream('public/media/banjo.mp3', { start, end });
                if (readable == null) {
                    console.log('readable = null');
                    return res.end();
                } else {
                    readable.on('open', () => {
                        console.log('we are on open');
                        readable.pipe(res);
                    });
                    readable.on('error', (err) => {
                        res.end(err);
                        console.log(err);
                    });

                }
            }

        }


    })

}

var mimeNames = {
    '.css': 'text/css',
    '.html': 'text/html',
    '.js': 'application/javascript',
    '.mp3': 'audio/mpeg',
    '.mp4': 'video/mp4',
    '.ogg': 'application/ogg',
    '.ogv': 'video/ogg',
    '.oga': 'audio/ogg',
    '.txt': 'text/plain',
    '.wav': 'audio/x-wav',
    '.webm': 'video/webm'
};
module.exports = ctrl;