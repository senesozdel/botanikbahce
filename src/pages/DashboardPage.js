import React, { useEffect } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchPlants } from '../features/plants/plantsSlice';
import { fetchSeedBanks } from '../features/seedBanks/seedBanksSlice';
import { fetchCollectors } from '../features/collectors/collectorSlice';

const DashboardPage = () => {
  const dispatch = useDispatch();
  
  const { plants, status: plantsStatus } = useSelector(state => state.plants);
  const { seedBanks, status: seedBanksStatus } = useSelector(state => state.seedBanks);
  const { collectors, status: collectorsStatus } = useSelector(state => state.collectors);
  const { user } = useSelector(state => state.auth);
  
  useEffect(() => {
    if (plantsStatus === 'idle') {
      dispatch(fetchPlants());
    }
    
    if (seedBanksStatus === 'idle') {
      dispatch(fetchSeedBanks());
    }

        
    if (collectorsStatus === 'idle') {
      dispatch(fetchSeedBanks());
    }
  }, [dispatch, plantsStatus, seedBanksStatus,collectorsStatus]);
  
  return (
    <Container>
      <Row className="mb-4">
        <Col>
          <Card className="bg-success text-white">
            <Card.Body>
              <h2>Hoş Geldiniz, {user?.name || 'Kullanıcı'}</h2>
              <p>Botanik Bahçesi Yönetim Sisteminde bitkiler ve tohum bankalarını yönetebilirsiniz.</p>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      
      <Row className="mb-4">
        <Col md={4} className="mb-3 mb-md-0">
          <Card className="h-100 shadow-sm">
            <Card.Body className="d-flex flex-column">
              <Card.Title>Bitkiler</Card.Title>
              <div className="text-center my-3">
                <h1 className="display-4">
                  {plantsStatus === 'loading' ? '...' : plants.length}
                </h1>
                <p className="text-muted">Kayıtlı Bitki</p>
              </div>
              <div className="mt-auto">
                <Link to="/plants">
                  <Button variant="success" className="w-100">Bitkileri Yönet</Button>
                </Link>
              </div>
            </Card.Body>
          </Card>
        </Col>
        
        <Col md={4}>
          <Card className="h-100 shadow-sm">
            <Card.Body className="d-flex flex-column">
              <Card.Title>Tohum Bankaları</Card.Title>
              <div className="text-center my-3">
                <h1 className="display-4">
                  {seedBanksStatus === 'loading' ? '...' : seedBanks.length}
                </h1>
                <p className="text-muted">Kayıtlı Tohum Bankası</p>
              </div>
              <div className="mt-auto">
                <Link to="/seedbanks">
                  <Button variant="success" className="w-100">Tohum Bankalarını Yönet</Button>
                </Link>
              </div>
            </Card.Body>
          </Card>
        </Col>

              <Col md={4}>
          <Card className="h-100 shadow-sm">
            <Card.Body className="d-flex flex-column">
              <Card.Title>Toplayıcı Defteri</Card.Title>
              <div className="text-center my-3">
                <h1 className="display-4">
                  {collectorsStatus === 'loading' ? '...' : collectors.length}
                </h1>
                <p className="text-muted">Kayıtlı Toplayıcılar</p>
              </div>
              <div className="mt-auto">
                <Link to="/collectors">
                  <Button variant="success" className="w-100">Toplayıcı Defterini Yönet</Button>
                </Link>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      
      <Row className="mb-4">
        <Col>
          <Card className="shadow-sm">
            <Card.Header className="bg-light">
              <h5 className="mb-0">Hızlı İşlemler</h5>
            </Card.Header>
            <Card.Body>
              <Row>
                <Col sm={6} className="mb-2 mb-sm-0">
                  <Link to="/plants/add">
                    <Button variant="outline-success" className="w-100">Yeni Bitki Ekle</Button>
                  </Link>
                </Col>
                <Col sm={6}>
                  <Link to="/seedbanks/add">
                    <Button variant="outline-success" className="w-100">Yeni Tohum Bankası Ekle</Button>
                  </Link>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      
      <Row>
        <Col>
          <Card className="shadow-sm">
            <Card.Header className="bg-light">
              <h5 className="mb-0">Son Eklenen Bitkiler</h5>
            </Card.Header>
            <Card.Body>
              {plantsStatus === 'loading' ? (
                <p className="text-center">Yükleniyor...</p>
              ) : plants.length > 0 ? (
                <ul className="list-group">
                  {plants.slice(0, 5).map(plant => (
                    <li key={plant.id} className="list-group-item">
                      <Link to={`/plants/edit/${plant.id}`} className="text-decoration-none">
                        {plant.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-center">Henüz bitki kaydı bulunmamaktadır.</p>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default DashboardPage;