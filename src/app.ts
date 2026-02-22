import express, { Express } from "express";
import morgan from "morgan";

const app: Express = express();
app.use(morgan("combined"));


export default app;