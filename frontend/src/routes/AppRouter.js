import { useDispatch, useSelector } from "react-redux"
import { Navigate, Outlet, Route, Routes } from "react-router-dom";
import MainLayout from "../MainLayout";
import { MainRouter } from "../pages/Dashboard/MainRouter";
import { ProductRouter } from "../pages/Products/ProductRouter";
import { PurchaseRouter } from "../pages/Purchase/PurchaseRouter";
import { PeopleRouter } from "../pages/People/PeopleRouter";
import { ExpenseRouter } from "../pages/Expense/ExpenseRouter";
import { SalesRouter } from "../pages/Sales/SalesRouter";
import { SettingsRouter } from "../pages/Settings/SettingsRouter";
import NotFound from "../pages/NotFound";



function AppRouter() {
  console.log("HERE")
    // const token = localStorage.getItem('token')
    // console.log(token)

  return (
    // auth?.user?.jwt ? <Outlet />:
    // <Navigate to='account/login' />
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
      <Route path="/*" element={<NotFound />}/>
    </Routes>
  )
}

export default AppRouter