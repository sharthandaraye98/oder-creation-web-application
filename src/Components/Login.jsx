import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./order.css";

const Login = () => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [users, setUsers] = useState([]);
  const [errorMessages, setErrorMessages] = useState({});

  useEffect(() => {
    fetch("http://localhost:3001/users")
      .then((response) => response.json())
      .then((data) => setUsers(data));
  }, []);

  const validateForm = () => {
    return userName.length > 0 && password.length > 0;
  };

  const errors = {
    userName: "invalid username",
    password: "invalid password",
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const userData = users.find((user) => user.username === userName);

    // Compare user info
    if (userData) {
      if (userData.password !== password) {
        // Invalid password
        setErrorMessages({ name: "password", message: errors.password });
      } else {
        navigate("/orderList");
      }
    } else {
      // Username not found
      setErrorMessages({ name: "userName", message: errors.userName });
    }
  };

  const checkErrorMessage = (name) =>
    name === errorMessages.name && (
      <div className="error text-danger">{errorMessages.message}</div>
    );
  return (
    <div className="Login">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="InputUserName" className="form-label">
            User Name
          </label>
          <input
            type="text"
            className="form-control"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            id="InputUserName"
            aria-describedby="userNameHelp"
          />
          {checkErrorMessage("userName")}
        </div>
        <div className="mb-3">
          <label htmlFor="InputPassword" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            id="InputPassword"
          />
          {checkErrorMessage("password")}
        </div>
        <button
          type="submit"
          className="btn btn-primary"
          disabled={!validateForm()}
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default Login;
