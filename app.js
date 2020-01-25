const ctrl = require('./controllers/controllers');

const app = (req, res) => {

    const URL = req.url;
    
    // What we say when the request method isnt GET
    if (req.method !== 'GET') {
        ctrl.forInvalidMethod(req, res);
    }

    // Handler to serve index.html
    if (URL === '/') {
        ctrl.forIndex(req, res);
    }

    // Handler to serve stylesheets
    if (URL.indexOf('.css') > 0) {
        ctrl.forCSS(req, res);
    }
    
    if (URL.indexOf('.js') > 0) {
        ctrl.forJavascript(req, res);
    }

    if (URL.split('.')[1] === 'mp4') {
        ctrl.forVideo(req, res);
    }

    if (URL.split('.')[1] === 'mp3') {
        ctrl.forAudio(req, res);
    }

}

module.exports = app;