"use strict";
let rootPath = __dirname + '/..', env = process.env.NODE_ENV || 'development';
let _config = {
    development: {
        root: rootPath,
        app: {
            name: 'test-express'
        },
        port: process.env.PORT || 3000,
        db: 'mongodb://localhost/test-express-development'
    },
    test: {
        root: rootPath,
        app: {
            name: 'test-express'
        },
        port: process.env.PORT || 3000,
        db: 'mongodb://localhost/test-express-test'
    },
    production: {
        root: rootPath,
        app: {
            name: 'test-express'
        },
        port: process.env.PORT || 3000,
        db: 'mongodb://localhost/test-express-production'
    }
};
class Server {
    static bootstrap() {
        return new Server();
    }
}
exports.config = _config[env];
