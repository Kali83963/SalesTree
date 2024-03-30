import { TextareaAutosize } from '@mui/material';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

function AddManufactureForm() {
    var manufacture = null;
    const { register, handleSubmit, reset, getValues,setValue, formState, control } =useForm({
        defaultValues: manufacture ? manufacture : {} 
    });
    const [imagePreview, setImagePreview] = useState(null);

    function handleChangeImage(event) {
        const file = event.target.files[0];
        setValue("profile_image",file);
    
        if (file) {
          const imageUrl = URL.createObjectURL(file);
          setImagePreview(imageUrl);
        }
      }
    

    function onSubmitLogin(data) {
        console.log(data);
    }
  return (
    <div className="px-4 py-6 text-sm">
        <div className="flex item-center justify-between">
          <div className="text-start">
            <h2 className="text-lg text-primary font-semibold">Add Manufacture List</h2>
            <span className="text-sm">Add Manufacture List</span>
          </div>
        </div>
        <div className="bg-white rounded-md mt-6 p-5 shadow-md">
          <form className="w-full flex flex-col gap-4 max-w-xl" onSubmit={handleSubmit(onSubmitLogin)}>
            <div className="flex flex-col items-start justify-start gap-1 mt-5">
                <label
                    htmlFor="manufacture_name"
                    className='text-sm after:content-["*"] after:text-red-600'
                >
                    Manufacture Name
                </label>
                <div className="relative w-full">
                    <input
                    id="manufacture_name"
                    type="text"
                    placeholder="Manufacture name"
                    className="bg-[#F5F7F9] p-3 text-sm border border-[#E5E5E5] rounded-md w-full outline-none"
                    required={true}
                    {...register("manufacture_name", {
                        required: "This field is required",
                    })}
                    />
                </div>
            </div>
            <div className="flex flex-col items-start justify-start gap-1 mt-5">
                <label
                    htmlFor="description"
                    className='text-sm after:content-["*"] after:text-red-600'
                >
                    Description
                </label>
                <div className="relative w-full">
                    <TextareaAutosize
                        placeholder="Description"
                        className="bg-[#F5F7F9] p-3 text-sm border border-[#E5E5E5] rounded-md w-full outline-none"
                        required={true}
                        {...register("description", {
                            required: "This field is required",
                        })}
                    />
                </div>
            </div>
            <div className="flex flex-col items-start gap-2 mt-6 col-span-full">
            <span className='after:content-["*"] after:text-red-600 text-sm'>
              Manufacture Image
            </span>
            <div className="w-full flex flex-col lg:flex-row gap-4">
              <label
                for="dropzone-file"
                className="flex flex-col items-center justify-center w-full h-44 cursor-pointer rounded-md bg-[#F5F7F9] border border-[#E5E5E5] text-[#313131] text-sm"
              >
                <div class="flex flex-col items-center justify-center pt-5 pb-6">
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
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                    />
                  </svg>
                  <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                    <span className="font-semibold">Click to upload</span> or
                    drag and drop
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
              <button className="bg-primary flex items-center text-sm text-white rounded-md px-8 py-3 shadow-md">Save</button>
              <button className="bg-white text-primary border text-sm rounded-md border-primary px-8 py-3 shadow-md">Cancel</button>
            </div>
          </form>

        </div>
    </div>
  )
}

export default AddManufactureForm