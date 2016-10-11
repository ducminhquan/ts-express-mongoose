declare var __dirname: string;
import * as express from 'express';

// let rootPath = path.normalize(__dirname + '/..'),
let rootPath = __dirname + '/..',
  env = process.env.NODE_ENV || 'development';

let _config: any = {
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

  public app: express.Application;

  /**
   * Bootstrap the application.
   *
   * @class Server
   * @method bootstrap
   * @static
   * @return {ng.auto.IInjectorService} Returns the newly created injector for this app.
   */
  public static bootstrap(): Server {
    return new Server();
  }
}

export const config: any = _config[env];
