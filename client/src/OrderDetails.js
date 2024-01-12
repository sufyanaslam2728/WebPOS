import React, { useEffect } from "react";
// import { useParams } from "react-router-dom";
// import { format } from "date-fns";
// import Spinner from "./Spinner";
// import axios from "axios";

function OrderDetails() {
  //   const param = useParams();
  //   const [loading, setLoading] = useState(true);
  useEffect(() => {
    // setLoading(true);
    // const currentDate = new Date();
    // const date = format(currentDate, "ddMMyyyyHHmmss");
    // let config = {
    //   method: "get",
    //   maxBodyLength: Infinity,
    //   url: "http://localhost:8080/items",
    //   headers: {
    //     Authorization: localStorage.getItem("token"),
    //     "X-GIFTLOV-DATE": date,
    //   },
    // };
    // const makeRequest = async () => {
    //   try {
    //     const response = await axios.request(config);
    //     console.log(response.data.items);
    //     setItems(response.data.items);
    //     setLoading(false);
    //   } catch (error) {
    //     console.log(error);
    //   }
    // };
    // makeRequest();
  }, []);
  return <div></div>;
}

export default OrderDetails;
