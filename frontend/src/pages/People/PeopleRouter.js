import { Route, Routes } from "react-router-dom";

import { useState } from "react";
import { lazy } from 'react';

const ManageUsers = lazy(() => import("./ManageUsers"));
const Customer = lazy(() => import("./Customer"));
const Supplier = lazy(() => import("./Supplier"));
const AddUserForm = lazy(() => import("./AddUserForm"));
const AddSupplierForm = lazy(() => import("./AddSupplierForm"));




export  function PeopleRouter(){
    


    return(
        <>
            <Routes>
                <Route path="/manageuser" element={<ManageUsers />}/>
                <Route path="/user/add" element={<AddUserForm entity={`user/create`}  />}/>
                <Route path="/user/edit/:id" element={<AddUserForm entity={`user`} isEditing={true} />}/>
                <Route path="/customer" element={<Customer />}/>
                <Route path="/supplier" element={<Supplier />}/>
                <Route path="/supplier/add" element={<AddSupplierForm  />}/>
                <Route path="/supplier/edit/:id" element={<AddSupplierForm  />}/>
                <Route path="/*" element={<h1>Not found</h1>}/>                
            </Routes>

        </>
    )

}