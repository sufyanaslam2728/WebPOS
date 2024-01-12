const signatureAuth = async (req, res, next) => {
  const crypto = require("crypto");
  const method = req.method;
  const path = req.path.slice(1);
  const { authorization, "x-giftlov-date": gift_date } = req.headers;
  const queryParams = req.query;
  console.log("Path", path);
  console.log("Params", req.params);
  console.log("query", queryParams);
  console.log("headers", { authorization, gift_date });
  console.log("Method", method);
  console.log("secret", process.env.SECRET);

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
  console.log(`MD5 Hash: ${md5Hash}`);
  req.headers.signature = md5Hash;
  next();
};

module.exports = { signatureAuth };
