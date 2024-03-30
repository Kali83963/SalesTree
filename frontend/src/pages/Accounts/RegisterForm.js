import BrandLogo from "../../Assests/images/Group 60223.png";
import { EnvelopeIcon,UserIcon,UserGroupIcon,MapPinIcon } from "@heroicons/react/24/outline";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/solid";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { FacebookButton, GoogleButton } from "./LoginForm";
import FacebookLogin from "@greatsumini/react-facebook-login";
import { useGoogleLogin } from "@react-oauth/google";
import SelectInput from "../../global/SelectInput";
import { toast } from "react-toastify";
import { MenuItem, Select } from "@mui/material";
// import { SocialLogin, signUp } from "./AccountApis";
import { loginUser } from "../../redux/globalslice";
import { useDispatch } from "react-redux";
import { CURRENCIES } from "../../utils/currencies";
import { register, signUp } from "../../redux/auth/action";




const validatePassword = (value) => {
  let errorMessage = '';

  if (value.length < 8) {
    errorMessage = 'Password must be at least 8 characters long.';
  } else if (!/[a-z]/.test(value)) {
    errorMessage = 'Password must contain at least one lowercase letter.';
  } else if (!/\d/.test(value)) {
    errorMessage = 'Password must contain at least one digit.';
  }

  // Display error message using toastify
  if(errorMessage)
    return errorMessage;
  

  return;
  
};





function Register() {
  const [showPassword1, setShowPassword1] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);
  const [currencyLoading,setCurrencyloading] = useState(false);
  const currenciesRef = useRef({});

  const { register, handleSubmit, reset, getValues, formState,control } = useForm();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { errors } = formState;

  function onSubmit(data) {
    const {
      name,
      org_name,
      email,
      password1,
      password2,
      address,
      currency,
    } = data;

    if(password1 !== password2){
      toast.error("Password dose not match", {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      return;
    }
    const obj = { name,email,password:password1,address,currency,company:org_name,timezone:'UTC'}
    // signUp(obj).then(()=> navigate("/dashboard"))

    dispatch(signUp(obj))
    navigate("/dashboard")


  }


  function onError(errors){


    for(let error in errors){
      console.log(error)
      toast.error(errors[error].message, {
            position: 'top-right',
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          });
    }
    return;
  }

  const login = useGoogleLogin({
    onSuccess: (codeResponse) => console.log(codeResponse),
    flow: "auth-code", // code and then send request to get accesstoken and jwt token
    // flow:'implicit' for accesstoken but no jwt and refresh token
  });


  useEffect(function(){
    async function fetchData() {
      
        try {
          setCurrencyloading(true)
          currenciesRef.current = CURRENCIES;
          setCurrencyloading(false);
        } catch (error) {
          setCurrencyloading(false);
        }
      }

      if(Object.keys(currenciesRef.current).length === 0)
          fetchData();
  },[])


  return (
    <div className="flex items-center justify-center md:w-5/12  md:flex-none flex-1">
    <div className=" lg:w-4/6 md:w-3/6 w-5/6 flex flex-col items-center justify-center">
      <img src={BrandLogo} alt="salsestree" className="w-52" />
      <h3 className="font-semibold text-lg text-text-color">Create an Account</h3>
      <form className="w-full" onSubmit={handleSubmit(onSubmit,onError)}>
        <div className="flex flex-col items-start gap-1 mt-5 w-full">
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
              className="bg-[#F5F7F9] p-3 text-sm border rounded-lg border-[#E5E5E5] w-full outline-none"
              required={true}
              {...register("name", {
                required: "This field is required",
              })}
            />
            <UserIcon className="h-5 text-primary absolute right-0 -translate-y-8 -translate-x-4 " />
          </div>
        </div>
        <div className="flex flex-col items-start gap-1 mt-5 w-full">
          <label
            htmlFor="org_name"
            className='text-sm after:content-["*"] after:text-red-600'
          >
           Organization Name
          </label>
          <div className="relative w-full">
            <input
              id="org_name"
              type="text"
              placeholder="Organization Name"
              className="bg-[#F5F7F9] p-3 text-sm border rounded-lg border-[#E5E5E5] w-full outline-none"
              {...register("org_name", {
                required: "This field is required",
              })}
            />
            <UserGroupIcon className="h-5 text-primary absolute right-0 -translate-y-8 -translate-x-4 " />
          </div>
        </div>
        <div className="flex flex-col items-start gap-1 mt-5 w-full">
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
              {...register("email", {
                required: "This field is required",
              })}
            />
            <EnvelopeIcon className="h-5 text-primary absolute right-0 -translate-y-8 -translate-x-4 " />
          </div>
        </div>
        <div className="flex flex-col items-start gap-1 mt-6">
          <label
            htmlFor="password1"
            className='after:content-["*"] after:text-red-600 text-sm'
          >
            Password
          </label>
          <div className="relative w-full">
            <input
              id="password1"
              type={showPassword1 ? "text" : "password"}
              className="bg-[#F5F7F9] p-3 text-sm border rounded-lg border-[#E5E5E5] w-full outline-none"
              required={true}
              {...register("password1", {
                required: "This field is required",
                validate:(value) => validatePassword(value)
              })}
            />

            {showPassword1 ? (
              <EyeIcon
                className="h-5 text-primary absolute right-0 -translate-y-8 -translate-x-4 cursor-pointer"
                onClick={() => setShowPassword1(!showPassword1)}
              />
            ) : (
              <EyeSlashIcon
                className="h-5 text-primary absolute right-0 -translate-y-8 -translate-x-4 cursor-pointer"
                onClick={() => setShowPassword1(!showPassword1)}
              />
            )}
          </div>
        </div>
        <div className="flex flex-col items-start gap-1 mt-6">
          <label
            htmlFor="password2"
            className='after:content-["*"] after:text-red-600 text-sm'
          >
            Re-Type Password
          </label>
          <div className="relative w-full">
            <input
              id="password2"
              type={showPassword2 ? "text" : "password"}
              className="bg-[#F5F7F9] p-3 text-sm border rounded-lg border-[#E5E5E5] w-full outline-none"
              {...register("password2", {
                required: "This field is required",
              })}
            />

            {showPassword2 ? (
              <EyeIcon
                className="h-5 text-primary absolute right-0 -translate-y-8 -translate-x-4 cursor-pointer"
                onClick={() => setShowPassword2(!showPassword2)}
              />
            ) : (
              <EyeSlashIcon
                className="h-5 text-primary absolute right-0 -translate-y-8 -translate-x-4 cursor-pointer"
                onClick={() => setShowPassword2(!showPassword2)}
              />
            )}
          </div>
        </div>
        <div className="flex flex-col items-start gap-1 mt-6">
          <label
            htmlFor="address"
            className='text-sm'
          >
            Address
          </label>
          <div className="relative w-full">
            <input
              id="address"
              type="text" 
              className="bg-[#F5F7F9] p-3 text-sm border rounded-lg border-[#E5E5E5] w-full outline-none"
              placeholder="Address"
              required
              {...register("address", {
                required: "This field is required",
              })}
            />

            <MapPinIcon className="h-5 text-primary absolute right-0 -translate-y-8 -translate-x-4 cursor-pointer" />

            
          </div>
        </div>
        <div className="flex flex-col items-start gap-1 mt-6">
          <label
            htmlFor="curreny"
            className='after:content-["*"] after:text-red-600 text-sm'
          >
            Currency
          </label>
          <div className="relative w-full">
            <Select
              displayEmpty
              sx={{width:'100%',outline:'none',height:50,textAlign:'start'}}
              className="bg-[#F5F7F9] text-sm border rounded-lg border-[#E5E5E5] outline-none "
              renderValue={(selected) => {
                return selected;
              }}
              MenuProps={{
                PaperProps: {
                  style: {
                    maxHeight: 200, // Adjust this value
                    width: 100,
                  },
                },
              }}
              required
              inputProps={{ 'aria-label': 'Without label' }}
              {...register("currency", {
                required: "This field is required",
              })}
              >
                <MenuItem disabled value="">
                <em>Placeholder</em>
                </MenuItem>
                {Object.keys(currenciesRef.current).map((name) => (
                <MenuItem
                  key={name}
                  value={name}
                  
                >
                  <div className="w-full flex">
                    <span className="flex-1">{name}</span>
                    <span className="flex-1">{currenciesRef.current[name]}</span>
                  </div>
                </MenuItem>
            ))}
            </Select>
          </div>
        </div>
        <div className="flex items-start gap-3 mt-6">
          <div className="relative">
            <input
              id="terms_condtion"
              type="checkbox"
              className="bg-[#F5F7F9] p-3 text-sm border rounded-lg border-[#E5E5E5] w-full outline-none hover:border-[#E5E5E5]"
              required
              {...register("terms and condition", {
                required: "This field is required",
              })}
            />
          </div>
          <label
            htmlFor="terms_condtion"
            className='text-sm'
          >
            I agree to the <Link className="text-primary underline font-bold">Terms of Services</Link> and <Link className="text-primary underline font-bold">Privacy Policy</Link>
          </label>
        </div>

        <button className="block bg-primary w-full text-white rounded-md py-2 my-4">
          Sign Up
        </button>
      </form>

      <span className="text-text-color text-sm">
        Allready have an account?{" "}
        <Link
          to="/account/login"
          className="font-bold text-primary hover:text-primary hover:underline"
        >
          Sign In
        </Link>
      </span>

      <div className="flex items-center gap-10 mt-6">
            <GoogleButton onLogin={login} />
            <FacebookLogin
              appId="304040055824824"
              onSuccess={(response) => {
                const { accessToken, graphDomain:provider } = response
                SocialLogin(accessToken,provider)
                navigate('/dashboard')
                console.log("Login Success!", response);
              }}
              onFail={(error) => {
                console.log("Login Failed!", error);
              }}
              onProfileSuccess={(response) => {
                response.picture = response.picture.data.url;
                localStorage.setItem('user',JSON.stringify(response))
                dispatch(loginUser({user:response}))
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

export default Register;



