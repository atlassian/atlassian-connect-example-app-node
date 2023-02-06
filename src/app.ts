import express from 'express';
import Routes from './routes';
import cookieParser from 'cookie-parser';
import mustache from 'mustache-express';

class App {
    public server;

    constructor() {
        this.server = express();
        this.setEngine();
        this.middlewares();
        this.routes();
    }

    setEngine() {
        this.server.engine('mst', mustache());
        this.server.set('view engine', 'mst');
        this.server.set('views', __dirname + '/views');
    }

    middlewares() {
        this.server.use(express.json());
        this.server.use(cookieParser());
    }

    routes() {
        this.server.use(Routes);
    }
}

export default new App().server;