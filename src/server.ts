import express from "express";
import router from "./app/router";

const app = express();

app.use(express.json());

app.use("/api", router);

app.use((_, res) => {
  res.status(404).send("404 not found");
});

export default app;
