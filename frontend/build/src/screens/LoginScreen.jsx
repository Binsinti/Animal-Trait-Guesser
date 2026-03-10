import React, { useState } from "react";
import { Container, Row, Col, Form, Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";

function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add login logic here
    console.log("Login attempt with:", email);
  };

  return (
    <Container className="py-5">
      <Row className="justify-content-center">
        <Col md={6} lg={5}>
          <Card>
            <Card.Body className="p-4">
              <h2 className="text-center mb-4">Login</h2>
              <p className="text-center text-muted mb-4">
                Animal Trait Guesser
              </p>
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formEmail">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formRememberMe">
                  <Form.Check type="checkbox" label="Remember me" />
                </Form.Group>

                <Button variant="primary" type="submit" className="w-100 mb-3">
                  Login
                </Button>

                <div className="text-center">
                  <p className="mb-0">
                    Don't have an account?{" "}
                    <Link to="/register">Register here</Link>
                  </p>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default LoginScreen;
