import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import Header from './components/Layout/Header';
import Footer from './components/Layout/Footer';
import Home from './pages/Home';
import About from './pages/About';
import NunnyRegister from './components/Auth/NunnyRegister';
import ClientRegister from './components/Auth/ClientRegister';
import Login from './components/Auth/Login';
import NunnyDashboard from './components/Dashboard/NunnyDashboard';
import ClientDashboard from './components/Dashboard/ClientDashboard';
import LoadingSpinner from './components/Common/LoadingSpinner';

// Protected Route Component
const ProtectedRoute: React.FC<{ children: React.ReactNode; userType?: 'nunny' | 'client' }> = ({ 
  children, 
  userType 
}) => {
  const { isAuthenticated, user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  if (userType && user && 'type' in user && user.type !== userType) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

// Public Route Component (redirect if authenticated)
const PublicRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated, user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (isAuthenticated && user && 'type' in user) {
    const dashboardPath = user.type === 'nunny' ? '/nunny/dashboard' : '/client/dashboard';
    return <Navigate to={dashboardPath} replace />;
  }

  return <>{children}</>;
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen flex flex-col">
          <Header />
          <main className="flex-1">
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              
              {/* Authentication Routes */}
              <Route 
                path="/nunny/register" 
                element={
                  <PublicRoute>
                    <NunnyRegister />
                  </PublicRoute>
                } 
              />
              <Route 
                path="/client/register" 
                element={
                  <PublicRoute>
                    <ClientRegister />
                  </PublicRoute>
                } 
              />
              <Route 
                path="/nunny/login" 
                element={
                  <PublicRoute>
                    <Login />
                  </PublicRoute>
                } 
              />
              <Route 
                path="/client/login" 
                element={
                  <PublicRoute>
                    <Login />
                  </PublicRoute>
                } 
              />
              
              {/* Protected Dashboard Routes */}
              <Route 
                path="/nunny/dashboard" 
                element={
                  <ProtectedRoute userType="nunny">
                    <NunnyDashboard />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/client/dashboard" 
                element={
                  <ProtectedRoute userType="client">
                    <ClientDashboard />
                  </ProtectedRoute>
                } 
              />
              
              {/* Catch all route */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;