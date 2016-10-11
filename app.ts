
import * as express from 'express';
import { Application, Request, Response, NextFunction } from 'express';
import * as cookieParser from 'cookie-parser';
import * as logger from 'morgan';
import * as compress from 'compression';
import * as methodOverride from 'method-override';
import * as bodyParser from 'body-parser';
import * as glob from 'glob';
import * as mongoose from 'mongoose';

import { config } from './config/config';

import { HomeRouter } from './app/controllers/home';
// import { MyApp } from './config/express';

const app: Application = express();

function mongooseSetup() {
  (<any>mongoose).Promise = global.Promise;
  mongoose.connect(config.db);

  var db = mongoose.connection;
  db.on('error', function () {
    throw new Error('unable to connect to database at ' + config.db);
  });
}

function routerSetup() {
  app.use('/', new HomeRouter().getRouter());
}

var env = process.env.NODE_ENV || 'development';
app.locals.ENV = env;
app.locals.ENV_DEVELOPMENT = env == 'development';

app.set('views', config.root + '/app/views');
app.set('view engine', 'ejs');

// app.use(favicon(config.root + '/public/img/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(cookieParser());
app.use(compress());
app.use(express.static(config.root + '/public'));
app.use(methodOverride());

// var controllers = glob.sync(this.config.root + '/app/controllers/*.js');
// controllers.forEach(function (controller) {
//   require(controller)(this.app);
// });
mongooseSetup();

routerSetup();


app.use(function (req: Request, res: Response, next: NextFunction) {
  var err: Error & { status: number } = <Error & { status: number }>new Error('Not found');
  err.status = 404;

  next(err);
});

if (app.get('env') === 'development') {
  app.use((err: Error & { status: number }, req: Request, res: Response, next: NextFunction) => {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err,
      title: 'error'
    });
  });
}

app.use((err: Error & { status: number }, req: Request, res: Response, next: NextFunction) => {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {},
    title: 'error'
  });
});

app.listen(config.port, function () {
  console.log('Express server listening on port ' + config.port);
});
