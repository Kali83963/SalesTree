import { Route, Routes } from "react-router-dom";

import DummyData from './users.json';
import { useState } from "react";
import { lazy } from 'react';

const ManageUsers = lazy(() => import("./ManageUsers"));
const Customer = lazy(() => import("./Customer"));
const Supplier = lazy(() => import("./Supplier"));
const AddUserForm = lazy(() => import("./AddUserForm"));
const AddSupplierForm = lazy(() => import("./AddSupplierForm"));




export  function PeopleRouter(){
    const data = DummyData.slice(0,100);
    const [userData,setUserData] = useState(data);


    return(
        <>
            <Routes>
                <Route path="/manageuser" element={<ManageUsers data={userData} />}/>
                <Route path="/user/add" element={<AddUserForm data={userData} onAddUser={setUserData} />}/>
                <Route path="/user/edit/:id" element={<AddUserForm data={userData} onAddUser={setUserData} />}/>
                <Route path="/customer" element={<Customer />}/>
                <Route path="/supplier" element={<Supplier />}/>
                <Route path="/supplier/add" element={<AddSupplierForm data={userData} onAddUser={setUserData} />}/>
                <Route path="/supplier/edit/:id" element={<AddSupplierForm data={userData} onAddUser={setUserData} />}/>
                <Route path="/*" element={<h1>Not found</h1>}/>                
            </Routes>

        </>
    )

}