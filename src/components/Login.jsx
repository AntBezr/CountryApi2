import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { auth, loginWithEmailAndPassword } from "../auth/firebase";
import { useEffect, useState } from "react";

import { useAuthState } from "react-firebase-hooks/auth"

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [user, loading, error] = useAuthState(auth)
  const navigate = useNavigate();

  useEffect(() => {
    if (loading) return;
    if (user) navigate('/countries')
  }, [user, loading])


  return (
    <div className="vh-75" >
      <Container className="py-5 h-100w" >
        <Row className="d-flex justify-content-center align-items-center h-100">
          <Col className="col-12 col-md-8 col-lg-6 col-xl-5">
            <Card className="border-0 shadow-xxs-1 bg-dark text-white" style={{ borderRadius: "20px" }}>
              <Card.Body className="p-5 text-center">
                <div className="mb-md-1 mt-md-4 pb-5">
                  <h2 className="fw-bold mb-2 text-uppercase">Login</h2>
                  <span className="mb-3 text-white-50">Enter your email and password to sign in</span>
                  <Form onSubmit={(e) => {
                    e.preventDefault()
                    loginWithEmailAndPassword(email, password)
                  }}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                      <Form.Label>Email address</Form.Label>
                      <Form.Control
                        type="email"
                        placeholder="Enter email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                      <Form.Text className="text-muted">
                        We'll never share your email with anyone else.
                      </Form.Text>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicPassword">
                      <Form.Label>Password</Form.Label>
                      <Form.Control
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)} />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicCheckbox">
                      <Form.Check type="checkbox" label="You can check me. Nothing change" />
                    </Form.Group>

                    <p className="small mb-5 pb-lg-2 text-white-50"><Link to="/forgot-password">Forgot password?</Link></p>
                    <Button variant="primary" type="submit" className="w-100">Login</Button>
                  </Form>
                  <div><p className="mb-0"><Link to="/register" className="text-white-50 fw-bold">Don't have an account?</Link></p></div>
                  <div className="mt-5">
                    <h5 className="mb-2">Feel free to use this account for exploring:</h5>
                    <p className="mb-2"> <strong>Email:</strong>test@test.com</p>
                    <p className="mb-2"><strong>Password:</strong>testtest</p>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div >
  );
};

export default Login;