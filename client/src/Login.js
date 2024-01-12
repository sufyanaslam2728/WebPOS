import React, { useState } from "react";
import axios from "axios";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleUser, faKey } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
function Login({ reload }) {
  const [hide, setHide] = useState(true);
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const handleSubmit = async (event) => {
    event.preventDefault();
    setHide(true);
    try {
      let data = JSON.stringify({
        username: name,
        password: password,
      });

      let config = {
        method: "post",
        maxBodyLength: Infinity,
        url: "http://localhost:8080/login",
        headers: {
          "Content-Type": "application/json",
        },
        data: data,
      };

      const response = await axios.request(config);
      if (response.status === 200) {
        setHide(true);
        const { data: responseData } = response;

        localStorage.setItem("token", responseData["token"]);
        localStorage.setItem("fullName", responseData["fullName"]);
        await reload(true);
        navigate("/wallet");
      }
    } catch (error) {
      console.log(error);
      if (error.response.status === 400) {
        setHide(false);
      }
    }

    // if (response.status === 200) {
    //   const json = await response.json();
    //   console.log(json);

    //   if (json.authToken) {
    //     var decoded = await jwt_decode(json.authToken);
    //     setUser(decoded.user);
    //     localStorage.setItem("token", json.authToken);
    //     await reload();

    //     if (decoded.user.role === "admin") {
    //     //   setValidated(true);
    //       navigate("/admin");
    //     } else if (decoded.user.role === "seller") {
    //     //   setValidated(true);
    //       navigate("/seller/products");
    //     } else if (decoded.user.role === "customer") {
    //     //   setValidated(true);
    //       navigate("/home");
    //     }
    //   }
    // }
    // if (response.status === 204) {
    //   setHide(false);
    // }
  };
  return (
    <Form onSubmit={handleSubmit}>
      <div className="d-flex justify-content-center align-items-center">
        <div className="shadow-lg bg-white m-5" style={{ width: "370px" }}>
          <div className="m-5">
            <h1 className="text-center mb-5 pt-3">
              <b>Login</b>
            </h1>

            <Form.Group className="mb-3 w-10" controlId="validationCustom01">
              <Form.Label>
                <FontAwesomeIcon
                  icon={faCircleUser}
                  beatFade
                  className="mx-1"
                />
                <b>Username:</b>
              </Form.Label>
              <Form.Control
                variant="outlined"
                type="text"
                placeholder="Enter your username here."
                required
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="validationCustom02">
              <Form.Label>
                <FontAwesomeIcon icon={faKey} beatFade className="mx-1" />
                <b>Password:</b>
              </Form.Label>
              <Form.Control
                variant="outlined "
                type="password"
                placeholder="Enter your password here."
                required
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>
            <div hidden={hide} className="text-danger text-center fa-bounce">
              Invalid Credentials!
            </div>
          </div>
          <div className="mb-5 grid text-center">
            <Button variant="outline-success px-4 shadow-lg" type="submit">
              Login
            </Button>
          </div>
        </div>
      </div>
    </Form>
  );
}

export default Login;
