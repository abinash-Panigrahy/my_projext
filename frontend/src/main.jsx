import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { GoogleOAuthProvider } from '@react-oauth/google';
import './index.css';

const clientId = '170603790629-11gtdv7es7o0rep5hu8u4cebjn8o2f8r.apps.googleusercontent.com';

ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
    <GoogleOAuthProvider clientId={clientId}>
      <AuthProvider> {/* <-- FIX: Added AuthProvider wrapper */}
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </AuthProvider>
    </GoogleOAuthProvider>
  // {/* </React.StrictMode> */}
);
