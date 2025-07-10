import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Form, Button, Table, Badge, Spinner, Alert, Tabs, Tab } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchPlants, searchPlants, deletePlant, setCurrentPlant } from '../../features/plants/plantsSlice';
import{ exportToExcel } from '../../utils/Export';

const PlantsPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState('compact'); // 'compact' veya 'detailed'
  const dispatch = useDispatch();
  const { filteredPlants, status, error } = useSelector(state => state.plants);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchPlants());
    }
  }, [status, dispatch]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      dispatch(searchPlants(searchTerm));
    } else {
      dispatch(fetchPlants());
    }
  };
  const handleExport = () => {
  const dataToExport = filteredPlants.map(plant => ({
    AksesyonNo: plant.accessionNumber || '-',
    Adı: plant.name,
    MateryalÇeşidi: plant.materialType || '-',
    Açıklama: plant.description || '-',
    Köken: plant.origin || '-',
    Lokasyon: plant.location || '-',
    Koordinatlar: plant.coordinates || '-',
    ToplanmaTarihi: formatDate(plant.collectionDate),
    Toplayıcı: plant.collectorName || '-',
    ToplayıcıKodu: plant.collectorCode || '-',
    Kategori: plant.category?.name || 'Belirtilmemiş'
  }));

  exportToExcel(dataToExport, "bitkiler");
};


  const handleDelete = (id) => {
    if (window.confirm('Bu bitkiyi silmek istediğinizden emin misiniz?')) {
      dispatch(deletePlant({ id }));
    }
  };

  const handleEdit = (plant) => {
    dispatch(setCurrentPlant(plant));
  };

  const formatDate = (dateString) => {
    if (!dateString) return '-';
    const date = new Date(dateString);
    return date.toLocaleDateString('tr-TR');
  };

  const renderCompactTable = () => (
    <Table responsive hover>
      <thead>
        <tr>
          <th>Aksesyon No</th>
          <th>Adı</th>
          <th>Materyal Çeşidi</th>
          <th>Kategori</th>
          <th>Toplayıcı</th>
          <th>Toplayıcı Kodu</th>
          <th>İşlemler</th>
        </tr>
      </thead>
      <tbody>
        {filteredPlants.map(plant => (
          <tr key={plant.id}>
            <td>{plant.accessionNumber || '-'}</td>
            <td>{plant.name}</td>
            <td>{plant.materialType || '-'}</td>
            <td>
              {plant.category ?
                <Badge bg="info">{plant.category.name}</Badge> :
                <Badge bg="secondary">Belirtilmemiş</Badge>
              }
            </td>
            <td>{plant.collectorName || '-'}</td>
            <td>{plant.collectorCode || '-'}</td>
            <td>
              <Link to={`/plants/edit/${plant.id}`} onClick={() => handleEdit(plant)}>
                <Button variant="outline-primary" size="sm" className="me-2">Düzenle</Button>
              </Link>
              <Button
                variant="outline-danger"
                size="sm"
                onClick={() => handleDelete(plant.id)}
              >
                Sil
              </Button>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );

  const renderDetailedTable = () => (
    <Table responsive hover>
      <thead>
        <tr>
          <th>Aksesyon No</th>
          <th>Adı</th>
          <th>Materyal Çeşidi</th>
          <th>Açıklama</th>
          <th>Köken</th>
          <th>Lokasyon</th>
          <th>Koordinatlar</th>
          <th>Toplanma Tarihi</th>
          <th>Toplayıcı</th>
          <th>Toplayıcı Kodu</th>
          <th>Kategori</th>
          <th>İşlemler</th>
        </tr>
      </thead>
      <tbody>
        {filteredPlants.map(plant => (
          <tr key={plant.id}>
            <td>{plant.accessionNumber || '-'}</td>
            <td>{plant.name}</td>
            <td>{plant.materialType || '-'}</td>
            <td>
              {plant.description && plant.description.length > 50
                ? `${plant.description.substring(0, 50)}...`
                : plant.description || '-'}
            </td>
            <td>{plant.origin || '-'}</td>
            <td>{plant.location || '-'}</td>
            <td>{plant.coordinates || '-'}</td>
            <td>{formatDate(plant.collectionDate)}</td>
            <td>{plant.collectorName || '-'}</td>
            <td>{plant.collectorCode || '-'}</td>
            <td>
              {plant.category ?
                <Badge bg="info">{plant.category.name}</Badge> :
                <Badge bg="secondary">Belirtilmemiş</Badge>
              }
            </td>
            <td>
              <Link to={`/plants/edit/${plant.id}`} onClick={() => handleEdit(plant)}>
                <Button variant="outline-primary" size="sm" className="me-2">Düzenle</Button>
              </Link>
              <Button
                variant="outline-danger"
                size="sm"
                onClick={() => handleDelete(plant.id)}
              >
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
      {filteredPlants.map(plant => (
        <Col key={plant.id}>
          <Card className="h-100 shadow-sm">
            <Card.Header className="d-flex justify-content-between">
              <h5 className="mb-0">{plant.name}</h5>
              <Badge bg="info">{plant.accessionNumber || 'No ID'}</Badge>
            </Card.Header>
            <Card.Body>
              <div className="mb-2">
                <strong>Materyal:</strong> {plant.materialType || '-'}
              </div>
              <div className="mb-2">
                <strong>Köken:</strong> {plant.origin || '-'}
              </div>
              <div className="mb-2">
                <strong>Lokasyon:</strong> {plant.location || '-'}
              </div>
              <div className="mb-2">
                <strong>Koordinatlar:</strong> {plant.coordinates || '-'}
              </div>
              <div className="mb-2">
                <strong>Toplanma Tarihi:</strong> {formatDate(plant.collectionDate)}
              </div>
              <div className="mb-2">
                <strong>Toplayıcı:</strong> {plant.collectorName || '-'}
              </div>
              <div className="mb-2">
                <strong>Toplayıcı Kodu:</strong> {plant.collectorCode || '-'}
              </div>
              <div>
                <strong>Kategori:</strong>{" "}
                {plant.category ?
                  <Badge bg="info">{plant.category.name}</Badge> :
                  <Badge bg="secondary">Belirtilmemiş</Badge>
                }
              </div>
            </Card.Body>
            <Card.Footer className="bg-white">
              <div className="d-flex justify-content-end">
                <Link to={`/plants/edit/${plant.id}`} onClick={() => handleEdit(plant)}>
                  <Button variant="outline-primary" size="sm" className="me-2">Düzenle</Button>
                </Link>
                <Button
                  variant="outline-danger"
                  size="sm"
                  onClick={() => handleDelete(plant.id)}
                >
                  Sil
                </Button>
              </div>
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
    content = (
      <Alert variant="danger">
        Hata: {error}
      </Alert>
    );
  } else if (filteredPlants.length === 0) {
    content = (
      <div className="text-center py-4">
        <p className="text-muted">Hiç bitki bulunamadı.</p>
      </div>
    );
  } else {
    content = (
      <Tabs
        activeKey={viewMode}
        onSelect={(k) => setViewMode(k)}
        id="plants-view-tabs"
        className="mb-3"
      >
        <Tab eventKey="compact" title="Kompakt Görünüm">
          {renderCompactTable()}
        </Tab>
        <Tab eventKey="detailed" title="Detaylı Görünüm">
          {renderDetailedTable()}
        </Tab>
        <Tab eventKey="cards" title="Kart Görünümü">
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
            <h1>Bitkiler</h1>
            <div>
              <Button variant="outline-secondary" className="me-2" onClick={handleExport}>
                Excel'e Aktar
              </Button>
              <Link to="/plants/add">
                <Button variant="success">Yeni Bitki Ekle</Button>
              </Link>
            </div>
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
                      placeholder="Aksesyon Numarası veya Bitki adına göre ara..."
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
                        dispatch(fetchPlants());
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
            <Card.Body>
              {content}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default PlantsPage;