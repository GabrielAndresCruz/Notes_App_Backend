import bodyParser from "body-parser";
import express, { Express, Request, Response } from "express";
import { errorHandler } from "./http/middleware/errorHandler.middleware";
import userRoute from "./routes/user.route";

const app: Express = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/users", userRoute);

app.use(errorHandler);

export default app;
