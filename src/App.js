import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, NavLink, Navigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from './features/auth/authSlice';
import { setAuthToken } from './api/authApi';

import PrivateRoute from './components/PrivateRoute';
import DashboardPage from './pages/DashboardPage';
import AddPlantPage from './pages/plants/AddPlantPage';
import AddSeedBankPage from './pages/seedBank/AddSeedBankPage';
import EditPlantPage from './pages/plants/EditPlantPage';
import EditSeedBankPage from './pages/seedBank/EditSeedBankPage';
import PlantsPage from './pages/plants/PlantsPage';
import SeedBanksPage from './pages/seedBank/SeedBanksPage';
import LoginPage from './pages/auth/LoginPage';
import RegisterPage from './pages/auth/RegisterPage';
import CollectorsPage from './pages/collectors/CollectorsPage';
import AddCollectorPage from './pages/collectors/AddCollectorPage';
import EditCollectorPage from './pages/collectors/EditCollectorPage';

function App() {
  const { isAuthenticated, token } = useSelector(state => state.auth);
  const dispatch = useDispatch();


  useEffect(() => {
    if (token) {
      setAuthToken(token);
    }
  }, [token]);

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <Router>
      <div className="app">
        <header className="header">
          <h1>Green Vault</h1>
          {isAuthenticated && (
          <nav className="nav">
            <NavLink to="/" className={({ isActive }) => isActive ? "active" : ""}>
              Kontrol Paneli
            </NavLink>
            <NavLink to="/plants" className={({ isActive }) => isActive ? "active" : ""}>
              Bitkiler
            </NavLink>
            <NavLink to="/seedbanks" className={({ isActive }) => isActive ? "active" : ""}>
              Tohum Bankası
            </NavLink>
            <NavLink to="/collectors" className={({ isActive }) => isActive ? "active" : ""}>
              Toplayıcı Defteri
            </NavLink>
              <a onClick={handleLogout} className="logout-btn">Çıkış Yap</a>
          </nav>
          ) }
        </header>

        <div className="container">
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/" element={
              <PrivateRoute>
                <DashboardPage />
              </PrivateRoute>
            } />
            <Route path="/plants" element={
              <PrivateRoute>
                <PlantsPage />
              </PrivateRoute>
            } />
            <Route path="/plants/add" element={
              <PrivateRoute>
                <AddPlantPage />
              </PrivateRoute>
            } />
            <Route path="/plants/edit/:id" element={
              <PrivateRoute>
                <EditPlantPage />
              </PrivateRoute>
            } />
            <Route path="/seedbanks" element={
              <PrivateRoute>
                <SeedBanksPage />
              </PrivateRoute>
            } />
            <Route path="/seedbanks/add" element={
              <PrivateRoute>
                <AddSeedBankPage />
              </PrivateRoute>
            } />
            <Route path="/seedbanks/edit/:id" element={
              <PrivateRoute>
                <EditSeedBankPage />
              </PrivateRoute>
            } />
             <Route path="/collectors" element={
              <PrivateRoute>
                <CollectorsPage />
              </PrivateRoute>
            } />
            <Route path="/collectors/add" element={
              <PrivateRoute>
                <AddCollectorPage />
              </PrivateRoute>
            } />
            <Route path="/collectors/edit/:id" element={
              <PrivateRoute>
                <EditCollectorPage />
              </PrivateRoute>
            } />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;