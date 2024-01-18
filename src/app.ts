import bodyParser from "body-parser";
import express, { Express } from "express";
import userRoute from "./routes/user.route";

const app: Express = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/users", userRoute);

export default app;
