import "./App.css";
import {
  Navigate,
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Login from "./Login";
import Catalogue from "./Catalogue";
import Navbar from "./Navbar";
import NotFound from "./NotFound";
import { useEffect, useState } from "react";
import Wallet from "./Wallet";
import Orders from "./Orders";
import OrderDetails from "./OrderDetails";

function App() {
  const [reload, setReload] = useState(false);
  useEffect(() => {
    if (reload === true) {
      setReload(false);
    }
  }, [reload]);
  function ProtectedRoutes(props) {
    if (localStorage.getItem("token")) {
      return props.children;
    } else {
      return <Navigate to="/login" />;
    }
  }
  return (
    <div>
      <Router>
        {localStorage.getItem("token") && <Navbar reload={setReload} />}

        {!localStorage.getItem("token") && (
          <Routes>
            <Route exact path="/login" element={<Login reload={setReload} />} />
            {/* <Route path="*" element={<NotFound />} /> */}
          </Routes>
        )}
        {localStorage.getItem("token") && (
          <Routes>
            <Route
              exact
              path="/catalogue"
              element={
                <ProtectedRoutes>
                  <Catalogue />
                </ProtectedRoutes>
              }
            />
            <Route
              exact
              path="/wallet"
              element={
                <ProtectedRoutes>
                  <Wallet />
                </ProtectedRoutes>
              }
            />
            <Route
              exact
              path="/orders"
              element={
                <ProtectedRoutes>
                  <Orders />
                </ProtectedRoutes>
              }
            />
            <Route
              exact
              path="/orders/:orderId"
              element={
                <ProtectedRoutes>
                  <OrderDetails />
                </ProtectedRoutes>
              }
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        )}
      </Router>
    </div>
  );
}

export default App;
