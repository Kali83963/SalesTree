

import { Route, Routes } from "react-router-dom";
import { lazy } from 'react';

const LocationScreen = lazy(() => import("./LocationScreen"));
const TaxRateScreen = lazy(() => import("./TaxRateScreen"));
const AddTaxRate = lazy(() => import("./AddTaxRate"));
const UpdateProfile = lazy(() => import("./UpdateProfile"));




export  function SettingsRouter(){
    return(
        <>
            <Routes>
                <Route path="/" element={<LocationScreen />}/>
                <Route path="/location/add" element={<LocationScreen />}/>
                <Route path="/tax" element={<TaxRateScreen />}/>
                <Route path="/tax/add" element={<AddTaxRate />}/>
                <Route path="/profile" element={<UpdateProfile />}/>
            </Routes>

        </>
    )

}