import { BrowserRouter as Router, Route, Navigate, Routes } from 'react-router-dom';

import './App.css';
import { AuthProvider } from './contexts/AuthContext';
import HomePage from './components/HomePage/HomePage';
import LoginPage from './components/LoginPage/LoginPage';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';


function App() {
  return (
    <Router>
      <AuthProvider>
        {/* set nav here */}
        <Routes>
          <Route
              path="/"
              element={
                  <PrivateRoute>
                      <HomePage />
                  </PrivateRoute>
              }
          />
          <Route path="/login" element={<LoginPage />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
