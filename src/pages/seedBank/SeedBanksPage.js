import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Form, Button, Table, Badge, Spinner, Alert, Tabs, Tab } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchSeedBanks, searchSeedBanks, deleteSeedBank, setCurrentSeedBank } from '../../features/seedBanks/seedBanksSlice';
import { exportToExcel } from '../../utils/Export';

const SeedBanksPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState('compact');
  const dispatch = useDispatch();
  const { filteredSeedBanks, status, error } = useSelector(state => state.seedBanks);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchSeedBanks());
    }
  }, [status, dispatch]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      dispatch(searchSeedBanks(searchTerm));
    } else {
      dispatch(fetchSeedBanks());
    }
  };
  const handleExport = () => {
    const dataToExport = filteredSeedBanks.map(seedBank => ({
      AksesyonNo: seedBank.accessionNumber || '-',
      Adı: seedBank.name,
      Bitki: seedBank.plantName || '-',
      Açıklama: seedBank.description || '-',
      Miktar: seedBank.quantity || '-',
      Dolap: seedBank.storageCabinet || '-',
    }));

    exportToExcel(dataToExport,"tohum_bankalari");
  };

  const handleDelete = (id) => {
    if (window.confirm('Bu tohum bankasını silmek istediğinizden emin misiniz?')) {
      dispatch(deleteSeedBank({ id }));
    }
  };

  const handleEdit = (seedBank) => {
    dispatch(setCurrentSeedBank(seedBank));
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
          <th>Adı</th>
          <th>Bitki</th>
          <th>Aksesyon No</th>
          <th>Adet</th>
          <th>Dolap</th>
          <th>İşlemler</th>
        </tr>
      </thead>
      <tbody>
        {filteredSeedBanks.map(sb => (
          <tr key={sb.id}>
            <td>{sb.name}</td>
            <td>{sb.plantName}</td>
            <td>{sb.accessionNumber}</td>
            <td>{sb.quantity}</td>
            <td>{sb.storageCabinet}</td>
            <td>
              <Link to={`/seedbanks/edit/${sb.id}`} onClick={() => handleEdit(sb)}>
                <Button variant="outline-primary" size="sm" className="me-2">Düzenle</Button>
              </Link>
              <Button
                variant="outline-danger"
                size="sm"
                onClick={() => handleDelete(sb.id)}
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
      {filteredSeedBanks.map(sb => (
        <Col key={sb.id}>
          <Card className="h-100 shadow-sm">
            <Card.Header className="d-flex justify-content-between">
              <h5 className="mb-0">{sb.name}</h5>
              <Badge bg="info">{sb.accessionNumber}</Badge>
            </Card.Header>
            <Card.Body>
              <div className="mb-2">
                <strong>Bitki:</strong> {sb.plantName}
              </div>
              <div className="mb-2">
                <strong>Miktar:</strong> {sb.quantity}
              </div>
              <div className="mb-2">
                <strong>Dolap:</strong> {sb.storageCabinet}
              </div>
              <div className="mb-2">
                <strong>Açıklama:</strong> {sb.description || '-'}
              </div>
              <div className="mb-2">
                <strong>Oluşturulma:</strong> {formatDate(sb.createdDate)}
              </div>
              <div className="mb-2">
                <strong>Güncelleme:</strong> {formatDate(sb.updatedDate)}
              </div>
            </Card.Body>
            <Card.Footer className="bg-white d-flex justify-content-end">
              <Link to={`/seedbanks/edit/${sb.id}`} onClick={() => handleEdit(sb)}>
                <Button variant="outline-primary" size="sm" className="me-2">Düzenle</Button>
              </Link>
              <Button variant="outline-danger" size="sm" onClick={() => handleDelete(sb.id)}>
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
  } else if (filteredSeedBanks.length === 0) {
    content = <p className="text-muted">Hiç tohum bankası bulunamadı.</p>;
  } else {
    content = (
      <Tabs
        activeKey={viewMode}
        onSelect={(k) => setViewMode(k)}
        id="seedbank-view-tabs"
        className="mb-3"
      >
        <Tab eventKey="compact" title="Tablo Görünüm">
          {renderCompactTable()}
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
            <h1>Tohum Bankaları</h1>
            <div>
              <Button variant="outline-secondary" className="me-2" onClick={handleExport}>
                Excel'e Aktar
              </Button>
              <Link to="/seedbanks/add">
                <Button variant="success">Yeni Tohum Bankası Ekle</Button>
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
                      placeholder="Aksesyon Numarası veya Tohum bankası adına göre ara..."
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
                        dispatch(fetchSeedBanks());
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

export default SeedBanksPage;
