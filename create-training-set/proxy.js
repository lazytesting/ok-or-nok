const proxy = require('express-http-proxy');
const app = require('express')();

let server;
let rule;

async function start(targetHost, port) {
    app.use('/**', proxy(targetHost, {
        userResDecorator: recordResponseHandler,
        proxyReqPathResolver: function (req) {
            return '/' + req.baseUrl;
        }
    }));

    return new Promise(function(resolve, reject){
    server = app.listen(port, function() {
        resolve();
    });
});
}

function stop() {
    server.close();
}

function setRule(mutationRule) {
    rule = mutationRule;
}

function recordResponseHandler(proxyRes, proxyResData, userReq, userRes) { 
    const original = proxyResData.toString();    
    if (rule && userReq.baseUrl.includes(rule.urlMatch) ) {
        const response = original.replace(rule.matchValue, rule.replaceValue);
        return response;
    }
    // otherwise just return the orignal
    return original;
}

module.exports = { start, stop, setRule };
