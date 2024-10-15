import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import React, { useContext, useState } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import Alert from "react-bootstrap/Alert";
import Spinner from "react-bootstrap/Spinner"; // Import Spinner for loading indicator
import "./style.css";
import { AppContext } from "../../App";

function Login() {
  const navigate = useNavigate();
  const currentLocation = useLocation();

  const {
    formData,
    setFormData,
    msg,
    setMsg,
    setToken,
    userName,
    setUserName,
    isLoading,
    setIsLoading,
  } = useContext(AppContext);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleLogin = (e) => {
    e.preventDefault();
    setIsLoading(true); // Set loading to true at the start of the request

    axios
      .post("http://localhost:5000/users/login", formData)
      .then((res) => {
        console.log("Response:", res.data);
        localStorage.setItem("token", res.data.token);
        setToken(res.data.token);
        localStorage.setItem("userName", res.data.user.userName);
        setUserName(res.data.user.userName);
        console.log(userName);

        const redirectPath = currentLocation.state?.from?.pathname || "/";
        navigate(redirectPath);
      })
      .catch((err) => {
        console.error("Error:", err);
        setMsg(err.response?.data?.message || "An error occurred");
      })
      .finally(() => {
        setIsLoading(false); // Set loading to false after the request completes
      });

    console.log("Form Data Submitted:", formData);
  };

  return (
    <div className="login-page">
      <Form onSubmit={handleLogin} className="form-container">
        {msg && <Alert variant="danger">{msg}</Alert>}
        
        <Form.Group as={Row} className="mb-3" controlId="formHorizontalEmail">
          <Form.Label column sm={2}>
            Email
          </Form.Label>
          <Col sm={10}>
            <Form.Control
              type="email"
              placeholder="Email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              aria-describedby="emailHelp" // Accessibility feature
            />
            <Form.Text id="emailHelp" muted>
              We'll never share your email with anyone else.
            </Form.Text>
          </Col>
        </Form.Group>

        <Form.Group
          as={Row}
          className="mb-3"
          controlId="formHorizontalPassword"
        >
          <Form.Label column sm={2}>
            Password
          </Form.Label>
          <Col sm={10}>
            <Form.Control
              type="password"
              placeholder="Password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3" controlId="formHorizontalCheck">
          <Col sm={{ span: 10, offset: 2 }}>
            <Form.Check label="Remember me" />
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3">
          <Col sm={{ span: 10, offset: 2 }}>
            <Button type="submit" disabled={isLoading}> {/* Disable button when loading */}
              {isLoading ? (
                <>
                  <Spinner
                    as="span"
                    animation="border"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                  />
                  <span className="sr-only">Loading...</span> {/* Screen reader only message */}
                  Loading...
                </>
              ) : (
                "Sign in"
              )}
            </Button>
          </Col>
        </Form.Group>
      </Form>
    </div>
  );
}

export default Login;
