import bodyParser from "body-parser";
import express, { Express } from "express";
import userRoute from "./routes/user.route";
import noteRoute from "./routes/note.route";
import { authenticateJwt } from "./http/middleware/authenticateJwt.middleware";

const app: Express = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/users", userRoute);

app.use("/notes", authenticateJwt, noteRoute);

export default app;
