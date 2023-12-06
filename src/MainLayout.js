import { Outlet } from "react-router-dom"
import SideBar from "./global/Sidebar";
import TopBar from "./global/TopBar"
import { useSelector } from "react-redux";
import { useEffect } from "react";

function MainLayout() {
  const sidebarShow = useSelector(state => state.global.sidebarShow);
  
  
  return (
    <>
        <SideBar />
        <main className={`${sidebarShow ? "md:ml-56" : "md:ml-14"}`}>
            <TopBar />
            <Outlet />
        </main>
    </>
  )
}

export default MainLayout