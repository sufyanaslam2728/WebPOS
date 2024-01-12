import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";
import Spinner from "./Spinner";
import axios from "axios";

function Orders() {
  const [orders, setOrders] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  useEffect(() => {
    setLoading(true);
    const currentDate = new Date();
    const date = format(currentDate, "ddMMyyyyHHmmss");

    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: "https://staging.giftlov.com/api/Base/orders",
      headers: {
        Authorization: localStorage.getItem("token"),
        "X-GIFTLOV-DATE": date,
      },
    };
    const makeRequest = async () => {
      try {
        const response = await axios.request(config);
        setOrders(response.data.orders);

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
          <b>Your Orders</b>
        </h1>
        <hr
          style={{ width: "370px", border: "3px solid", color: "#1ab5e9" }}
          className="mx-auto shadow-lg"
        />

        <div className="container">
          <div className="row my-5">
            {orders && !loading ? (
              orders.map((order) => (
                <div className="my-4 col-md-6" key={order.id}>
                  <Card
                    style={{ width: "23rem" }}
                    className="text-center shadow-lg mx-auto"
                  >
                    <Card.Body>
                      <Card.Title className="fs-4 mb-3">{order.id}</Card.Title>
                      <Card.Text className="fs-5">
                        Customer Name:{" "}
                        <b className="text-primary">{order.customerName}</b>
                      </Card.Text>
                      <Card.Text className="fs-5">
                        Reference No:{" "}
                        <b className="text-primary">{order.referenceNo}</b>
                      </Card.Text>
                      <Card.Text className="fs-5">
                        Creation Date:{" "}
                        <b className="text-primary">{order.creationDate}</b>
                      </Card.Text>
                      <Card.Text className="fs-5">
                        Placement Date:{" "}
                        <b className="text-primary">{order.placementDate}</b>
                      </Card.Text>
                      <Card.Text className="fs-5">
                        Delivery Channel:{" "}
                        <b className="text-primary">{order.deliveryChannel}</b>
                      </Card.Text>
                      <Card.Text className="fs-5">
                        Email Address:{" "}
                        <b className="text-primary">{order.emailAddress}</b>
                      </Card.Text>
                      <Card.Text className="fs-5">
                        LineItems:{" "}
                        <b className="text-primary">{order.lineItems.length}</b>
                      </Card.Text>
                      <Button
                        variant="info shadow-lg mb-3"
                        onClick={() => {
                          navigate(`/orders/${order.id}`);
                        }}
                      >
                        Order Details
                      </Button>
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

export default Orders;
