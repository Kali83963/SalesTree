import { Outlet } from "react-router-dom"
import SideBar from "./global/SideBar"
import TopBar from "./global/TopBar"

function MainLayout() {
  return (
    <>
        <SideBar />
        <main>
            <TopBar />
            <Outlet />
        </main>
    </>
  )
}

export default MainLayout