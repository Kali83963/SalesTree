import { TextareaAutosize } from '@mui/material';
import React from 'react'
import { useForm } from 'react-hook-form';

function AddCategoryForm() {
    var category = null;
    const { register, handleSubmit, reset, getValues,setValue, formState, control } =useForm({
        defaultValues: category ? category : {} 
    });

    function onSubmitLogin(data) {
        console.log(data);
    }
  return (
    <div className="px-4 py-6 text-sm">
        <div className="flex item-center justify-between">
          <div className="text-start">
            <h2 className="text-lg text-primary font-semibold">Add Category List</h2>
            <span className="text-sm">Add Category List</span>
          </div>
        </div>
        <div className="bg-white rounded-md mt-6 p-5 shadow-md">
          <form className="w-full flex flex-col gap-4 max-w-xl" onSubmit={handleSubmit(onSubmitLogin)}>
            <div className="flex flex-col items-start justify-start gap-1 mt-5">
                <label
                    htmlFor="name"
                    className='text-sm after:content-["*"] after:text-red-600'
                >
                    Category Name
                </label>
                <div className="relative w-full">
                    <input
                    id="name"
                    type="text"
                    placeholder="Category name"
                    className="bg-[#F5F7F9] p-3 text-sm border border-[#E5E5E5] rounded-md w-full outline-none"
                    required={true}
                    {...register("category_name", {
                        required: "This field is required",
                    })}
                    />
                </div>
            </div>
            <div className="flex flex-col items-start justify-start gap-1 mt-5">
                <label
                    htmlFor="name"
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
            <div className="flex gap-4">
              <button className="bg-primary flex items-center text-sm text-white rounded-md px-8 py-3 shadow-md">Save</button>
              <button className="bg-white text-primary border text-sm rounded-md border-primary px-8 py-3 shadow-md">Cancel</button>
            </div>
          </form>

        </div>
    </div>
  )
}

export default AddCategoryForm