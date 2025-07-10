import React from 'react';
import { Container } from 'react-bootstrap';
import { Outlet } from 'react-router-dom';
import Navigation from './Navigation';

const Layout = () => {
  return (
    <div className="d-flex flex-column min-vh-100">
      <Navigation />
      <Container className="py-4 flex-grow-1">
        <Outlet />
      </Container>
      <footer className="py-3 bg-dark text-white text-center">
        <Container>
          <p className="mb-0">© {new Date().getFullYear()} Botanik Bahçesi Yönetim Sistemi</p>
        </Container>
      </footer>
    </div>
  );
};

export default Layout;