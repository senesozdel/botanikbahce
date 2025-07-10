import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Spinner } from 'react-bootstrap';

function PrivateRoute({ children }) {
  const { isAuthenticated, status } = useSelector(state => state.auth);
  const location = useLocation();

  if (status === 'loading') {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
        <Spinner animation="border" variant="success" />
        <span className="ms-2">Kimlik doğrulanıyor...</span>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}

export default PrivateRoute;