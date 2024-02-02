import bodyParser from "body-parser";
import express, { Express } from "express";
import userRoute from "./routes/user.route";
import noteRoute from "./routes/note.route";
import categoryRoute from "./routes/category.route";
import { authenticateJwt } from "./http/middleware/authenticateJwt.middleware";

const app: Express = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// authenticateJwt middleware give a user information to controller, thanks to the token.
app.use("/users", authenticateJwt, userRoute);

app.use("/notes", authenticateJwt, noteRoute);

app.use("/categories", authenticateJwt, categoryRoute);

export default app;
