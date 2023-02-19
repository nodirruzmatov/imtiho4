import express, { Application, NextFunction, Request, Response } from "express";
import dataSource from "./config/orm";
import dotenv from "dotenv";
import { exceptionHandler } from "./middleware/exception";
import { Exception } from "./exception/exception";
import router from "./router";

dotenv.config();

const app: Application = express();

const main = async (): Promise<void> => {
  try {
    app.use(express.json());
    await dataSource.initialize();

    app.use(router);

    app.use(exceptionHandler);
  } catch (err: unknown) {
    console.log(err);
  } finally {
    app.listen(8888, (): void => console.log(8888));
  }
};

main();
