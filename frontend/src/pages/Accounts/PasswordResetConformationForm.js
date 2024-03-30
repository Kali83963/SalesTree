

import { useRef } from "react";
import BrandLogo from "../../Assests/images/Group 60223.png";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";


const OTPdigit = 6;

function PasswordResetConformationForm() {


  const {register,handleSubmit,reset,getValues,formState,control}=useForm();
  const OTPdigitArray = Array(OTPdigit).fill('')

  const navigate = useNavigate();
  const {errors} = formState;


  function onSubmitLogin(data){
    console.log(data)
    navigate("/account/reset/password")
  }

  return (
    <div className="flex items-center justify-center md:w-5/12  md:flex-none flex-1 md:mr-auto">
        <div className="flex flex-col gap-3 items-center justify-center md:w-4/6 w-5/6" style={{minHeight:'100vh'}}>
          <img src={BrandLogo} alt="salsestree" className="w-52" />
          <h3 className="font-semibold text-lg text-text-color">We sent a code to your email</h3>
          <p className="text-text-color text-sm">
            Please enter the 6-digit verification code sent to your email.
          </p>

          <form className="w-full" onSubmit={handleSubmit(onSubmitLogin)}>
            <div className="flex flex-col items-start gap-1 mt-9 w-full">
              <label
                htmlFor="code"
                className='text-sm after:content-["*"] after:text-red-600'
              >
                Enter Code
              </label>
              <div className="relative w-full">
                <div className="flex gap-2 mt-4" >
                    {OTPdigitArray.map((curr,index)=>(
                        <div className="w-16 h-20 " key={index}>
                            <input className="bg-[rgb(245,247,249)] p-3 text-sm border rounded-lg border-[#E5E5E5] w-full outline-none" type="number" name={`digit${index}`} value={OTPdigitArray[index] || null}   min='0' max='9' onInput={(e)=>{
                                if(e.target.value && e.target.value < 9){
                                    const nextInput = document.querySelector(`input[name=digit${index + 1}]`);
                                    if (nextInput) {
                                        nextInput.focus();
                                    }
                                    
                                }
                                else if(e.target.value > 9){
                                    const newValue = parseInt(e.target.value / 10)
                                    e.target.value = newValue;
                                    
                                }
                            
                            }} 
                            required
                            {...register(`digit${index}`,{
                                required:"This field is required"
                              })}
                            />
                        </div>
                    ))}
                </div>
              </div>
            </div>
            <button className="text-primary underline text-sm font-semibold text-left w-full">
                Resend Code
            </button>
            
            <button className="block bg-primary w-full text-white rounded-md py-2 my-4">
              Sumbit
            </button>
          </form>
        </div>
    </div>
  );
}

export default PasswordResetConformationForm;


