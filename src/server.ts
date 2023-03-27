import express, { json } from "express";
import { RootRouter } from "./routes/router";

const app = express();

// Setting the template engine
app.set("view engine", "squirrelly");
app.set("views", __dirname + "/views");

// Remove caching
app.set("view cache", false);
app.set("etag", false);

app.use((_req, res, next) => {
	res.set("Cache-Control", "no-store");
	next();
});

// Calling the express.json() method for parsing
app.use(json());

// Setting the routes
app.use(RootRouter);

const port = 3000;
app.listen(port, async () => {
	// App is now running
	console.log(`Sample app listening on port ${port}`);
});
