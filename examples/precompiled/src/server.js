var Hapi = require('hapi');
var Vision = require('vision');
var HapiReactViews = require('../../..');



var server = new Hapi.Server();
server.connection();
server.register(Vision, function (err) {

    if (err) {
        console.log('Failed to load vision.');
    }

    server.views({
        engines: {
            // We use `js` extension here instead of `jsx`.
            // Since the JSX has been compiled to javascript, it now has a .js extension.
            // Vision uses the key of the engines object as the extension to look for view files.
            js: HapiReactViews
        },
        relativeTo: __dirname,
        path: 'views'
    });

    server.route({
        method: 'GET',
        path: '/',
        handler: function (request, reply) {

            reply.view('home');
        }
    });

    server.start(function (err) {

        if (err) {
            throw err;
        }

        console.log('Server is listening at ' + server.info.uri);
    });
});
