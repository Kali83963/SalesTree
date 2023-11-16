import { Route, Routes } from "react-router-dom";
import Expense from "./Expense";
import ExpenseCategory from "./ExpenseCategory";



export  function ExpenseRouter(){
    return(
        <>
            <Routes>
                <Route path="/" element={<Expense />}/>
                <Route path="/category" element={<ExpenseCategory />}/>
                <Route path="/*" element={<h1>Not found</h1>}/>                
            </Routes>

        </>
    )

}