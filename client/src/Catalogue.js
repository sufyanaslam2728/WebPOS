import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { format } from "date-fns";
import Spinner from "./Spinner";
import axios from "axios";
import Modal from "react-bootstrap/Modal";
function Catalogue() {
  const [items, setItems] = useState("");
  const [loading, setLoading] = useState(true);
  const [details, setDetails] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [available, setAvailable] = useState(true);
  const [orderPlaced, setOrderPlaced] = useState(false);
  useEffect(() => {
    setLoading(true);
    const currentDate = new Date();
    const date = format(currentDate, "ddMMyyyyHHmmss");

    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: "http://localhost:8080/items",
      headers: {
        Authorization: localStorage.getItem("token"),
        "X-GIFTLOV-DATE": date,
      },
    };

    const makeRequest = async () => {
      try {
        const response = await axios.request(config);
        console.log(response.data.items);
        setItems(response.data.items);

        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    makeRequest();
  }, []);
  const checkAvailability = async () => {
    try {
      const currentDate = new Date();
      const date = format(currentDate, "ddMMyyyyHHmmss");
      let config = {
        method: "get",
        maxBodyLength: Infinity,
        url: `http://localhost:8080/checkItemAvailability/${details.id}/${details.toValue}`,
        headers: {
          Authorization: localStorage.getItem("token"),
          "X-GIFTLOV-DATE": date,
        },
      };
      const response = await axios.request(config);
      if (response.status === 200) {
        if (response.data.available) {
          setAvailable(true);
          placeOrder(details.id);
        } else {
          setShowModal(false);
          setAvailable(false);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
  const placeOrder = async (cardItemId) => {
    try {
      const currentDate = new Date();
      const date = format(currentDate, "ddMMyyyyHHmmss");
      const fullName = localStorage.getItem("fullName");
      let data = JSON.stringify({
        customerName: fullName,
        firstName: fullName.split(" ")[0],
        lastName: fullName.slice(fullName.split(" ")[0].length + 1),
        deliveryChannel: "api",
        lineItem: [
          {
            cardItemId: cardItemId,
            value: 1,
          },
        ],
      });

      const config = {
        method: "post",
        maxBodyLength: Infinity,
        url: "http://localhost:8080/placeOrder",
        headers: {
          Authorization: localStorage.getItem("token"),
          "X-GIFTLOV-DATE": date,
          "Content-Type": "application/json",
        },
        data: data,
      };

      console.log(config.data);
      const response = await axios.request(config);
      console.log(response);
      if (response.status === 200) {
        setShowModal(false);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div className="mt-5 mx-2 my-5">
        <h1
          className="text-center "
          style={{ fontSize: "45px", color: "#9c49d4" }}
        >
          <b>Gift Card Catalogue</b>
        </h1>
        <hr
          style={{ width: "370px", border: "3px solid", color: "#1ab5e9" }}
          className="mx-auto shadow-lg"
        />

        <div className="container">
          <div className="row my-5">
            {items && !loading ? (
              items.map((item) => (
                <div className="my-4 col-md-6" key={item.id}>
                  <Card
                    style={{ width: "25rem" }}
                    className="text-center shadow-lg mx-auto"
                    onClick={() => {
                      setDetails(item);
                      setShowModal(true);
                    }}
                  >
                    <Card.Img
                      width="22rem"
                      height="310px"
                      variant="top"
                      src={item.cardFaceImage}
                      alt={`Wallet Image`}
                    />
                    <Card.Body>
                      <Card.Title className="fs-4 mb-3">{item.name}</Card.Title>
                      <Card.Text className="fs-5">
                        Brand: <b className="text-primary">{item.brand}</b>
                      </Card.Text>
                      <Card.Text className="fs-5">
                        Price:{" "}
                        <b className="text-primary">
                          {`${item.toValue} ${item.currency}`}
                        </b>
                      </Card.Text>
                      {item.giftCardInformation && (
                        <Card.Text className="text-truncate fs-5">
                          Description:{" "}
                          <b className="text-primary">
                            {item.giftCardInformation}
                          </b>
                        </Card.Text>
                      )}
                      {item.usageInstructions && (
                        <Card.Text className="text-truncate fs-5">
                          Usage:{" "}
                          <b className="text-primary">
                            {item.usageInstructions}
                          </b>
                        </Card.Text>
                      )}
                      {item.termsAndConditions && (
                        <Card.Text className="text-truncate fs-5">
                          Terms & Conditions:{" "}
                          <b className="text-primary">
                            {item.termsAndConditions}
                          </b>
                        </Card.Text>
                      )}
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
            <Modal.Title className="fs-3">{details.name}</Modal.Title>
          </Modal.Header>
          <Modal.Body className="text-center">
            <img
              width="450px"
              height={"250px"}
              src={details.cardFaceImage}
              alt={details.name}
            />
            <div className="fs-4 my-3">
              Brand: <b className="text-primary">{details.brand}</b>
            </div>
            <div className="fs-4 my-3">
              Price:{" "}
              <b className="text-primary">
                {`${details.toValue} ${details.currency}`}
              </b>
            </div>
            <div className="fs-4 my-3">
              Description:{" "}
              <b className="text-primary fs-6">{details.giftCardInformation}</b>
            </div>
            <div className="fs-4 my-3">
              Usage:{" "}
              <b className="text-primary fs-6">{details.usageInstructions}</b>
            </div>
            <div className="fs-4 my-3">
              Terms & Conditions:{" "}
              <b className="text-primary fs-6">{details.termsAndConditions}</b>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button
              className="px-4"
              variant="secondary"
              onClick={() => {
                setShowModal(false);
              }}
            >
              Cancel
            </Button>
            <Button
              className="mx-3"
              variant="success"
              onClick={checkAvailability}
            >
              Place Order
            </Button>
          </Modal.Footer>
        </Modal>
        <Modal
          show={!available}
          onHide={() => {
            setAvailable(true);
          }}
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title>Out of Stock!!!</Modal.Title>
          </Modal.Header>
          <Modal.Body>Sorry, this card is not available now.</Modal.Body>
          <Modal.Footer>
            <Button
              variant="danger"
              onClick={() => {
                setAvailable(true);
              }}
            >
              Close
            </Button>
          </Modal.Footer>
        </Modal>
        <Modal
          show={orderPlaced}
          onHide={() => {
            setOrderPlaced(false);
          }}
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title>Order Placed Successfully</Modal.Title>
          </Modal.Header>
          <Modal.Body>Your order has been placed successfully.</Modal.Body>
          <Modal.Footer>
            <Button
              variant="success"
              onClick={() => {
                setOrderPlaced(false);
              }}
            >
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </>
  );
}

export default Catalogue;
