import React, { useEffect, useState } from "react";
import axios from "axios";
import { format } from "date-fns";
import Spinner from "./Spinner";
import Card from "react-bootstrap/Card";

function Wallet() {
  const [loading, setLoading] = useState(false);
  const [wallets, setWallets] = useState([]);
  useEffect(() => {
    setLoading(true);
    const currentDate = new Date();
    const date = format(currentDate, "ddMMyyyyHHmmss");

    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: `${process.env.REACT_APP_BASE_URL}/wallets/balances`,
      headers: {
        "X-GIFTLOV-DATE": date,
        Authorization: localStorage.getItem("token"),
      },
    };

    const makeRequest = async () => {
      try {
        const response = await axios.request(config);

        setWallets(response.data);

        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    makeRequest();
  }, []);
  return (
    <>
      <div className="mt-5 mx-2 my-5">
        <h1
          className="text-center "
          style={{ fontSize: "45px", color: "#9c49d4" }}
        >
          <b>Your Wallets</b>
        </h1>
        <hr
          style={{ width: "223px", border: "3px solid", color: "#1ab5e9" }}
          className="mx-auto shadow-lg"
        />

        <div className="container">
          <div className="row my-5">
            {wallets && !loading ? (
              wallets.map((wallet) => (
                <div className="my-4 col-md-6" key={wallet.id}>
                  <Card
                    style={{ width: "22rem" }}
                    className="text-center shadow-lg mx-auto"
                  >
                    <Card.Img
                      width="22rem"
                      height="250px"
                      variant="top"
                      src={
                        "data:image/jpeg;base64,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"
                      }
                      alt={`Wallet Image`}
                    />
                    <Card.Body>
                      <Card.Title className=" fs-3 mb-3">
                        {wallet.title}
                      </Card.Title>
                      <h3>
                        <Card.Text className="text-primary">
                          Balance:{" "}
                          <b>
                            {wallet.balance} {wallet.currency}
                          </b>
                        </Card.Text>
                      </h3>
                    </Card.Body>
                  </Card>
                </div>
              ))
            ) : (
              <Spinner />
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Wallet;
