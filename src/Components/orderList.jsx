import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function OrderList() {
  const navigate = useNavigate();
  const [orderList, setOrderList] = useState([]);

  const handleAddNew = () => {
    navigate("/createOrder");
  };
  useEffect(() => {
    fetch("http://localhost:3001/orderList")
      .then((response) => response.json())
      .then((data) => setOrderList(data));
  }, []);

  return (
    <div className="container px-4 mt-3">
      <div className="d-flex flex-row-reverse">
        <div className="p-2 mb-2">
          <button onClick={handleAddNew} className="btn btn-primary">
            Add New Order
          </button>
        </div>
      </div>
      <div className="card">
        <div className="card-header">
          <h2>Order Lists</h2>
        </div>
        <div className="card-body">
          <div className="table-responsive">
            <table className="table table-bordered table-striped">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Order Name</th>
                  <th>Order By</th>
                  <th>Created Date</th>
                </tr>
              </thead>
              <tbody>
                {orderList.map((order) => (
                  <tr key={order.id}>
                    <td>{order.id}</td>
                    <td>{order.orderName}</td>
                    <td>{order.customerName}</td>
                    <td>{order.createdDate}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrderList;
