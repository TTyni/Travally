import express, { json, urlencoded } from "express";
import readMap from "./db.js";
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

//edit to true to read map.sql and insert into database
if (false) {
  readMap.readMap();
}

//edit to true to create tables to database
if (false) {
  readMap.createTables();
}

const { PORT } = process.env;
server.listen(PORT, () => {
  console.log("Products API listening to port", PORT);
});

server.use(unknownEndpoint);
server.use(errorHandler);

export default server;
