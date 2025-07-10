import React, { useEffect, useState } from 'react';
import {
  Container, Row, Col, Card, Form, Button,
  Table, Badge, Spinner, Alert, Tabs, Tab
} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  fetchCollectors,
  searchCollectors,
  deleteCollector,
  setCurrentCollector
} from '../../features/collectors/collectorSlice';

const CollectorsPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState('compact');
  const dispatch = useDispatch();

  const { filteredCollectors, status, error } = useSelector(state => state.collectors);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchCollectors());
    }
  }, [status, dispatch]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      dispatch(searchCollectors(searchTerm));
    } else {
      dispatch(fetchCollectors());
    }
  };

  const handleDelete = (id) => {
    if (window.confirm('Bu toplayıcıyı silmek istediğinizden emin misiniz?')) {
      dispatch(deleteCollector({ id }));
    }
  };

  const handleEdit = (collector) => {
    dispatch(setCurrentCollector(collector));
  };

  const renderTable = () => (
    <Table responsive hover>
      <thead>
        <tr>
          <th>Adı</th>
          <th>Kodu</th>
          <th>Telefon</th>
          <th>Email</th>
          <th>İşlemler</th>
        </tr>
      </thead>
      <tbody>
        {filteredCollectors.map(c => (
          <tr key={c.id}>
            <td>{c.name}</td>
            <td>{c.code}</td>
            <td>{c.phoneNumber}</td>
            <td>{c.email}</td>
            <td>
              <Link to={`/collectors/edit/${c.id}`} onClick={() => handleEdit(c)}>
                <Button variant="outline-primary" size="sm" className="me-2">Düzenle</Button>
              </Link>
              <Button variant="outline-danger" size="sm" onClick={() => handleDelete(c.id)}>
                Sil
              </Button>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );

  const renderCards = () => (
    <Row xs={1} md={2} lg={3} className="g-4">
      {filteredCollectors.map(c => (
        <Col key={c.id}>
          <Card className="h-100 shadow-sm">
            <Card.Header className="d-flex justify-content-between">
              <h5 className="mb-0">{c.name}</h5>
              <Badge bg="secondary">{c.code}</Badge>
            </Card.Header>
            <Card.Body>
              <div className="mb-2"><strong>Telefon:</strong> {c.phoneNumber || '-'}</div>
              <div className="mb-2"><strong>Email:</strong> {c.email || '-'}</div>
            </Card.Body>
            <Card.Footer className="bg-white d-flex justify-content-end">
              <Link to={`/collectors/edit/${c.id}`} onClick={() => handleEdit(c)}>
                <Button variant="outline-primary" size="sm" className="me-2">Düzenle</Button>
              </Link>
              <Button variant="outline-danger" size="sm" onClick={() => handleDelete(c.id)}>
                Sil
              </Button>
            </Card.Footer>
          </Card>
        </Col>
      ))}
    </Row>
  );

  let content;
  if (status === 'loading') {
    content = (
      <div className="text-center py-5">
        <Spinner animation="border" variant="success" />
        <p className="mt-2">Yükleniyor...</p>
      </div>
    );
  } else if (status === 'failed') {
    content = <Alert variant="danger">Hata: {error}</Alert>;
  } else if (filteredCollectors.length === 0) {
    content = <p className="text-muted">Hiç toplayıcı bulunamadı.</p>;
  } else {
    content = (
      <Tabs
        activeKey={viewMode}
        onSelect={(k) => setViewMode(k)}
        id="collector-view-tabs"
        className="mb-3"
      >
        <Tab eventKey="compact" title="Tablo Görünüm">
          {renderTable()}
        </Tab>
        <Tab eventKey="cards" title="Kart Görünüm">
          {renderCards()}
        </Tab>
      </Tabs>
    );
  }

  return (
    <Container fluid>
      <Row className="mb-4">
        <Col>
          <div className="d-flex justify-content-between align-items-center">
            <h1>Toplayıcılar</h1>
            <Link to="/collectors/add">
              <Button variant="success">Yeni Toplayıcı Ekle</Button>
            </Link>
          </div>
        </Col>
      </Row>

      <Row className="mb-4">
        <Col>
          <Card className="shadow-sm">
            <Card.Body>
              <Form onSubmit={handleSearch}>
                <Row>
                  <Col sm={9}>
                    <Form.Control
                      type="text"
                      placeholder="Toplayıcı adına göre ara..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </Col>
                  <Col sm={3}>
                    <div className="d-grid">
                      <Button variant="primary" type="submit">
                        Ara
                      </Button>
                    </div>
                  </Col>
                </Row>
                {searchTerm && (
                  <div className="mt-2">
                    <Button
                      variant="outline-secondary"
                      size="sm"
                      onClick={() => {
                        setSearchTerm('');
                        dispatch(fetchCollectors());
                      }}
                    >
                      Aramayı Temizle
                    </Button>
                  </div>
                )}
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row>
        <Col>
          <Card className="shadow-sm">
            <Card.Body>{content}</Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default CollectorsPage;
