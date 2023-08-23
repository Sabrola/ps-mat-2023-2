import express, { json, urlencoded } from "express";
import cookieParser from "cookie-parser";
import logger from "morgan";

import indexRouter from "./routes/index.js";
import usersRouter from "./routes/users.js";

import prisma from './databases/client.js';
//Importa o cliente do Prisma para fazer a conecção com DB

const app = express();

app.use(logger("dev"));
app.use(json());
app.use(urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/", indexRouter);
app.use("/users", usersRouter);

///////////////////////////////////////////////////////////////
import carRouter from './routes/car.js'
app.use('/car', carRouter)

import customerRouter from './routes/customer.js'
app.use('/customer', customerRouter)

export default app;
