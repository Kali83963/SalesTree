import BrandLogo from "../../Assests/images/Group 60223.png";
import { EnvelopeIcon } from "@heroicons/react/24/outline";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import request from "../../requests/request";

function ForgotPasswordForm() {


  const {register,handleSubmit,reset,getValues,formState}=useForm();
  
  const {errors} = formState;


  async function onSubmitLogin(data){
    const {email} = data;
    console.log(email)
    await request.post({entity:'auth/forgot-password',jsonData:{email:email},notifyOnFailed:true,notifyOnSuccess:true});
    reset();
  }

  return (
    <div className="flex-1 flex flex-col items-center justify-center md:p-0 p-5" style={{minWidth:'320px'}}>
        <div className="flex flex-col items-center justify-center flex-1 lg:min-w-[400px] min-w-[320px]">
          <img src={BrandLogo} alt="salsestree" className="w-52" />
          <h3 className="font-semibold text-lg text-text-color">Forgot Password?</h3>
          <p className="text-text-color text-sm">
            Please enter the email address associated with your account
          </p>

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
                <EnvelopeIcon className="h-5 text-primary absolute right-0 -translate-y-8 -translate-x-4 " />
              </div>
            </div>
            
            <button className="block bg-primary w-full text-white rounded-md py-2 my-4">
              Next
            </button>
          </form>
        </div>
    </div>
  );
}

export default ForgotPasswordForm;


