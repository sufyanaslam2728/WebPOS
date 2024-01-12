const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const {
  getItems,
  getOrders,
  checkItemAvailable,
  getWallets,
  login,
} = require("./controllers");
const { signatureAuth } = require("./middleware/signatureAuth");

const app = express();
app.use(express.json());
const PORT = process.env.PORT;

app.get("/items", signatureAuth, getItems);
app.get("/orders", signatureAuth, getOrders);
app.get(
  "/checkItemAvailability/:cardIdentifier/:value",
  signatureAuth,
  checkItemAvailable
);
app.get("/wallets/balances", signatureAuth, getWallets);
app.post("/login", signatureAuth, login);
//checkItemAvailability/AE-Test-1-1000-1253/1
//https://staging.giftlov.com/api/Base

app.listen(PORT, console.log(`Server running on PORT ${PORT}...`));
