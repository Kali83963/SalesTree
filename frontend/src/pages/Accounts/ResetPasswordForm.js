import BrandLogo from "../../Assests/images/Group 60223.png";
import FacebookLogin from "@greatsumini/react-facebook-login";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/solid";


import { Link } from "react-router-dom";
import { useState } from "react";
import { useForm } from "react-hook-form";

function ResetPasswordForm() {
  const [show1, setShowPassword1] = useState(false);
  const [show2, setShowPassword2] = useState(false);
  const [passwordResetDone,setPasswordResetDone] = useState(false);

  const {register,handleSubmit,reset,getValues,formState}=useForm();

  const {errors} = formState;


  function onSubmitLogin(data){

    console.log(data)



  }

  return (
    <div className="flex items-center justify-center md:w-5/12  md:flex-none flex-1 md:mr-auto">
        <div className="flex flex-col gap-3 items-center justify-center md:w-4/6 w-5/6" style={{minHeight:'100vh'}}>
          <img src={BrandLogo} alt="salsestree" className="w-52" />
          <h3 className="font-semibold text-lg text-text-color">Rest Password</h3>
          <span className="text-text-color text-sm">
            Enter a new password below to change your password.
          </span>

          <form className="w-full" onSubmit={handleSubmit(onSubmitLogin)}>
            <div className="flex flex-col items-start gap-1 mt-6">
              <label
                htmlFor="password"
                className='after:content-["*"] after:text-red-600 text-sm'
              >
                Create New Password
              </label>
              <div className="relative w-full">
                <input
                  id="password"
                  type={show1 ? "text" : "password"}
                  className="bg-[#F5F7F9] p-3 text-sm border rounded-lg border-[#E5E5E5] w-full outline-none"
                  {...register("password1",{
                    required:"This field is required"
                  })}
                />

                {show1 ? (
                  <EyeIcon
                    className="h-5 text-primary absolute right-0 -translate-y-8 -translate-x-4 cursor-pointer"
                    onClick={() => setShowPassword1(!show1)}
                  />
                ) : (
                  <EyeSlashIcon
                    className="h-5 text-primary absolute right-0 -translate-y-8 -translate-x-4 cursor-pointer"
                    onClick={() => setShowPassword1(!show1)}
                  />
                )}
              </div>
            </div>
            <div className="flex flex-col items-start gap-1 mt-6">
              <label
                htmlFor="password"
                className='after:content-["*"] after:text-red-600 text-sm'
              >
                Re-Enter New Password
              </label>
              <div className="relative w-full">
                <input
                  id="password"
                  type={show2 ? "text" : "password"}
                  className="bg-[#F5F7F9] p-3 text-sm border rounded-lg border-[#E5E5E5] w-full outline-none"
                  {...register("password2",{
                    required:"This field is required"
                  })}
                />

                {show2 ? (
                  <EyeIcon
                    className="h-5 text-primary absolute right-0 -translate-y-8 -translate-x-4 cursor-pointer"
                    onClick={() => setShowPassword2(!show2)}
                  />
                ) : (
                  <EyeSlashIcon
                    className="h-5 text-primary absolute right-0 -translate-y-8 -translate-x-4 cursor-pointer"
                    onClick={() => setShowPassword2(!show2)}
                  />
                )}
              </div>
            </div>

            <button className="block bg-primary w-full text-white rounded-md py-2 my-4">
              Sumbit
            </button>
          </form>

          
        </div>
    </div>
  );
}

export default ResetPasswordForm;