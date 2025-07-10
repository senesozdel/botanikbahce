import React, { useState } from 'react';
import { Container, Row, Col, Card, Form, Button, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AddCollectorPage = () => {
  const [collector, setCollector] = useState({ name: '', code: '', phoneNumber: '', email: '' });
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!collector.name || !collector.code) {
      setError('İsim ve Kod alanları zorunludur');
      return;
    }

    setIsSubmitting(true);
    try {
      await axios.post('/api/Collector/Add', collector);
      navigate('/collectors');
    } catch (err) {
      setError('Ekleme başarısız.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Container>
      <Row className="mb-4"><Col><h1>Yeni Toplayıcı</h1></Col></Row>
      <Row>
        <Col lg={8}>
          <Card className="shadow-sm">
            <Card.Body>
              {error && <Alert variant="danger">{error}</Alert>}
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label>Adı *</Form.Label>
                  <Form.Control
                    type="text"
                    value={collector.name}
                    onChange={(e) => setCollector({ ...collector, name: e.target.value })}
                    required
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Kod *</Form.Label>
                  <Form.Control
                    type="text"
                    value={collector.code}
                    onChange={(e) => setCollector({ ...collector, code: e.target.value })}
                    required
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Telefon</Form.Label>
                  <Form.Control
                    type="text"
                    value={collector.phoneNumber}
                    onChange={(e) => setCollector({ ...collector, phoneNumber: e.target.value })}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    value={collector.email}
                    onChange={(e) => setCollector({ ...collector, email: e.target.value })}
                  />
                </Form.Group>
                <div className="d-flex justify-content-end">
                  <Button variant="secondary" className="me-2" onClick={() => navigate('/collectors')}>İptal</Button>
                  <Button variant="success" type="submit" disabled={isSubmitting}>
                    {isSubmitting ? 'Kaydediliyor...' : 'Kaydet'}
                  </Button>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default AddCollectorPage;
