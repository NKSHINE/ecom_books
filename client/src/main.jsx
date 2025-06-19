import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { GoogleOAuthProvider } from '@react-oauth/google';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <GoogleOAuthProvider clientId="565392660339-p215j7bd4pmo68bj5urpe4plh0rnsnhc.apps.googleusercontent.com">
    <App />
  </GoogleOAuthProvider>
);
