import { useSelector } from "react-redux"
import { Navigate, Outlet, Route, Routes } from "react-router-dom";
import { AccountRouter } from "../pages/Accounts/AccountRouter";
import NotFound from "../pages/NotFound";


function AuthRouter() {
    const auth  = useSelector(state=> state.auth.current );

    return (
      
      <Routes >
            <Route element={<Navigate to="/account/login" replace />} path="/" />
            <Route index path='/account/*' element={<AccountRouter />} />
            <Route path="*" element={<NotFound />} />
      </Routes>
  )
}

export default AuthRouter





