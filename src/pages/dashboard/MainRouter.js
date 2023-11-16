import { Route, Routes } from "react-router-dom";
import DashBoard from "./dashboard";



export  function MainRouter(){
    return(
        <>
            <Routes>
                <Route path="/" element={<DashBoard />}/>
                <Route path="/*" element={<h1>Not found</h1>}/>
            </Routes>

        </>
    )

}