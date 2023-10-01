import { Button, Container, Nav, Navbar, Row } from 'react-bootstrap';
import { auth, logout } from '../auth/firebase';

import { LinkContainer } from 'react-router-bootstrap';
import { Outlet } from 'react-router-dom';
import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';

const Layout = () => {
  const [user] = useAuthState(auth)
  return (
    <Container fluid>
      <Row>
        <Navbar variant="dark" bg='dark' sticky='top'>
          <Container className="justify-content-end">
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav>
                <LinkContainer to="/">
                  <Nav.Link>Home</Nav.Link>
                </LinkContainer>
                <LinkContainer to="/countries">
                  <Nav.Link>Countries</Nav.Link>
                </LinkContainer>
                <LinkContainer to="/favourites">
                  <Nav.Link>Favourites</Nav.Link>
                </LinkContainer>


              </Nav>
            </Navbar.Collapse>
            {user ? <Button onClick={logout} variant='light'>Logout</Button> :
              <LinkContainer to="/login">
                <Button variant='light'> Login</Button>

              </LinkContainer>}

          </Container>
        </Navbar>
      </Row>
      <Row>
        <Outlet />
      </Row>
    </Container>
  );
};

export default Layout;
