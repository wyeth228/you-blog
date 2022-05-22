import { Application } from "express";
import usersRouter from "./routes/Users";

const express = require("express");

const app: Application = express();
const PORT = process.env.PORT || 1000;

app.use(express.json());
app.use(express.urlencoded());

app.use("/", usersRouter);

app.listen(PORT, () => {
  console.log("Server listen on " + PORT + "...");
});
