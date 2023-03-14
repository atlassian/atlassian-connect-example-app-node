import express, { json } from "express";
import mustache from "mustache-express";
import { RootRouter } from "./routes/router";

const app = express();

// Setting the template engine
app.engine("mst", mustache());
app.set("view engine", "mst");

// Setting the views
app.set("views", __dirname + "/views");

// Calling the express.json() method for parsing
app.use(json());

// Setting the routes
app.use(RootRouter);

const port = 3000;
app.listen(port, () => {
	console.log(`Example app listening on port ${port}`);
});
