import { useDispatch, useSelector } from "react-redux"
import { Navigate, Outlet } from "react-router-dom";



function RequireAuth() {

    // const {token} = useSelector(state=> state.global);
    const token = localStorage.getItem('token')
    // console.log(token)

  return (
    token ? <Outlet />:
    <Navigate to='account/login' />
  )
}

export default RequireAuth