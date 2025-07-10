import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Form, Button, Alert } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addPlant } from '../../features/plants/plantsSlice';
import apiClient from '../../services/api';


const AddPlantPage = () => {
  const [name, setName] = useState('');
  const [accessionNumber, setAccessionnumber] = useState('');
  const [materialType, setMaterialType] = useState('');
  const [description, setDescription] = useState('');
  const [origin, setOrigin] = useState('');
  const [location, setLocation] = useState('');
  const [coordinates, setCoordinates] = useState('');
  const [collectionDate, setCollectionDate] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [collectorId, setCollectorId] = useState('');
  const [collectors, setCollectors] = useState([]);
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  useEffect(() => {
    const fetchCollectors = async () => {
      try {
        const response = await apiClient.get('Collector');
        setCollectors(response.data);
      } catch (error) {
        console.error('Toplayıcılar yüklenirken hata:', error);
      }
    };
    
    const fetchCategories = async () => {
      try {
        const response = await apiClient.get('/PlantCategory');
        setCategories(response.data);
      } catch (error) {
        console.error('Kategoriler yüklenirken hata:', error);
      }
    };
    
    fetchCollectors();
    fetchCategories();
  }, []);
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    if (!name.trim() || !accessionNumber.trim() || !description.trim()) {
      setError('Lütfen tüm zorunlu alanları doldurun');
      return;
    }
    
    setIsSubmitting(true);
    
    const plantData = {
      name,
      accessionNumber,
      materialType,
      description,
      origin,
      location,
      coordinates,
      collectionDate,
      categoryId: categoryId ? parseInt(categoryId) : null,
      collectorId: collectorId ? parseInt(collectorId) : null
    };
    
    try {
      await dispatch(addPlant(plantData)).unwrap();
      navigate('/plants');
    } catch (err) {
      setError(err || 'Bitki eklenirken bir hata oluştu');
      setIsSubmitting(false);
    }
  };
  
  return (
    <Container>
      <Row className="mb-4">
        <Col>
          <h1>Yeni Bitki Ekle</h1>
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
                  <Form.Label column sm={3}>Aksesyon Numarası: *</Form.Label>
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
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                      disabled={isSubmitting}
                    />
                  </Col>
                </Form.Group>
                
                <Form.Group as={Row} className="mb-3">
                  <Form.Label column sm={3}>Materyal Çeşidi: *</Form.Label>
                  <Col sm={9}>
                    <Form.Control
                      type="text"
                      value={materialType}
                      onChange={(e) => setMaterialType(e.target.value)}
                      required
                      disabled={isSubmitting}
                    />
                  </Col>
                </Form.Group>
                
                <Form.Group as={Row} className="mb-3">
                  <Form.Label column sm={3}>Açıklama:</Form.Label>
                  <Col sm={9}>
                    <Form.Control
                      as="textarea"
                      rows={4}
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      disabled={isSubmitting}
                    />
                  </Col>
                </Form.Group>
                
                <Form.Group as={Row} className="mb-3">
                  <Form.Label column sm={3}>Köken:</Form.Label>
                  <Col sm={9}>
                    <Form.Control
                      type="text"
                      value={origin}
                      onChange={(e) => setOrigin(e.target.value)}
                      disabled={isSubmitting}
                    />
                  </Col>
                </Form.Group>
                
                <Form.Group as={Row} className="mb-3">
                  <Form.Label column sm={3}>Lokasyon:</Form.Label>
                  <Col sm={9}>
                    <Form.Control
                      type="text"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      disabled={isSubmitting}
                    />
                  </Col>
                </Form.Group>
                
                <Form.Group as={Row} className="mb-3">
                  <Form.Label column sm={3}>Koordinatlar:</Form.Label>
                  <Col sm={9}>
                    <Form.Control
                      type="text"
                      value={coordinates}
                      onChange={(e) => setCoordinates(e.target.value)}
                      placeholder="Örn: 28.6139,77.2090"
                      disabled={isSubmitting}
                    />
                  </Col>
                </Form.Group>
                
                <Form.Group as={Row} className="mb-3">
                  <Form.Label column sm={3}>Toplanma Tarihi:</Form.Label>
                  <Col sm={9}>
                    <Form.Control
                      type="date"
                      value={collectionDate ? collectionDate.split('T')[0] : ''}
                      onChange={(e) => setCollectionDate(e.target.value)}
                      disabled={isSubmitting}
                    />
                  </Col>
                </Form.Group>
                
                <Form.Group as={Row} className="mb-3">
                  <Form.Label column sm={3}>Kategori:</Form.Label>
                  <Col sm={9}>
                    <Form.Select
                      value={categoryId}
                      onChange={(e) => setCategoryId(e.target.value)}
                      disabled={isSubmitting}
                    >
                      <option value="">-- Kategori Seçin --</option>
                      {categories.map(category => (
                        <option key={category.id} value={category.id}>
                          {category.name}
                        </option>
                      ))}
                    </Form.Select>
                  </Col>
                </Form.Group>
                
                <Form.Group as={Row} className="mb-4">
                  <Form.Label column sm={3}>Toplayıcı:</Form.Label>
                  <Col sm={9}>
                    <Form.Select
                      value={collectorId}
                      onChange={(e) => setCollectorId(e.target.value)}
                      disabled={isSubmitting}
                    >
                      <option value="">-- Toplayıcı Seçin --</option>
                      {collectors.map(collector => (
                        <option key={collector.id} value={collector.id}>
                          {collector.name}
                        </option>
                      ))}
                    </Form.Select>
                  </Col>
                </Form.Group>
                
                <div className="d-flex justify-content-end">
                  <Button 
                    variant="secondary" 
                    className="me-2"
                    onClick={() => navigate('/plants')}
                    disabled={isSubmitting}
                  >
                    İptal
                  </Button>
                  <Button 
                    variant="success" 
                    type="submit"
                    disabled={isSubmitting}
                  >
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

export default AddPlantPage;