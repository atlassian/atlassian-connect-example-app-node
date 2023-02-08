import express from 'express';
import routes from './routes';
import mustache from 'mustache-express';

const serverApp = express();

// Setting the template engine
serverApp.engine('mst', mustache());
serverApp.set('view engine', 'mst');

// Setting the views
serverApp.set('views', __dirname + '/views');

// Calling the express.json() method for parsing
serverApp.use(express.json());

// Setting the routes
serverApp.use(routes);

export const app = serverApp;