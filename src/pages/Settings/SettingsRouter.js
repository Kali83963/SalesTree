

import { Route, Routes } from "react-router-dom";
import LocationScreen from "./LocationScreen";
import TaxScreen from "./TaxRateScreen";




export  function SettingsRouter(){
    return(
        <>
            <Routes>
                <Route path="/" element={<LocationScreen />}/>
                <Route path="/tax" element={<TaxScreen />}/>
                <Route path="/*" element={<h1>Not found</h1>}/>
                
            </Routes>

        </>
    )

}