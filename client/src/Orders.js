import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { format } from "date-fns";
import Spinner from "./Spinner";
import Modal from "react-bootstrap/Modal";
import axios from "axios";
import Table from "react-bootstrap/Table";

function Orders() {
  const [orders, setOrders] = useState("");
  const [loading, setLoading] = useState(true);
  const [details, setDetails] = useState("");
  const [showModal, setShowModal] = useState(false);
  useEffect(() => {
    setLoading(true);
    const currentDate = new Date();
    const date = format(currentDate, "ddMMyyyyHHmmss");

    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: `${process.env.REACT_APP_BASE_URL}/orders`,
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
          style={{ width: "240px", border: "3px solid", color: "#1ab5e9" }}
          className="mx-auto shadow-lg"
        />

        <div className="container">
          <div className="row my-5">
            {orders && !loading ? (
              orders.map((order) => (
                <div className="my-4 col-md-6" key={order.id}>
                  <Card
                    style={{ width: "24rem" }}
                    className="text-center shadow-lg mx-auto"
                  >
                    <Card.Img
                      width="24rem"
                      height="300px"
                      variant="top"
                      src={
                        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR4jhDRpiijnvVafh7Za-TCBZZstf2GpvyMiw&usqp=CAU"
                      }
                      alt={`Order Image`}
                    />
                    <Card.Body>
                      <Card.Title className="fs-3 mb-3 fw-bold">
                        {order.id}
                      </Card.Title>
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
                        variant="info shadow-lg mb-3 fs-5 fw-bold"
                        onClick={() => {
                          setDetails(order);
                          setShowModal(true);
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
      <div>
        <Modal
          show={showModal}
          onHide={() => {
            setShowModal(false);
          }}
          aria-labelledby="contained-modal-title-vcenter"
          size="lg"
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title className="fs-3">
              Order Id: <b>{details.id}</b>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body className="text-center">
            <div className="fs-4 my-3">
              Customer Name:{" "}
              <b className="text-primary">{details.customerName}</b>
            </div>
            <div className="fs-4 my-3">
              Reference No:{" "}
              <b className="text-primary">{details.referenceNo}</b>
            </div>
            <div className="fs-4 my-3">
              Creation Date:{" "}
              <b className="text-primary">{details.creationDate}</b>
            </div>
            <div className="fs-4 my-3">
              Placement Date:{" "}
              <b className="text-primary">{details.placementDate}</b>
            </div>
            <div className="fs-3 my-3 fw-bold">Line Items:</div>
            <div className="overflow-auto">
              <Table striped bordered hover variant="dark">
                <thead>
                  <tr>
                    <th>Line No:</th>
                    <th>Card-Item Id</th>
                    <th>Status</th>
                    <th>Status Description</th>
                    <th>Value</th>
                    <th>Price</th>
                    <th>Settlement Currency</th>
                    <th>Exchange Rate</th>
                    <th>Settlement Price</th>
                  </tr>
                </thead>
                <tbody>
                  {details?.lineItems?.map((lineItem) => {
                    return (
                      <tr key={lineItem.lineNumber}>
                        <td>{lineItem.lineNumber}</td>
                        <td>{lineItem.cardItemId}</td>
                        <td>{lineItem.status}</td>
                        <td>{lineItem.statusDescription}</td>
                        <td>{lineItem.value}</td>
                        <td>{lineItem.netPrice}</td>
                        <td>{lineItem.settlementCurrency}</td>
                        <td>{lineItem.exchangeRate}</td>
                        <td>{lineItem.settlementPrice}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </Table>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button
              className="px-4"
              variant="danger"
              onClick={() => {
                setShowModal(false);
              }}
            >
              Cancel
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </>
  );
}

export default Orders;
