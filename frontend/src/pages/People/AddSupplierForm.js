import React, { useState } from "react";
import "./adduserform.css";
import { useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import SelectInput from "../../global/SelectInput";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import { useParams } from "react-router-dom";


function AddSupplierForm() {
//   let {id} = useParams()
//   var user;
//   if(id){
//     user = getUserById(id,data);
//   }
    var user = null;
    const [showPassword, setPassword] = useState(false);
    const [imagePreview, setImagePreview] = useState(null);
    const [isCountriesLoading, setCountryLoadinig] = useState(false);
    const countriesRef = useRef([]);

    const { register, handleSubmit, reset, getValues,setValue, formState, control } =useForm({
    defaultValues: user ? user : {} 
    });

    useEffect(function () {
    async function fetchData() {
        setCountryLoadinig(true);
        try {
        const response = await fetch("https://restcountries.com/v3.1/all");
        const data = await response.json();

        const countries = data.map((country) => country.name.common);
        countriesRef.current = countries;
        setCountryLoadinig(false);
        } catch (error) {
        setCountryLoadinig(false);
        console.error("Error fetching data:", error);
        }
    }

    // Call the async function
    fetchData();
    }, []);

    function onSubmitLogin(data) {
    console.log(data);
    }
  return (
    <>
    <div className="px-4 py-6 text-sm">
        <div className="flex item-center justify-between">
          <div className="text-start">
            <h2 className="text-lg text-primary font-semibold">Add Users</h2>
            <span className="text-sm">Add/Update User</span>
          </div>
        </div>

        <div className="bg-white rounded-md mt-6 p-5 shadow-md">
          <form className="w-full grid md:grid-cols-2 lg:grid-cols-4 gap-4" onSubmit={handleSubmit(onSubmitLogin)}>
            <div className="flex flex-col items-start justify-start gap-1 mt-5">
              <label
                htmlFor="name"
                className='text-sm after:content-["*"] after:text-red-600'
              >
                Supplier Name
              </label>
              <div className="relative w-full">
                <input
                  id="name"
                  type="text"
                  placeholder="Name"
                  className="bg-[#F5F7F9] p-3 text-sm border-[#E5E5E5] rounded-md w-full outline-none"
                  required={true}
                  {...register("supplier_name", {
                    required: "This field is required",
                  })}
                />
              </div>
            </div>
            <div className="flex flex-col items-start gap-1 mt-6">
              <label htmlFor="phone_no" className="text-sm">
                Contact Number
              </label>
              <div className="relative w-full">
                <input
                  id="phone_no"
                  type="text"
                  className="bg-[#F5F7F9] p-3 text-sm border-[#E5E5E5] rounded-md w-full outline-none"
                  placeholder="+00xxx"
                  {...register("phone_no", {
                    required: "This field is required",
                  })}
                />
              </div>
            </div>
            <div className="flex flex-col items-start gap-1 mt-6">
              <label
                htmlFor="location"
                className='after:content-["*"] after:text-red-600 text-sm'
              >
                Country
              </label>
              <div className="relative w-full">
                <SelectInput
                  data={countriesRef.current}
                  control={control}
                  name="country"
                  {...register("country", {
                    required: "This field is required",
                  })}
                />
              </div>
            </div>
            <div className="flex flex-col items-start gap-1 mt-6">
              <label
                htmlFor="location"
                className='after:content-["*"] after:text-red-600 text-sm'
              >
                City
              </label>
              <div className="relative w-full">
                <SelectInput
                  data={countriesRef.current}
                  control={control}
                  name="country"
                  {...register("country", {
                    required: "This field is required",
                  })}
                />
              </div>
            </div>
            
            <div className="flex gap-4">
              <button className="bg-primary flex items-center text-sm text-white rounded-md px-8 py-3 shadow-md">Save</button>
              <button className="bg-white text-primary border text-sm rounded-md border-primary px-8 py-3 shadow-md">Cancel</button>
            </div>
          </form>
        </div>
      </div>
      
    </>
  )
}

export default AddSupplierForm