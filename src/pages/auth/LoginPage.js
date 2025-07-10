import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button, Card, Alert, NavLink } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { login } from '../../features/auth/authSlice';

const LoginPage = () => {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  
  const { isAuthenticated, status, error } = useSelector(state => state.auth);
  
  useEffect(() => {
    if (isAuthenticated) {
      const from = location.state?.from?.pathname || '/';
      navigate(from, { replace: true });
    }
  }, [isAuthenticated, navigate, location]);
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    
    if (!userName.trim() || !password.trim()) {
      setErrorMsg('Kullanıcı adı ve şifre gereklidir');
      return;
    }
    
    try {
      await dispatch(login({ userName, password })).unwrap();
    } catch (err) {
      setErrorMsg(err || 'Giriş yapılamadı, lütfen tekrar deneyin.');
    }
  };
  
  return (
    <Container fluid className="min-vh-100 d-flex align-items-center py-5">
      <Row className="justify-content-center w-100">
        <Col md={6} lg={4}>
          <Card className="shadow-sm">
            <Card.Body className="p-4">
              <div className="text-center mb-4">
                <h2 className="text-success">Botanik Bahçesi</h2>
                <p className="text-muted">Yönetim Sistemine Hoş Geldiniz</p>
              </div>
              
              {(errorMsg || error) && (
                <Alert variant="danger">{errorMsg || error}</Alert>
              )}
              
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label>Kullanıcı Adı</Form.Label>
                  <Form.Control 
                    type="text" 
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    disabled={status === 'loading'}
                    required
                  />
                </Form.Group>
                
                <Form.Group className="mb-4">
                  <Form.Label>Şifre</Form.Label>
                  <Form.Control 
                    type="password" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    disabled={status === 'loading'}
                    required
                  />
                </Form.Group>
                
                <Button 
                  variant="success" 
                  type="submit" 
                  className="w-100"
                  disabled={status === 'loading'}
                >
                  {status === 'loading' ? 'Giriş Yapılıyor...' : 'Giriş Yap'}
                </Button>
                <Link to="/register" className="d-block text-center mt-3 text-danger fw-semibold"> 
                  Hesabınız yok mu? Kayıt Olun
                </Link>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default LoginPage;