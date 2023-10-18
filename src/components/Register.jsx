import { Button, Card, Col, Container, Form, Row } from 'react-bootstrap';
import { Link, useNavigate } from "react-router-dom";
import { auth, registerWithEmailAndPassword } from '../auth/firebase'
import { useEffect, useState } from "react";

import { useAuthState } from "react-firebase-hooks/auth"

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConf, setPasswordConf] = useState('');
  const [name, setName] = useState('')
  const [user, loading] = useAuthState(auth)
  const navigate = useNavigate();
  const [passwordMatch, setPasswordMatch] = useState(true)

  const register = () => {
    if (!name) alert("Please enter name")
    registerWithEmailAndPassword(name, email, password)
  }
  useEffect(() => {
    if (loading) return;
    if (user) navigate('/countries')
  }, [user, loading, passwordMatch, navigate])

  const passwordConfirmation = (e) => {
    setPasswordConf(e.target.value)
    if (password !== passwordConf) {
      setPasswordMatch(false)
    }
    setPasswordMatch(true)
  }

  return (
    <div className="vh-75">
      <Container className="py-5 h-100">
        <Row className="d-flex justify-content-center align-items-center h-100">
          <Col className="col-12 col-md-8 col-lg-6 col-xl-5">
            <Card className="border-0 shadow-xxs-1 bg-dark text-white" style={{ borderRadius: "20px" }}>
              <Card.Body className="p-5 text-center">
                <div className="mb-md-1 mt-md-4 pb-5">
                  <h2 className="fw-bold mb-2 text-uppercase">Registration</h2>
                  <span className="mb-3 text-white-50">Fill all the fields</span>
                </div>
                <Form>
                  <Form.Group className="mb-3" controlId="formBasicName">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                      required
                      type="name"
                      placeholder="Enter name"
                      value={name}
                      onChange={(e) => setName(e.target.value)} />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control
                      required
                      type="email"
                      placeholder="Enter email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      required
                      type="password"
                      placeholder="Enter Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)} />
                  </Form.Group>
                  <Form.Group className="mb-5" controlId="formBasicPassword">
                    <Form.Label className=''>Confirm Password</Form.Label>
                    <Form.Control
                      required
                      type="password"
                      placeholder="Confirm password"
                      onChange={(e) => passwordConfirmation()} />
                  </Form.Group>

                  {passwordMatch ? null : <div class="alert alert-warning" role="alert">
                    This is a warning alert—check it out!
                  </div>}
                  <Button className='mb-3' onClick={register}>Register</Button>
                  <p><Link to="/login">Already have an account?</Link></p>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>


  );
};

export default Register;
