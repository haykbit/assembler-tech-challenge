const express = require("express");
const helmet = require("helmet");
const { json } = require("body-parser");
const cors = require("cors");
const { config } = require("./config");
const app = express();

const { userRouter } = require("./routes");

app.use(helmet());
app.use(json());
app.use(
  cors({
    origin: config.client.URL,
  })
);

app.use("/users", userRouter);

app.get("/", (req, res) => {
  res.status(200).send({
    data: "root page!",
  });
});

module.exports = app;
