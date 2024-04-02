import { Route, Routes } from "react-router-dom";
import { lazy } from 'react';

const Sales = lazy(() => import("./Sales"));
const SalesReturn = lazy(() => import("./SalesReturn"));
const PosScreen = lazy(() => import("./PosScreen"));



export  function SalesRouter(){
    return(
        <>
            <Routes>
                <Route path="/" element={<Sales />}/>
                <Route path="/return" element={<SalesReturn />}/>
                <Route path="/pos" element={<PosScreen />}/>
            </Routes>

        </>
    )

}