import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { Provider } from 'react-redux';
import store from './store';
import { useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>

        <GoogleOAuthProvider clientId="508813401898-m20ibckpvvrnbt4ledcj62lgp18d6odb.apps.googleusercontent.com" >
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <App />
          </LocalizationProvider>
          <ToastContainer position='top-right' />
        </GoogleOAuthProvider>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);

