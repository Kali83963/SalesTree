import React, { useRef, useState } from "react";
import "./adduserform.css";
import { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import SelectInput from "../../global/SelectInput";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import { useParams } from "react-router-dom";
import Loading from "../../components/Loading/Loading";
import FileInput from "../../components/FileInput/FileInput";
import {
  useNavigate,
} from 'react-router-dom';
import useEntityForm from "../../Hooks/useEntityForm";

function AddUserForm({ entity, isEditing }) {
  let { id } = useParams();
  const [showPassword, setPassword] = useState(false);

  const { result, onSubmit, isLoading, isSuccess } = useEntityForm({  entity, id, isEditing });


  
  const navigate = useNavigate();
  const { register, handleSubmit, reset, setValue, control } = useForm({
    // defaultValues: {
    //   name: "",
    //   email: "",
    //   role: "",
    //   address: "",
    //   status: "",
    //   password: "",
    //   file: "",
    // },
    values:result || null
  });


  
// // Get Request
//   useEffect(() => {
//     const fetchData = async () => {
//       const response = await request.get({ entity: entity + "/" + id, token });
//       const data = response;
//       reset(data);
//     };
    
//     if (id) {
//       fetchData();
//     }
//   }, [id, user]);

//   // Create Request

//   const createRequest = async (data) => {
//     return await request.createAndUpload({
//       entity: entity,
//       token:token,
//       jsonData: data,
//     });
//   };

//   // Patch Request

//   const patchRequest = async (data) => {
//     return await request.upload({
//       entity:entity,
//       token:token,
//       id:id,
//       jsonData:data
//     })
//   }

//   // On Sumbit Check condition and then call function 

//   function onSubmit(data) {
//     if(!isEditing){
//       const callback = createRequest(data);
//       onRequest(callback);
//     }else{
//       const callback = patchRequest(data);
//       onRequest(callback);
//     }
      
//   }

  // success move 

  useEffect(
    function () {
      if (isSuccess && isEditing) {
        navigate(-1);
        
      }else if(isSuccess){
        reset();
      }

    },
    [isSuccess]
  );

  return (
    <>
      <Loading isLoading={isLoading}>
        <div className="px-4 py-6 text-sm">
          <div className="flex item-center justify-between">
            <div className="text-start">
              <h2 className="text-lg text-primary font-semibold">Add Users</h2>
              <span className="text-sm">Add/Update User</span>
            </div>
          </div>

          <div className="bg-white rounded-md mt-6 p-5 shadow-md">
            <form
              className="w-full grid md:grid-cols-2 lg:grid-cols-4 gap-4"
              onSubmit={handleSubmit(onSubmit)}
            >
              <div className="flex flex-col items-start justify-start gap-1 mt-5">
                <label
                  htmlFor="name"
                  className='text-sm after:content-["*"] after:text-red-600'
                >
                  Full Name
                </label>
                <div className="relative w-full">
                  <input
                    id="name"
                    type="text"
                    placeholder="Full Name"
                    className="bg-[#F5F7F9] p-3 text-sm border border-[#E5E5E5] rounded-md w-full outline-none"
                    required={true}
                    {...register("name", {
                      required: "This field is required",
                    })}
                  />
                </div>
              </div>
              <div className="flex flex-col items-start gap-1 mt-5">
                <label
                  htmlFor="email"
                  className='text-sm after:content-["*"] after:text-red-600'
                >
                  Email Address
                </label>
                <div className="relative w-full">
                  <input
                    id="email"
                    type="email"
                    placeholder="hello@gmail.com"
                    className="bg-[#F5F7F9] p-3 text-sm border border-[#E5E5E5] rounded-md w-full outline-none"
                    {...register("email", {
                      required: "This field is required",
                    })}
                  />
                </div>
              </div>
              <div className="flex flex-col items-start gap-1 mt-5">
                <label
                  htmlFor="role"
                  className='text-sm after:content-["*"] after:text-red-600'
                >
                  Role
                </label>
                <div className="relative w-full">
                  <SelectInput
                    data={["Admin", "Sales Associate"]}
                    control={control}
                    name="role"
                    {...register("role", {
                      required: "This field is required",
                    })}
                  />
                </div>
              </div>

              {!isEditing && (<div className="flex flex-col items-start gap-1 mt-5">
                <label
                  htmlFor="password"
                  className='after:content-["*"] after:text-red-600 text-sm'
                >
                  Password
                </label>
                <div className="relative w-full">
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    className="bg-[#F5F7F9] p-3 text-sm border border-[#E5E5E5] rounded-md w-full outline-none"
                    required={true}
                    {...register("password", {
                      required: "This field is required",
                    })}
                  />
                  {showPassword ? (
                    <EyeIcon
                      className="h-5 text-primary absolute right-0 -translate-y-8 -translate-x-4 cursor-pointer"
                      onClick={() => setPassword(!showPassword)}
                    />
                  ) : (
                    <EyeSlashIcon
                      className="h-5 text-primary absolute right-0 -translate-y-8 -translate-x-4 cursor-pointer"
                      onClick={() => setPassword(!showPassword)}
                    />
                  )}
                </div>
              </div>)}
              <div className="flex flex-col items-start gap-1 mt-6">
                <label
                  htmlFor="location"
                  className='after:content-["*"] after:text-red-600 text-sm'
                >
                  Address
                </label>
                <div className="relative w-full">
                  <input
                    id="address"
                    type="text"
                    className="bg-[#F5F7F9] p-3 text-sm border border-[#E5E5E5] rounded-md w-full outline-none"
                    name="address"
                    {...register("address", {
                      required: "This field is required",
                    })}
                  />
                </div>
              </div>
              <div className="flex flex-col items-start gap-1 mt-6">
                <label
                  htmlFor="status"
                  className='after:content-["*"] after:text-red-600 text-sm'
                >
                  Status
                </label>
                <div className="relative w-full">
                  <SelectInput
                    data={["Active", "Inactive"]}
                    control={control}
                    name="status"
                    {...register("status", {
                      required: "This field is required",
                    })}
                  />
                </div>
              </div>
              <div className="flex flex-col items-start gap-2 mt-6 col-span-full">
                <span className='text-sm'>
                  Profile Image
                </span>
                <Controller
                  control={control}
                  name="file"
                  render={({ field: { onChange, onBlur, value, ref } }) => (
                    <FileInput onChange={onChange} value={value} />
                  )}
                />
              </div>
              <div className="flex gap-4">
                <button className="bg-primary flex items-center text-sm text-white rounded-md px-8 py-3 shadow-md">
                  Save
                </button>
                <button type="button" className="bg-white text-primary border text-sm rounded-md border-primary px-8 py-3 shadow-md" onClick={()=>navigate(-1)}>
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      </Loading>
    </>
  );
}

export default AddUserForm;
