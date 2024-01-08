import bodyParser from "body-parser";
import express, { Express, Request, Response } from "express";

const app: Express = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/", (req: Request, res: Response) => {
  return res.status(200).send({ message: "Server up" });
});

export default app;
