import { TextareaAutosize } from "@mui/material";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import FileInput from "../../components/FileInput/FileInput";
import { useNavigate, useParams } from "react-router-dom";
import useEntityForm from "../../Hooks/useEntityForm";
import Loading from "../../components/Loading/Loading";

function AddManufactureForm({ entity, isEditing }) {
  let { id } = useParams();

  const navigate = useNavigate();

  const { result, onSubmit, isLoading, isSuccess } = useEntityForm({
    entity,
    id,
    isEditing,
  });
  const { register, handleSubmit, reset, setValue, control } = useForm({
    values: result || null,
  });

  useEffect(
    function () {
      if (isSuccess && isEditing) {
        navigate(-1);
      } else if (isSuccess) {
        reset();
      }
    },
    [isSuccess]
  );

  return (
    <Loading isLoading={isLoading}>
      <div className="px-4 py-6 text-sm">
        <div className="flex item-center justify-between">
          <div className="text-start">
            <h2 className="text-lg text-primary font-semibold">
              Add Manufacture List
            </h2>
            <span className="text-sm">Add Manufacture List</span>
          </div>
        </div>
        <div className="bg-white rounded-md mt-6 p-5 shadow-md">
          <form
            className="w-full flex flex-col gap-4"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="max-w-xl">
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
                    {...register("name", {
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
            </div>

            <div className="flex flex-col items-start gap-2 mt-6 col-span-full">
              <span className='after:content-["*"] after:text-red-600 text-sm'>
                Manufacture Image
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
              <button className="bg-white text-primary border text-sm rounded-md border-primary px-8 py-3 shadow-md" type="button" onClick={()=>navigate(-1)}>
                Cancel
              </button >
            </div>
          </form>
        </div>
      </div>
    </Loading>
  );
}

export default AddManufactureForm;
