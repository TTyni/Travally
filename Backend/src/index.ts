import express, { json, urlencoded } from "express";
import { downloadMap, executeSqlFile } from "./db.js";
import cors from "cors";
import {
  errorHandler,
  logger,
  unknownEndpoint,
} from "./Middlewares/middleware.js";


const server = express();
server.use(express.json());
server.use(express.urlencoded({ extended: false }));

server.use(cors());
server.use(logger);

const initdb = async () => {
  //downloadMap();
  executeSqlFile();
}
initdb();

const { PORT } = process.env;
server.listen(PORT, () => {
  console.log("listening to port", PORT);
});

server.use(unknownEndpoint);
server.use(errorHandler);

export default server;
