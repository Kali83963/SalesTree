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
import { useState } from 'react';
import RequireAuth from './RequireAuth';
import NoAuth from './NoAuth';


function App() {

  // const isAuthenticated = useSelector(state => state.global.token )
  const islogin = localStorage.getItem('token');

  console.log(!islogin)


  return (

    <div className="App">

      
          <Routes>
              <Route element={<NoAuth /> }>
                <Route index path='/account/*' element={<AccountRouter />} />
              </Route>
          
      
       
            <Route element={<RequireAuth />} >
              <Route element={<MainLayout />}>
                <Route index path='/*' element={ <MainRouter />} />
                <Route path='/products/*' element={ <ProductRouter />} />
                <Route path='/purchase/*' element={ <PurchaseRouter />} />
                <Route path='/people/*' element={ <PeopleRouter />} />
                <Route path='/expense/*' element={ <ExpenseRouter />} />
                <Route path='/sales/*' element={ <SalesRouter />} />
                <Route path='/settings/*' element={ <SettingsRouter />} />
              </Route>
            </Route>
            <Route path="/*" element={<h1>Not found</h1>}/>
          </Routes>
          

    </div>
  );
}


export default App;
