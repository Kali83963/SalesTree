import { Autocomplete, TextField } from '@mui/material';
import React from 'react'
import { Controller, useForm } from 'react-hook-form';


const options = [
    { id: "1", label: "active" },
    { id: "2", label: "Inactive" },
  ];

function AddTaxRate() {

    var taxRate = null;
  const {
    register,
    handleSubmit,
    reset,
    getValues,
    setValue,
    formState,
    control,
  } = useForm({
    defaultValues: taxRate
      ? taxRate
      : {
          date: null,
          status: null,
        },
  });

  function onSubmitLogin(data) {
    console.log(data);
  }
  return (
    <div><div className="px-4 py-6 text-sm">
    <div className="flex item-center justify-between">
      <div className="text-start">
        <h2 className="text-lg text-primary font-semibold">Add Purchase</h2>
        <span className="text-sm">Add/Update Purchase</span>
      </div>
    </div>

    <form
      className="w-full flex flex-col "
      onSubmit={handleSubmit(onSubmitLogin)}
    >
        <div className="bg-white rounded-md mt-6 p-5 shadow-md ">
            <div className='flex flex-col md:flex-row md:gap-6 w-full'>
            <div className="flex flex-col items-start justify-start gap-1 mt-5 md:w-72">
                <label htmlFor="name" className="text-sm">
                    Name
                </label>
                <div className="relative w-full ">
                    <input
                    type="text"
                    placeholder="Name"
                    className="bg-[#F5F7F9] p-3 text-sm border border-[#E5E5E5] rounded-md w-full outline-none"
                    required={true}
                    {...register("name", {
                        required: "This field is required",
                    })}
                    />
                </div>
            </div>
            <div className="flex flex-col items-start justify-start gap-1 mt-5 md:w-72">
                <label htmlFor="percentage" className="text-sm ">
                    Percentage
                </label>
                <div className="relative w-full">
                    <input
                    type="text"
                    placeholder="xx%"
                    className="bg-[#F5F7F9] p-3 text-sm border border-[#E5E5E5] rounded-md w-full outline-none"
                    required={true}
                    {...register("percentage", {
                        required: "This field is required",
                    })}
                    />
                </div>
            </div>
            </div>
        
            <div className="flex flex-col items-start justify-start gap-1 mt-5 md:w-72">
                <label htmlFor="status" className="text-sm ">
                    Status
                </label>
                <div className="relative w-full">
                    <Controller
                    name="status"
                    control={control}
                    rules={{ required: true }}
                    render={({ field }) => {
                        const { onChange, value } = field;
                        return (
                        <Autocomplete
                            value={
                            value
                                ? options.find((option) => {
                                    return value === option.id;
                                }) ?? null
                                : null
                            }
                            options={options}
                            getOptionLabel={(option) => option.label}
                            onChange={(event, newValue) => {
                            onChange(newValue ? newValue.id : null);
                            }}
                            sx={{
                            "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline":
                                { border: "1px solid #E5E5E5", borderRadius: 1 },
                            "& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline":
                                { border: "1px solid #E5E5E5" },
                            "& .MuiOutlinedInput-input": {
                                fontSize: "18px",
                                padding: "4px 0 5px !important",
                            },
                            }}
                            renderInput={(params) => (
                            <TextField {...params} label="" {...field} />
                            )}
                        />
                        );
                    }}
                    ></Controller>
                </div>
            </div>
        <div className="flex gap-4 mt-5 col-span-2">
            <button className="bg-primary flex items-center text-sm text-white rounded-md px-8 py-3 shadow-md">
            Save
            </button>
            <button type="reset" className="bg-white text-primary border text-sm rounded-md border-primary px-8 py-3 shadow-md">
            Cancel
            </button>
        </div>
      </div>
    </form>
  </div>
  </div>
  )
}

export default AddTaxRate