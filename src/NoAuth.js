import { useSelector } from "react-redux"
import { Navigate, Outlet } from "react-router-dom";

function NoAuth() {
    const {token} = useSelector(state=> state.global);
    return (
      token ? 
      <Navigate to='dashboard' /> : <Outlet />
  )
}

export default NoAuth





