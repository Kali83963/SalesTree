import { Route, Routes } from "react-router-dom";
import { lazy } from 'react';

const Purchase = lazy(() => import("./Purchase"));
const PurchaseReturn = lazy(() => import("./PurchaseReturn"));
const AddPurchaseForm = lazy(() => import("./AddPurchaseForm"));
const AddPurchaseReturnForm = lazy(() => import("./AddPurchaseReturnForm"));


export  function PurchaseRouter(){
    return(
        <>
            <Routes>
                <Route path="/" element={<Purchase />}/>
                <Route path="/add" element={<AddPurchaseForm />}/>
                <Route path="/return" element={<PurchaseReturn />}/>
                <Route path="/return/add" element={<AddPurchaseReturnForm />}/>
            </Routes>

        </>
    )

}