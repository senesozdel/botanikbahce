import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addSeedBank } from '../../features/seedBanks/seedBanksSlice';
import { Container, Row, Col, Card, Form, Button, Alert, Spinner } from 'react-bootstrap';


const AddSeedBankPage = () => {
 const [name, setName] = useState('');
  const [accessionNumber, setAccessionnumber] = useState('');
  const [quantity, setQuantity] = useState('');
  const [storageCabinet, setStorageCabinet] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    if (!name.trim() || !location.trim() || !description.trim()) {
      setError('Lütfen tüm zorunlu alanları doldurun');
      return;
    }
    
    const seedBankData = {
      name,
      location,
      description
    };
    
    try {
      await dispatch(addSeedBank(seedBankData)).unwrap();
      navigate('/seedbanks');
    } catch (err) {
      setError(err || 'Tohum bankası eklenirken bir hata oluştu');
    }
  };
  
  return (
    <div className="add-seedbank-page">
      <h1>Yeni Tohum Bankası Ekle</h1>
      
      {error && <div className="error-message">{error}</div>}
      
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
    </div>
  );
};

export default AddSeedBankPage;