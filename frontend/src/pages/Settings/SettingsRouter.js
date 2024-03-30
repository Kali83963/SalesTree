

import { Route, Routes } from "react-router-dom";
import LocationScreen from "./LocationScreen";
import TaxScreen from "./TaxRateScreen";
import AddTaxRate from "./AddTaxRate";
import UpdateProfile from "./UpdateProfile";




export  function SettingsRouter(){
    return(
        <>
            <Routes>
                <Route path="/" element={<LocationScreen />}/>
                <Route path="/location/add" element={<LocationScreen />}/>
                <Route path="/tax" element={<TaxScreen />}/>
                <Route path="/tax/add" element={<AddTaxRate />}/>
                <Route path="/profile" element={<UpdateProfile />}/>
                <Route path="/*" element={<h1>Not found</h1>}/>
                
            </Routes>

        </>
    )

}