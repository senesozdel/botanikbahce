import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchItemsAsync, deleteItemAsync } from '../features/items/itemsSlice';

function HomePage() {
  const dispatch = useDispatch();
  const { items, status, error } = useSelector(state => state.items);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchItemsAsync());
    }
  }, [status, dispatch]);

  const handleDelete = (id) => {
    if (window.confirm('Bu öğeyi silmek istediğinizden emin misiniz?')) {
      dispatch(deleteItemAsync(id));
    }
  };

  let content;

  if (status === 'loading') {
    content = <div>Yükleniyor...</div>;
  } else if (status === 'succeeded') {
    content = (
      <div className="item-list">
        {items.length === 0 ? (
          <p>Kayıtlı öğe bulunmuyor.</p>
        ) : (
          items.map(item => (
            <div key={item.id} className="item-card">
              <div>
                <h3>{item.title}</h3>
                <p>{item.body}</p>
              </div>
              <div className="buttons">
                <Link to={`/edit/${item.id}`}>
                  <button>Düzenle</button>
                </Link>
                <button 
                  className="delete-btn" 
                  onClick={() => handleDelete(item.id)}
                >
                  Sil
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    );
  } else if (status === 'failed') {
    content = <div>Hata: {error}</div>;
  }

  return (
    <div>
      <h2>Öğe Listesi</h2>
      {content}
    </div>
  );
}

export default HomePage;