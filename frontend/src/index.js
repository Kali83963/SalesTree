import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { PersistGate } from 'redux-persist/integration/react'
import { presistor,store } from './redux/store';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={presistor}>
      <BrowserRouter>
        <GoogleOAuthProvider clientId="508813401898-m20ibckpvvrnbt4ledcj62lgp18d6odb.apps.googleusercontent.com" >
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <App />
          </LocalizationProvider>
          <ToastContainer position='top-right' />
        </GoogleOAuthProvider>
      </BrowserRouter>
      </PersistGate>
    </Provider>
  </React.StrictMode>
);

