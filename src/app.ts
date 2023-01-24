import express from 'express';
import routes from './routes';
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
    }

    routes() {
        this.server.use(routes);
    }
}

export default new App().server