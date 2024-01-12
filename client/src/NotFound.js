import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="text-center my-5 mx-5 pt-5">
      <div className="fw-bold m-5 text-danger" style={{ fontSize: "45px" }}>
        404 Page Not Found
      </div>
      <h2 className="mb-5">I have bad news for you.</h2>
      <h4 className="mb-5 mx-5">
        The page you are looking for doesn't exist or might be removed or is
        temporarily unavailable.
      </h4>
      <h3>
        <Link className="button" to="/wallet">
          Back to Homepage
        </Link>
      </h3>
    </div>
  );
};

export default NotFound;
