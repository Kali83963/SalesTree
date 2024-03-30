import { useSelector } from "react-redux"
import { Navigate, Outlet } from "react-router-dom";

function NoAuth() {
    const auth  = useSelector(state=> state.auth.current );
    const token = false;
    return (
      auth?.user ? 
      <Navigate to='dashboard' /> : <Outlet />
  )
}

export default NoAuth





