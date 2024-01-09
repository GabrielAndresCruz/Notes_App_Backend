import * as dotenv from "dotenv";
import app from "./app";
import { AppDataSource } from "./database/data-source";

dotenv.config();

const PORT = process.env.APP_PORT;

AppDataSource.initialize()
  .then(async () => {
    console.log("Data Source has been initialized");
  })
  .catch((err) => {
    console.error("Error during Data Source initialization");
    console.error(err);
  });

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
