import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Form, Button, Alert, Spinner } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCollectors, setCurrentCollector, updateCollector } from '../../features/collectors/collectorSlice';
import apiClient from '../../services/api';

const EditCollectorPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { collectors, currentCollector, status } = useSelector((state) => state.collectors);

  const [name, setName] = useState('');
  const [code, setCode] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchCollectors());
    }

    if (!currentCollector && collectors.length > 0) {
      const collector = collectors.find((c) => c.id === parseInt(id));
      if (collector) {
        dispatch(setCurrentCollector(collector));
      }
    }

    if (currentCollector) {
      setName(currentCollector.name || '');
      setCode(currentCollector.code || '');
      setPhoneNumber(currentCollector.phoneNumber || '');
      setEmail(currentCollector.email || '');
      setLoading(false);
    }
  }, [dispatch, id, collectors, currentCollector, status]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);

    const updatedData = {
      id: parseInt(id),
      name,
      code,
      phoneNumber,
      email,
    };

    try {
      await dispatch(updateCollector(updatedData)).unwrap();
      navigate('/collectors');
    } catch (err) {
      setError(err?.message || 'Güncelleme başarısız');
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <Container>
        <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '300px' }}>
          <Spinner animation="border" variant="success" />
          <span className="ms-2">Yükleniyor...</span>
        </div>
      </Container>
    );
  }

  return (
    <Container>
      <Row className="mb-4">
        <Col><h1>Toplayıcıyı Düzenle</h1></Col>
      </Row>
      <Row>
        <Col lg={8}>
          <Card className="shadow-sm">
            <Card.Body>
              {error && <Alert variant="danger">{error}</Alert>}
              <Form onSubmit={handleSubmit}>
                <Form.Group as={Row} className="mb-3">
                  <Form.Label column sm={3}>Adı *</Form.Label>
                  <Col sm={9}>
                    <Form.Control
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                      disabled={isSubmitting}
                    />
                  </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3">
                  <Form.Label column sm={3}>Kod</Form.Label>
                  <Col sm={9}>
                    <Form.Control
                      type="text"
                      value={code}
                      onChange={(e) => setCode(e.target.value)}
                      disabled={isSubmitting}
                    />
                  </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3">
                  <Form.Label column sm={3}>Telefon</Form.Label>
                  <Col sm={9}>
                    <Form.Control
                      type="text"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      disabled={isSubmitting}
                    />
                  </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-4">
                  <Form.Label column sm={3}>Email</Form.Label>
                  <Col sm={9}>
                    <Form.Control
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      disabled={isSubmitting}
                    />
                  </Col>
                </Form.Group>

                <div className="d-flex justify-content-end">
                  <Button
                    variant="secondary"
                    className="me-2"
                    onClick={() => navigate('/collectors')}
                    disabled={isSubmitting}
                  >
                    İptal
                  </Button>
                  <Button variant="success" type="submit" disabled={isSubmitting}>
                    {isSubmitting ? 'Güncelleniyor...' : 'Güncelle'}
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

export default EditCollectorPage;
