import React from 'react';
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../features/auth/authSlice';

const Navigation = () => {
  const { isAuthenticated, user } = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <Navbar bg="success" variant="dark" expand="lg">
      <Container>
        <LinkContainer to="/">
          <Navbar.Brand>Botanik Bahçesi</Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          {isAuthenticated ? (
            <>
              <Nav className="me-auto">
                <LinkContainer to="/" exact>
                  <Nav.Link>Ana Sayfa</Nav.Link>
                </LinkContainer>
                <LinkContainer to="/plants">
                  <Nav.Link>Bitkiler</Nav.Link>
                </LinkContainer>
                <LinkContainer to="/seedbanks">
                  <Nav.Link>Tohum Bankaları</Nav.Link>
                </LinkContainer>
              </Nav>
              <Nav>
                <NavDropdown title={user?.name || 'Kullanıcı'} id="user-dropdown" align="end">
                  <NavDropdown.Item onClick={handleLogout}>Çıkış Yap</NavDropdown.Item>
                </NavDropdown>
              </Nav>
            </>
          ) : (
            <Nav className="ms-auto">
              <LinkContainer to="/login">
                <Nav.Link>Giriş Yap</Nav.Link>
              </LinkContainer>
            </Nav>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Navigation;