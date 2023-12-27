import { Route, Routes } from "react-router-dom";
import Purchase from "./Purchase";
import PurchaseReturn from "./PurchaseReturn";
import AddPurchaseForm from "./AddPurchaseForm";
import AddPurchaseReturnForm from "./AddPurchaseReturnForm";



export  function PurchaseRouter(){
    return(
        <>
            <Routes>
                <Route path="/" element={<Purchase />}/>
                <Route path="/add" element={<AddPurchaseForm />}/>
                <Route path="/return" element={<PurchaseReturn />}/>
                <Route path="/return/add" element={<AddPurchaseReturnForm />}/>
                <Route path="/*" element={<h1>Not found</h1>}/>
            </Routes>

        </>
    )

}