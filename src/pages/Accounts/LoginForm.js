import BrandLogo from "../../Assests/images/Group 60223.png";
import FacebookLogo from "../../Assests/images/facebook.png";
import GoogleLogo from "../../Assests/images/google.png";
import FacebookLogin from "@greatsumini/react-facebook-login";
import { EnvelopeIcon } from "@heroicons/react/24/outline";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/solid";
import { useGoogleLogin } from "@react-oauth/google";

import { Link } from "react-router-dom";
import { useState } from "react";
import { useForm } from "react-hook-form";

function LoginForm() {
  const [show, setShowPassword] = useState(false);

  const {register,handleSubmit,reset,getValues,formState}=useForm();

  const {errors} = formState;



  const login = useGoogleLogin({
    onSuccess: (codeResponse) => console.log(codeResponse),
    flow: "auth-code", // code and then send request to get accesstoken and jwt token
    // flow:'implicit' for accesstoken but no jwt and refresh token
  });


  function onSubmitLogin(data){

    console.log(data)

  }

  return (
    <div className="flex items-center justify-center md:w-5/12  md:flex-none flex-1 md:mr-auto">
        <div className="flex flex-col gap-3 items-center justify-center md:w-4/6 w-5/6" style={{minHeight:'100vh'}}>
          <img src={BrandLogo} alt="salsestree" className="w-52" />
          <h3 className="font-semibold text-lg text-text-color">Sign In</h3>
          <span className="text-text-color text-sm">
            Please sign in to your account
          </span>

          <form className="w-full" onSubmit={handleSubmit(onSubmitLogin)}>
            <div className="flex flex-col items-start gap-1 mt-9 w-full">
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
                  className="bg-[#F5F7F9] p-3 text-sm border rounded-lg border-[#E5E5E5] w-full outline-none"
                  {...register("email",{
                    required:"This field is required"
                  })}
                />
                <EnvelopeIcon className="h-5 text-primary  absolute right-0 -translate-y-8 -translate-x-4 " />
              </div>
            </div>
            <div className="flex flex-col items-start gap-1 mt-6">
              <label
                htmlFor="password"
                className='after:content-["*"] after:text-red-600 text-sm'
              >
                Password
              </label>
              <div className="relative w-full">
                <input
                  id="password"
                  type={show ? "text" : "password"}
                  className="bg-[#F5F7F9] p-3 text-sm border rounded-lg border-[#E5E5E5] w-full outline-none"
                  {...register("password",{
                    required:"This field is required"
                  })}
                />

                {show ? (
                  <EyeIcon
                    className="h-5 text-primary absolute right-0 -translate-y-8 -translate-x-4 cursor-pointer"
                    onClick={() => setShowPassword(!show)}
                  />
                ) : (
                  <EyeSlashIcon
                    className="h-5 text-primary absolute right-0 -translate-y-8 -translate-x-4 cursor-pointer"
                    onClick={() => setShowPassword(!show)}
                  />
                )}
              </div>
            </div>

            <Link to="/account/forgot/password" className="text-primary underline block text-start text-sm my-2  hover:text-primary hover:underline hover:">
              Forgot Password?
            </Link>
            <button className="block bg-primary w-full text-white rounded-md py-2 my-4">
              Sign In
            </button>
          </form>

          <span className="text-text-color text-sm">
            Don't have an account?{" "}
            <Link to="/account/register" className="font-bold text-primary hover:text-primary hover:underline">Sign Up</Link>
          </span>

          <div className="flex items-center gap-10 mt-6">
            <GoogleButton onLogin={login} />
            <FacebookLogin
              appId="304040055824824"
              onSuccess={(response) => {
                console.log("Login Success!", response);
              }}
              onFail={(error) => {
                console.log("Login Failed!", error);
              }}
              onProfileSuccess={(response) => {
                console.log("Get Profile Success!", response);
              }}
              render={({ onClick, logout }) => (
                <FacebookButton onClick={onClick} />
              )}
            />
          </div>
        </div>
        </div>
  );
}

export default LoginForm;

export function FacebookButton({ onClick}) {
  return (
    <button
      onClick={onClick}
      className="flex items-center justify-center cursor-pointer"
    >
      <img src={FacebookLogo} alt="facebook-logo" className="h-7" />
      <span className="text-xs"> Continue With Facebook</span>
    </button>
  );
}

export function GoogleButton({ onLogin }) {
  return (
    <div
      className="flex items-center gap-1 justify-center cursor-pointer"
      onClick={() => onLogin()}
    >
      <img src={GoogleLogo} alt="google-logo" className="h-7" />
      <span className="text-xs"> Continue With Google</span>
    </div>
  );
}
