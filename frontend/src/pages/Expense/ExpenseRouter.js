import { Route, Routes } from "react-router-dom";
import { lazy } from 'react';

const Expense = lazy(() => import("./Expense"));
const ExpenseCategory = lazy(() => import("./ExpenseCategory"));




export  function ExpenseRouter(){
    return(
        <>
            <Routes>
                <Route path="/" element={<Expense />}/>
                <Route path="/category" element={<ExpenseCategory />}/>          
            </Routes>

        </>
    )

}