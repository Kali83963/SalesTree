import React, { useState } from "react";
import "./adduserform.css";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import SelectInput from "../../global/SelectInput";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import { useParams } from "react-router-dom";
import request from "../../requests/request";
import Loading from "../../components/Loading/Loading";
import useAsyncRequest from "../../Hooks/useAsyncRequest";
import { useSelector } from "react-redux";

function AddUserForm({ entity, editing }) {
  let { id } = useParams();
  var user;
  if (id) {
    // user = getUserById(id,data);
  }

  const [showPassword, setPassword] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const { onRequest, isLoading, isSuccess } = useAsyncRequest();
  const token = useSelector((state) => state.auth.current.user.jwt);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    control,
  } = useForm({
    defaultValues: user ? user : {},
  });

  const postData = async (data) => {
    const headers = {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'multipart/form-data',
    };
    return await request.post({
      entity: entity,
      headers,
      jsonData: data,
      notifyOnSuccess: true,
      notifyOnFailed: true,
    });
  };

  function onSubmitLogin(data) {
  
    const callback = postData(data);
    onRequest(callback);
  }

  useEffect(function(){
    if(isSuccess) {
      reset();
      setImagePreview(null);
    }
  },[isSuccess])

  function handleChangeImage(event) {
    const file = event.target.files[0];
    setValue("file", file);

    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImagePreview(imageUrl);
    }
  }

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
              onSubmit={handleSubmit(onSubmitLogin)}
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

              <div className="flex flex-col items-start gap-1 mt-5">
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
              </div>
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
                <span className='after:content-["*"] after:text-red-600 text-sm'>
                  Profile Image
                </span>
                <div className="w-full flex flex-col lg:flex-row gap-4">
                  <label
                    htmlFor="dropzone-file"
                    className="flex flex-col items-center justify-center w-max-xl lg:w-3/6 h-44 cursor-pointer rounded-md bg-[#F5F7F9] border border-[#E5E5E5] text-[#313131] text-sm"
                  >
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <br />
                      <svg
                        className="w-12"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 20 16"
                      >
                        <path
                          stroke="#5A6DFC"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                        />
                      </svg>
                      <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                        <span className="font-semibold">Click to upload</span>{" "}
                        or drag and drop
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        PNG, JPG or GIF (MAX. 800x400px)
                      </p>
                    </div>
                    <input
                      id="dropzone-file"
                      name="image"
                      type="file"
                      className="hidden"
                      accept="image/png,image/jpeg,image/jpg"
                      onChange={(event) => handleChangeImage(event)}
                    />
                    <br />
                  </label>
                  {imagePreview && (
                    <div className="overflow-hidden w-52 h-52">
                      <img
                        src={imagePreview}
                        alt="imagePreview"
                        className="w-full h-full object-contain"
                      />
                    </div>
                  )}
                </div>
              </div>
              <div className="flex gap-4">
                <button className="bg-primary flex items-center text-sm text-white rounded-md px-8 py-3 shadow-md">
                  Save
                </button>
                <button className="bg-white text-primary border text-sm rounded-md border-primary px-8 py-3 shadow-md">
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
