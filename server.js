'use strict';

const Hapi = require('@hapi/hapi');
const mongoose = require('mongoose');
const config = require('./dbconfig.json');
const routes = require('./src/routes/tiny/tiny.routes');

const init = async () => {

    const dbUri = config.db.url.replace('<password>',config.db.password);

    mongoose.connect(dbUri,{ 
        useUnifiedTopology: true, 
        useNewUrlParser: true, 
        useCreateIndex: true,
        useFindAndModify: false,
        routes: { cors: true }
    });

    mongoose.connection.on('connected', () => {
        console.log(`app is connected to ${dbUri}`,dbUri);
    });
    mongoose.connection.on('error', err => {
        console.log('error while connecting to mongodb', err);
    });

    const server = Hapi.server({
        port: 3000,
        host: 'localhost'
    });

    server.route(routes);

    await server.start();
    console.log('Server running on %s', server.info.uri);
};

process.on('unhandledRejection', (err) => {
    console.log(err);
    process.exit(1);
});

init();