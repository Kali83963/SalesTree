import { Navigate, Route, Routes } from "react-router-dom";
import { lazy } from 'react';

const Dashboard = lazy(() => import("./dashboard"));




export  function MainRouter(){
    return(
        <>
            <Routes>
                <Route path="/" element={<Navigate to='/dashboard' replace/>}/>
                <Route path="/dashboard" element={<Dashboard />}/>
            </Routes>

        </>
    )

}