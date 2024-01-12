const axios = require("axios");
const headers = {
  "Content-Type": "application/json",
  Authorization: "",
};

const getItems = async (req, res) => {
  headers["Authorization"] = req.headers.authorization;
  headers["signature"] = req.headers.signature;
  headers["X-GIFTLOV-DATE"] = req.headers["x-giftlov-date"];
  const apiUrl = `${process.env.BASE_URL}${req.path}`;

  try {
    // Make a GET request with headers using await
    const response = await axios.get(apiUrl, { headers });

    return res.status(response.status).json(response.data);
  } catch (error) {
    // Handle errors
    res.status(400).json({ Error: error.message });
  }
};
const getOrders = async (req, res) => {
  headers["Authorization"] = req.headers.authorization;
  headers["signature"] = req.headers.signature;
  headers["X-GIFTLOV-DATE"] = req.headers["x-giftlov-date"];
  const apiUrl = `${process.env.BASE_URL}${req.path}`;

  try {
    // Make a GET request with headers using await
    const response = await axios.get(apiUrl, { headers });

    return res.status(response.status).json(response.data);
  } catch (error) {
    // Handle errors
    res.status(400).json({ Error: error.message });
  }
};

const checkItemAvailable = async (req, res) => {
  headers["Authorization"] = req.headers.authorization;
  headers["signature"] = req.headers.signature;
  headers["X-GIFTLOV-DATE"] = req.headers["x-giftlov-date"];
  const apiUrl = `${process.env.BASE_URL}${req.path}`;

  try {
    // Make a GET request with headers using await
    const response = await axios.get(apiUrl, { headers });

    return res.status(response.status).json(response.data);
  } catch (error) {
    // Handle errors
    res.status(400).json({ Error: error.message });
  }
};

const getWallets = async (req, res) => {
  headers["Authorization"] = req.headers.authorization;
  headers["signature"] = req.headers.signature;
  headers["X-GIFTLOV-DATE"] = req.headers["x-giftlov-date"];
  const apiUrl = `${process.env.BASE_URL}${req.path}`;

  try {
    // Make a GET request with headers using await
    const response = await axios.get(apiUrl, { headers });

    return res.status(response.status).json(response.data);
  } catch (error) {
    // Handle errors
    res.status(400).json({ Error: error.message });
  }
};
const login = async (req, res) => {
  headers["Authorization"] = req.headers.authorization;
  headers["signature"] = req.headers.signature;
  headers["X-GIFTLOV-DATE"] = req.headers["x-giftlov-date"];
  const apiUrl = `${process.env.BASE_URL}/generateToken`;

  try {
    // Make a GET request with headers using await
    const response = await axios.post(apiUrl, req.body, { headers });

    return res.status(response.status).json(response.data);
  } catch (error) {
    // Handle errors
    res.status(400).json({ Error: error.message });
  }
};
module.exports = { getItems, getOrders, checkItemAvailable, getWallets, login };
