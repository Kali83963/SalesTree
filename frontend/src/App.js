import './App.css';


import { Routes,Route, useNavigate, Navigate, useLocation } from 'react-router-dom';
import { MainRouter } from './pages/Dashboard/MainRouter';
import { ProductRouter } from './pages/Products/ProductRouter';
import { PurchaseRouter } from './pages/Purchase/PurchaseRouter';
import { PeopleRouter } from './pages/People/PeopleRouter';
import { ExpenseRouter } from './pages/Expense/ExpenseRouter';
import { SalesRouter } from './pages/Sales/SalesRouter';
import { SettingsRouter } from './pages/Settings/SettingsRouter';
import { AccountRouter } from './pages/Accounts/AccountRouter';
import MainLayout from './MainLayout';

import 'react-toastify/dist/ReactToastify.css';
import { useSelector } from 'react-redux';
import { Suspense, useState } from 'react';
import RequireAuth from './routes/AppRouter';
import NoAuth from './routes/AuthRouter';
import PageLoader from './components/PageLoader/PageLoader';
import DefaultApp from './DefaultApp';


function App() {


  return (
    <Suspense fallback={<PageLoader /> }>
      <DefaultApp />
    </Suspense>
  );
}


export default App;
