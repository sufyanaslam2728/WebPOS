const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const {
  getItems,
  getOrders,
  checkItemAvailable,
  getWallets,
  login,
  placeOrder,
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
app.post("/placeOrder", signatureAuth, placeOrder);
app.listen(PORT, console.log(`Server running on PORT ${PORT}...`));
