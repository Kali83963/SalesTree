import './App.css';


import { Routes,Route, useNavigate } from 'react-router-dom';
import { MainRouter } from './pages/dashboard/MainRouter';
import { ProductRouter } from './pages/Products/ProductRouter';
import { PurchaseRouter } from './pages/Purchase/PurchaseRouter';
import { PeopleRouter } from './pages/People/PeopleRouter';
import { ExpenseRouter } from './pages/Expense/ExpenseRouter';
import { SalesRouter } from './pages/Sales/SalesRouter';
import { SettingsRouter } from './pages/Settings/SettingsRouter';
import { AccountRouter } from './pages/Accounts/AccountRouter';
import MainLayout from './MainLayout';
import { useEffect } from 'react';


function App() {

  const isAutenticated = localStorage.getItem('isLogin')

  const navigate = useNavigate()

  // useEffect(() => {
  //   if (isAutenticated !== null) {
  //     navigate('/');
  //   }
  // }, [isAutenticated]);

  if(isAutenticated === null){
    return(
      <div className='h-screen'>
        
          <Routes>
              <Route path='/account/*' element={<AccountRouter />} />
          </Routes>
        
      </div>
    );
  }


  return (

    <div className="App">
      
       
           <Routes>
            <Route element={<MainLayout />}>
              <Route index path='/*' element={ <MainRouter />} />
              <Route path='/products/*' element={ <ProductRouter />} />
              <Route path='/purchase/*' element={ <PurchaseRouter />} />
              <Route path='/people/*' element={ <PeopleRouter />} />
              <Route path='/expense/*' element={ <ExpenseRouter />} />
              <Route path='/sales/*' element={ <SalesRouter />} />
              <Route path='/settings/*' element={ <SettingsRouter />} />
            </Route>
          </Routes>

    </div>
  );
}

export default App;
