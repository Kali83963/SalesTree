import { useDispatch, useSelector } from "react-redux"
import { Navigate, Outlet } from "react-router-dom";



function RequireAuth() {

    const auth = useSelector(state=> state.auth.current);
    // const token = localStorage.getItem('token')
    // console.log(token)

  return (
    auth?.user?.jwt ? <Outlet />:
    <Navigate to='account/login' />
  )
}

export default RequireAuth