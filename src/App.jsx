import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Navigate,
} from "react-router-dom";
import OrderList from "./Components/orderList";
import Login from "./Components/Login";
import CreateOrder from "./Components/createOrder";

const App = () => {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/orderList" element={<OrderList />} />
          <Route path="/createOrder" element={<CreateOrder />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
