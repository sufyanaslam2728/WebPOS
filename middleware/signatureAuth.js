const signatureAuth = async (req, res, next) => {
  const crypto = require("crypto");
  const method = req.method;
  const path = req.path.slice(1);
  const { authorization, "x-giftlov-date": gift_date } = req.headers;
  const queryParams = req.query;

  function createSHA512Hash(data, secretKey) {
    const hash = crypto.createHmac("sha512", secretKey);
    const hashedData = hash.update(data, "utf-8").digest("hex");
    return hashedData;
  }

  const dataToHash = `${path}${method}${
    Object.values(queryParams).length ? Object.values(queryParams).join("") : ""
  }${gift_date}${authorization}`;
  const secretKey = process.env.SECRET;

  const md5Hash = createSHA512Hash(dataToHash, secretKey);
  req.headers.signature = md5Hash;
  next();
};

module.exports = { signatureAuth };
