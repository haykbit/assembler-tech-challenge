const express = require("express");
const helmet = require("helmet");
const { json } = require("body-parser");
const cors = require("cors");
const { config } = require("./config");
const app = express();

const { userRouter, memeRouter } = require("./routes");

app.use(helmet());
app.use(json());
app.use(
  cors({
    origin: config.client.URL,
  })
);

app.use("/users", userRouter);
app.use("/memes", memeRouter);

app.get("/", (req, res) => {
  res.status(200).send({
    data: "root page!",
  });
});

module.exports = app;
