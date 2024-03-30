import { useState } from "react";
import profileimage from "../../Assests/images/profile-image.jpg";
import CreateIcon from "@mui/icons-material/Create";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";

import { useForm } from "react-hook-form";
import SelectInput from "../../global/SelectInput";

function UpdateProfile() {
  const [showPassword, setPassword] = useState(false);

  const [imagePreview, setImagePreview] = useState(null);
  var product = null;
  const {
    register,
    handleSubmit,
    reset,
    getValues,
    setValue,
    formState,
    control,
  } = useForm({
    defaultValues: product ? product : {},
  });

  function onSubmitLogin(data) {
    console.log(data);
  }

  function handleChangeImage(event) {
    const file = event.target.files[0];
    setValue("profile_image", file);

    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImagePreview(imageUrl);
    }
  }

  return (
    <div className="px-4 py-6 text-sm">
      <div className="flex item-center justify-between flex-wrap gap-4">
        <div className="text-start">
          <h2 className="text-lg text-primary font-semibold">Profile</h2>
          <span className="text-sm">Add/Update Profile</span>
        </div>
      </div>

      <form className="bg-white rounded-md mt-6 p-6 shadow-md"  onSubmit={handleSubmit(onSubmitLogin)}>
        <div className="bg-gray-200 p-5 px-7 flex flex-col md:flex-row gap-4 items-center">
          <div className="relative w-max">
            <div className="h-28 w-28 overflow-hidden rounded-full relative">
              <img src={profileimage} className="w-full h-full object-cover" />
            </div>
            <label className="absolute right-0 bottom-0 text-primary bg-white p-1 text-sm rounded-full cursor-pointer">
              <CreateIcon />
              <input type="file" className="hidden" accept=".png,.jpg" />
            </label>
          </div>
          <div className="flex flex-col md:text-left">
            <h1 className="text-lg font-bold">John Doe</h1>
            <span className="font-normal">Super Admin</span>
            <span className="mt-5 font-semibold">Islamabad, Pakistan</span>
          </div>
        </div>
        <div className="bg-gray-200 p-5 px-7 flex flex-col gap-4 mt-12">
          <h1 className="text-lg text-primary font-bold text-left">
            Personal Information
          </h1>
          
            <div
              className="w-full md:max-w-5xl grid lg:grid-cols-3 md:grid-cols-2 gap-4"
             
            >
              <div className="flex flex-col items-start justify-start gap-1 mt-5">
                <label htmlFor="full_name" className="text-sm">
                  Product Name
                </label>
                <div className="relative w-full">
                  <input
                    id="name"
                    type="text"
                    placeholder="Full Name"
                    className="bg-[#F5F7F9] p-3 text-sm border border-[#E5E5E5] rounded-md w-full outline-none"
                    required={true}
                    {...register("full_name", {
                      required: "This field is required",
                    })}
                  />
                </div>
              </div>
              <div className="flex flex-col items-start justify-start gap-1 mt-5 ">
                <label htmlFor="category_name" className="text-sm ">
                  Organization Name
                </label>
                <div className="relative w-full flex items-center basis-full">
                  <div className="relative w-full">
                    <input
                      id="name"
                      type="text"
                      placeholder="Organization Name"
                      className="bg-[#F5F7F9] p-3 text-sm border border-[#E5E5E5] rounded-md w-full outline-none"
                      required={true}
                      {...register("org_name", {
                        required: "This field is required",
                      })}
                    />
                  </div>
                </div>
              </div>
              <div className="flex flex-col items-start justify-start gap-1 mt-5">
                <label htmlFor="email" className="text-sm">
                  Email Address
                </label>
                <div className="relative w-full">
                  <input
                    id="email"
                    type="email"
                    placeholder="xx@gmail.com"
                    className="bg-[#F5F7F9] p-3 text-sm border border-[#E5E5E5] rounded-md w-full outline-none"
                    required={true}
                    {...register("email", {
                      required: "This field is required",
                    })}
                  />
                </div>
              </div>
              <div className="flex flex-col items-start justify-start gap-1 mt-5">
                <label
                  htmlFor="password"
                  className='text-sm'
                >
                  Password
                </label>
                <div className="relative w-full">
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Barcode"
                    className="bg-[#F5F7F9] p-3 text-sm border border-[#E5E5E5] rounded-md w-full outline-none"
                    required={true}
                    {...register("barcode", {
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
              <div className="flex flex-col items-start justify-start gap-1 mt-5">
                <label htmlFor="address" className="text-sm">
                  Address
                </label>
                <div className="relative w-full">
                  <input
                    id="address"
                    type="text"
                    placeholder="Address"
                    className="bg-[#F5F7F9] p-3 text-sm border border-[#E5E5E5] rounded-md w-full outline-none"
                    required={true}
                    {...register("address", {
                      required: "This field is required",
                    })}
                  />
                </div>
              </div>
              <div className="flex flex-col items-start gap-1 mt-6">
                <label
                  htmlFor="location"
                  className='text-sm'
                >
                  Location
                </label>
                <div className="relative w-full">
                  <SelectInput
                    data={[]}
                    control={control}
                    name="location"
                    {...register("location", {
                      required: "This field is required",
                    })}
                  />
                </div>
              </div>
              <div className="flex gap-4 col-span-full mt-3 flex-wrap">
                <button className="bg-primary flex items-center text-sm text-white rounded-md px-8 py-3 shadow-md">
                  Save
                </button>
                <button className="bg-white text-primary border text-sm rounded-md border-primary px-8 py-3 shadow-md">
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </form>
      
    </div>
  );
}

export default UpdateProfile;
