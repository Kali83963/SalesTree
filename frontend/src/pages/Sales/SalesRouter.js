import { Route, Routes } from "react-router-dom";
import Sales from "./Sales";
import SalesReturn from "./SalesReturn";
import PosScreen from "./PosScreen";



export  function SalesRouter(){
    return(
        <>
            <Routes>
                <Route path="/" element={<Sales />}/>
                <Route path="/return" element={<SalesReturn />}/>
                <Route path="/pos" element={<PosScreen />}/>
                <Route path="/*" element={<h1>Not found</h1>}/>
                
            </Routes>

        </>
    )

}