import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Form, Button, Alert, Spinner } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { updateSeedBank, fetchSeedBanks, setCurrentSeedBank } from '../../features/seedBanks/seedBanksSlice';

const EditSeedBankPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { seedBanks, currentSeedBank, status } = useSelector(state => state.seedBanks);

  const [name, setName] = useState('');
  const [accessionNumber, setAccessionnumber] = useState('');
  const [plantName, setPlantName] = useState('');
  const [quantity, setQuantity] = useState('');
  const [storageCabinet, setStorageCabinet] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchSeedBanks());
    }

    if (!currentSeedBank && seedBanks.length > 0) {
      const seedBank = seedBanks.find(sb => sb.id === parseInt(id));
      if (seedBank) {
        dispatch(setCurrentSeedBank(seedBank));
      }
    }

    if (currentSeedBank) {
      setName(currentSeedBank.name || '');
      setAccessionnumber(currentSeedBank.accessionNumber || '');
      setPlantName(currentSeedBank.plantName || '');
      setQuantity(currentSeedBank.quantity || '');
      setStorageCabinet(currentSeedBank.storageCabinet || '');
      setDescription(currentSeedBank.description || '');
      setLoading(false);
    }
  }, [dispatch, id, seedBanks, currentSeedBank, status]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!name.trim() || !location.trim() || !description.trim()) {
      setError('Lütfen tüm zorunlu alanları doldurun');
      return;
    }

    setIsSubmitting(true);

    const seedBankData = {
      id: parseInt(id),
      name,
      location,
      description
    };

    try {
      await dispatch(updateSeedBank(seedBankData)).unwrap();
      navigate('/seedbanks');
    } catch (err) {
      setError(err || 'Tohum bankası güncellenirken bir hata oluştu');
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
        <Col>
          <h1>Tohum Bankası Düzenle</h1>
        </Col>
      </Row>

      <Row>
        <Col lg={8}>
          <Card className="shadow-sm">
            <Card.Body>
              {error && (
                <Alert variant="danger">{error}</Alert>
              )}

              <Form onSubmit={handleSubmit}>
                <Form.Group as={Row} className="mb-3">
                  <Form.Label column sm={3}>Tohum  Adı: *</Form.Label>
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
                  <Form.Label column sm={3}>Aksesyon Numarası *</Form.Label>
                  <Col sm={9}>
                    <Form.Control
                      type="text"
                      value={accessionNumber}
                      onChange={(e) => setAccessionnumber(e.target.value)}
                      required
                      disabled={isSubmitting}
                    />
                  </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3">
                  <Form.Label column sm={3}>Bitki Adı: *</Form.Label>
                  <Col sm={9}>
                    <Form.Control
                      type="text"
                      value={plantName}
                      onChange={(e) => setPlantName(e.target.value)}
                      required
                      disabled={isSubmitting}
                    />
                  </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3">
                  <Form.Label column sm={3}>Bulunduğu Yer *</Form.Label>
                  <Col sm={9}>
                    <Form.Control
                      type="text"
                      value={storageCabinet}
                      onChange={(e) => setStorageCabinet(e.target.value)}
                      required
                      disabled={isSubmitting}
                    />
                  </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3">
                  <Form.Label column sm={3}>Miktar *</Form.Label>
                  <Col sm={9}>
                    <Form.Control
                      type="text"
                      value={quantity}
                      onChange={(e) => setQuantity(e.target.value)}
                      required
                      disabled={isSubmitting}
                    />
                  </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-4">
                  <Form.Label column sm={3}>Açıklama: *</Form.Label>
                  <Col sm={9}>
                    <Form.Control
                      as="textarea"
                      rows={4}
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      required
                      disabled={isSubmitting}
                    />
                  </Col>
                </Form.Group>

                <div className="d-flex justify-content-end">
                  <Button
                    variant="secondary"
                    className="me-2"
                    onClick={() => navigate('/seedbanks')}
                    disabled={isSubmitting}
                  >
                    İptal
                  </Button>
                  <Button
                    variant="success"
                    type="submit"
                    disabled={isSubmitting}
                  >
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

export default EditSeedBankPage;