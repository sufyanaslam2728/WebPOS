const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const app = express();
app.use(express.json());
const PORT = process.env.PORT;

const server = app.listen(
  PORT,
  console.log(`Server running on PORT ${PORT}...`)
);
