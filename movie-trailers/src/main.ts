import * as server from 'routing-controllers';
import 'reflect-metadata';
import * as dependecyInjection from 'typedi';
import { ApplicationSettings } from './Settings/ApplicationSettings';

// get global settings
const settings = ApplicationSettings.Current;

// setup routing-controllers to use typedi container.
server.useContainer(dependecyInjection.Container);

// init server
const app = server.createExpressServer({
  routePrefix: '/',
  defaultErrorHandler: false,
  controllers: [__dirname + '/Controllers/*.js'],
  middlewares: [__dirname + '/Middlewares/*.js']
});

// run server
app.listen(settings.port);

console.log('Viafree API instance is working on ports ' + settings.port);

module.exports = app;
