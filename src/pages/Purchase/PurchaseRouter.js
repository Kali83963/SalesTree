import { Route, Routes } from "react-router-dom";
import Purchase from "./Purchase";
import PurchaseReturn from "./PurchaseReturn";



export  function PurchaseRouter(){
    return(
        <>
            <Routes>
                <Route path="/" element={<Purchase />}/>
                <Route path="/return" element={<PurchaseReturn />}/>
                <Route path="/*" element={<h1>Not found</h1>}/>
                
            </Routes>

        </>
    )

}