import React, { useState } from "react";
import { Button, Form, Spinner } from "react-bootstrap";
import "../../styles/register.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  function handleSubmit() {
    if (email.length === 0) {
      setError("Email tidak boleh kosong");
    } else {
      const body = {
        email,
        password,
      };

      setLoading(true);

      axios
        .post("https://peaceful-citadel-71310.herokuapp.com/signin", body)
        .then(({ data }) => {
          localStorage.setItem("token", data.token);

          navigate("/");
        })
        .catch((err) => {
          console.log(err.response, "error gan!");
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }

  if (loading) {
    return <Spinner animation="border" variant="primary"></Spinner>;
  }

  return (
    <div className="border rounded border-primary register-todo">
      <h3 className="text-center">Login Todo App</h3>
      <Form>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Email"
            autoComplete="off"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </Form.Group>

        <Button className="w-100" variant="primary" onClick={handleSubmit}>
          Submit
        </Button>
      </Form>
    </div>
  );
}

export default Login;
