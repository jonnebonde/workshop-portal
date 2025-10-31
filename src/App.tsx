import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import CaseDetail from './pages/CaseDetail';
import NewsPage from './pages/NewsPage';
import SettingsPage from './pages/SettingsPage';
import NewCasePage from './pages/NewCasePage';
import Layout from './components/Layout';
import { AuthProvider } from './context/AuthContext';
import './index.css';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={
            <Layout>
              <Dashboard />
            </Layout>
          } />
             <Route path="/new-case" element={
            <Layout>
              <NewCasePage />
            </Layout>
          } />
          <Route path="/news" element={
            <Layout>
              <NewsPage />
            </Layout>
          } />
          <Route path="/settings" element={
            <Layout>
              <SettingsPage />
            </Layout>
          } />
       
          <Route path="/cases/:id" element={
            <Layout>
              <CaseDetail />
            </Layout>
          } />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;