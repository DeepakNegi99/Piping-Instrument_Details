import React from 'react';
import { Layout, Menu } from 'antd';
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import RequestForm from './pages/RequestForm';
import Workflow from './pages/Workflow';
import Scanner from './pages/Scanner';
import Contact from './pages/Contact';

const { Header, Content, Sider } = Layout;

const App: React.FC = () => {
  const navigate = useNavigate();
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider breakpoint="lg" collapsedWidth="0">
        <div style={{ color: 'white', padding: 16, fontWeight: 700 }}>Deepak's Chemicals</div>
        <Menu
          theme="dark"
          mode="inline"
          onClick={(e) => navigate(e.key)}
          items={[
            { key: '/dashboard', label: 'Dashboard' },
            { key: '/request', label: 'New/Update Request' },
            { key: '/workflow', label: 'Workflow' },
            { key: '/scanner', label: 'QR / Upload' },
            { key: '/contact', label: 'Contact' }
          ]}
        />
      </Sider>
      <Layout>
        <Header style={{ background: '#fff', padding: 0 }} />
        <Content style={{ margin: '16px' }}>
          <Routes>
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/request" element={<RequestForm />} />
            <Route path="/workflow" element={<Workflow />} />
            <Route path="/scanner" element={<Scanner />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="*" element={<div>Not found</div>} />
          </Routes>
        </Content>
      </Layout>
    </Layout>
  );
};

export default App;
