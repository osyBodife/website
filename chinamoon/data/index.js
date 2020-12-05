// Listen on a specific host via the HOST environment variable
//var host = process.env.HOST || '0.0.0.0';
var host = process.env.HOST || '0.0.0.0';
// Listen on a specific port via the PORT environment variable
var port = process.env.PORT || 8081;

var cors_proxy = require('cors-anywhere');
cors_proxy.createServer({
    originWhitelist: [], // Allow all origins
    requireHeader: ['origin', 'x-requested-with'],
    removeHeaders: ['cookie', 'cookie2']
}).listen(port, host, function() {
    console.log('Running CORS Anywhere on ' + host + ':' + port);
});


/*
Request examples:

http://localhost:8080/http://google.com/ - Google.com with CORS headers
http://localhost:8080/google.com - Same as previous.
http://localhost:8080/google.com:443 - Proxies https://google.com/
http://localhost:8080/ - Shows usage text, as defined in libs/help.txt
http://localhost:8080/favicon.ico - Replies 404 Not found

*/