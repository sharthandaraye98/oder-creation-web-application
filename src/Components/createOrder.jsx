import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";
const searchIcon = <FontAwesomeIcon icon={faSearch} />;
const plusIcon = <FontAwesomeIcon icon={faPlus} />;
const minusIcon = <FontAwesomeIcon icon={faMinus} />;
function OrderList() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [orderName, setOrderName] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [items, setItems] = useState([]);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    fetch("http://localhost:3001/items")
      .then((response) => response.json())
      .then((data) => setItems(data));
  }, []);

  const [originalItems] = useState(items);
  const handleOrderList = () => {
    navigate("/orderList");
  };

  const handleSearch = () => {
    const filteredItems = items.filter((item) =>
      item.menuItem.toLowerCase().includes(search.toLowerCase())
    );
    setItems(filteredItems);
  };

  const handleSearchTextChange = (event) => {
    setSearch(event.target.value);
    setItems(originalItems); // Reset the items state to the original array
  };

  const handlePlusClick = (item) => {
    const updatedItems = items.map((i) => {
      if (i.id === item.id) {
        return { ...i, quantity: i.quantity + 1 };
      }
      return i;
    });
    setItems(updatedItems);
  };

  const handleMinusClick = (item) => {
    const updatedItems = items.map((i) => {
      if (i.id === item.id && i.quantity > 0) {
        return { ...i, quantity: i.quantity - 1 };
      }
      return i;
    });
    setItems(updatedItems);
  };

  // order form validition and check item quantity>0
  function handleValidation(data) {
    let errorMessage = {};
    let formIsValid = true;
    const filteredItems = items.filter((item) => item.quantity > 0);
    const hasItemsWithQuantity = filteredItems.length > 0;
    if (data["orderName"] === "") {
      formIsValid = false;
      errorMessage["orderName"] = "Order Name is required";
    }
    if (data["customerName"] === "") {
      formIsValid = false;
      errorMessage["customerName"] = "Customer Name is required";
    }
    // Check if any items have quantity greater than 0
    if (!hasItemsWithQuantity) {
      formIsValid = false;
      errorMessage["selectedItems"] =
        "please increase item quantity you want to order";
    }
    setErrorMessage(errorMessage);
    return formIsValid;
  }
  const handleSubmitOrder = (event) => {
    event.preventDefault();
    const newOrder = {
      orderName: orderName,
      customerName: customerName,
      items: items,
      createdDate: new Date(),
    };

    if (handleValidation(newOrder)) {
      fetch("http://localhost:3001/orderList", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newOrder),
      })
        .then((response) => response.json())
        .then((data) => {
          setSuccess(true);
          setTimeout(() => {
            setSuccess(false);
          }, 3000);
          setSearch("");
          setOrderName("");
          setCustomerName("");
        })
        .catch((error) => {
          setError(true);
          setTimeout(() => {
            setError(false);
          }, 3000);
          setSearch("");
          setOrderName("");
          setCustomerName("");
        });
    }
  };

  return (
    <div className="container px-4 mt-3">
      <div className="d-flex flex-row-reverse">
        <div className="p-2 mb-2">
          <button onClick={handleOrderList} className="btn btn-primary">
            Order List
          </button>
        </div>
      </div>
      <div className="row">
        <div className="col">
          <div className="card">
            <div className="card-header">
              <h4>Menu List</h4>
            </div>
            <div className="px-3">
              <input
                className="col-4 h-10 pl-3 rounded text-sm focus:outline-none"
                type="search"
                name="search"
                value={search}
                onChange={handleSearchTextChange}
              ></input>
              <button
                type="submit"
                className="mt-4 mx-2 rounded bg-white"
                onClick={handleSearch}
              >
                <i>{searchIcon}</i>
              </button>
            </div>
            <span className="mt-4 mx-3 text-danger">
              {errorMessage["selectedItems"]}
            </span>
            <div className="card-body">
              <div className="table-responsive">
                <table className="table table-bordered table-striped">
                  <thead>
                    <tr>
                      <th>Item Name</th>
                      <th>Per Price</th>
                      <th>Quantity</th>
                    </tr>
                  </thead>
                  <tbody>
                    {items.map((item) => (
                      <tr key={item.id}>
                        <td>{item.menuItem}</td>
                        <td>{item.price}</td>
                        <td>
                          <button
                            type="submit"
                            className="mt-1 mx-2 rounded btn-primary"
                            onClick={() => handlePlusClick(item)}
                          >
                            <i>{plusIcon}</i>
                          </button>
                          {item.quantity}
                          <button
                            type="submit"
                            className="mt-1 mx-2 rounded btn-danger"
                            onClick={() => handleMinusClick(item)}
                          >
                            <i>{minusIcon}</i>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        <div className="col">
          <form onSubmit={handleSubmitOrder}>
            <h4 className="mb-4">Order Form</h4>
            {success === true && (
              <div class="alert alert-success" role="alert">
                Created Successful!
              </div>
            )}
            {error === true && (
              <div className="alert alert-danger" role="alert">
                Create Fail, Try again!
              </div>
            )}
            <div className="mb-3">
              <label htmlFor="InputOrderName" className="form-label">
                Order Name
              </label>
              <input
                type="text"
                className="form-control"
                value={orderName}
                onChange={(e) => setOrderName(e.target.value)}
                id="InputOrderName"
                aria-describedby="orderNameHelp"
              />
              <span style={{ color: "red" }}>{errorMessage["orderName"]}</span>
            </div>
            <div className="mb-3">
              <label htmlFor="InputCustomerName" className="form-label">
                Customer Name
              </label>
              <input
                type="text"
                className="form-control"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                id="InputCustomerName"
              />
              <span style={{ color: "red" }}>
                {errorMessage["customerName"]}
              </span>
            </div>
            <button type="submit" className="btn btn-md btn-primary">
              Submit Order
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default OrderList;
