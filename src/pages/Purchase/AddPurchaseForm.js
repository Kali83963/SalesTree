import React, { useState } from "react";
import { Controller, useForm, useFieldArray } from "react-hook-form";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";

import { Autocomplete, TextField } from "@mui/material";

export function CustomCalendarIcon() {
  return <CalendarMonthIcon className="text-primary" />;
}

const columns = ["Product Name", "Quantity", "Price", "Discount", "Action"];

function AddPurchaseForm() {
  var purchase = null;
  const {
    register,
    handleSubmit,
    reset,
    getValues,
    setValue,
    formState,
    control,
  } = useForm({
    defaultValues: purchase
      ? purchase
      : {
          date: null,
          status: null,
          purchases: [
            { productName: "", quantity: null, price: "", discount: "" },
          ],
        },
  });

  const { fields, append, remove } = useFieldArray({
    name: "purchases",
    control,
  });

  const [purchaseIndex,setPurchaseIndex] = useState(0);

  function onSubmitLogin(data) {
    console.log(data);
  }
  return (
    <>
      <div className="px-4 py-6 text-sm">
        <div className="flex item-center justify-between">
          <div className="text-start">
            <h2 className="text-lg text-primary font-semibold">Add Purchase</h2>
            <span className="text-sm">Add/Update Purchase</span>
          </div>
        </div>

        <form
          className="w-full flex flex-col max-w-full"
          onSubmit={handleSubmit(onSubmitLogin)}
        >
          <div className="bg-white rounded-md mt-6 p-5 shadow-md md:grid md:grid-flow-row grid-cols-4 gap-x-14">
            <div className="flex flex-col items-start justify-start gap-1 mt-5">
              <label htmlFor="date" className="text-sm ">
                Date
              </label>
              <div className="relative flex w-full">
                <Controller
                  name="date"
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => {
                    const { onChange, value } = field;

                    return (
                      <DatePicker
                        value={null}
                        inputRef={field.ref}
                        onChange={(newValue) => {
                          onChange(newValue);
                        }}
                        label=""
                        slots={{
                          openPickerIcon: CustomCalendarIcon,
                        }}
                        slotProps={{
                          textField: { size: "large", focused: false },
                        }}
                        sx={{
                          "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline":
                            { border: "1px solid #E5E5E5", borderRadius: 1 },
                          "& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline":
                            { border: "1px solid #E5E5E5" },
                          "& .MuiOutlinedInput-input": {
                            fontSize: "small",
                            padding: "12.5px 14px",
                          },
                        }}
                        className="text-xs w-full"
                      />
                    );
                  }}
                ></Controller>
              </div>
            </div>
            <div className="flex flex-col items-start justify-start gap-1 mt-5">
              <label htmlFor="supplier_name" className="text-sm">
                Supplier Name
              </label>
              <div className="relative w-full">
                <input
                  type="text"
                  placeholder="Supplier Name"
                  className="bg-[#F5F7F9] p-3 text-sm border border-[#E5E5E5] rounded-md w-full outline-none"
                  required={true}
                  {...register("supplier_name", {
                    required: "This field is required",
                  })}
                />
              </div>
            </div>
            <div className="flex flex-col items-start justify-start gap-1 mt-5">
              <label htmlFor="purchase_no" className="text-sm ">
                Purchase Number
              </label>
              <div className="relative w-full">
                <input
                  type="text"
                  placeholder="Purchase Number"
                  className="bg-[#F5F7F9] p-3 text-sm border border-[#E5E5E5] rounded-md w-full outline-none"
                  required={true}
                  {...register("purchase_no", {
                    required: "This field is required",
                  })}
                />
              </div>
            </div>
            <div className="flex flex-col items-start justify-start gap-1 mt-5">
              <label htmlFor="grand_total" className="text-sm ">
                Grand Total
              </label>
              <div className="relative w-full">
                <input
                  type="text"
                  placeholder="Grand Total"
                  className="bg-[#F5F7F9] p-3 text-sm border border-[#E5E5E5] rounded-md w-full outline-none"
                  required={true}
                  {...register("grand_total", {
                    required: "This field is required",
                  })}
                />
              </div>
            </div>
            <div className="flex flex-col items-start justify-start gap-1 mt-5">
              <label htmlFor="paid" className="text-sm ">
                Paid
              </label>
              <div className="relative w-full">
                <input
                  type="text"
                  placeholder="Paid"
                  className="bg-[#F5F7F9] p-3 text-sm border border-[#E5E5E5] rounded-md w-full outline-none"
                  required={true}
                  {...register("paid", {
                    required: "This field is required",
                  })}
                />
              </div>
            </div>
            <div className="flex flex-col items-start justify-start gap-1 mt-5">
              <label htmlFor="due" className="text-sm ">
                Due
              </label>
              <div className="relative w-full">
                <input
                  type="text"
                  placeholder="Due"
                  className="bg-[#F5F7F9] p-3 text-sm border border-[#E5E5E5] rounded-md w-full outline-none"
                  required={true}
                  {...register("due", {
                    required: "This field is required",
                  })}
                />
              </div>
            </div>
            <div className="flex flex-col items-start justify-start gap-1 mt-5">
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
                            fontSize: "small",
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
            <div className="flex flex-col items-start justify-start gap-1 mt-5">
              <label htmlFor="payment_status" className="text-sm ">
                Payment Status
              </label>
              <div className="relative w-full">
                <Controller
                  name="payment_status"
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => {
                    const { onChange, value } = field;
                    return (
                      <Autocomplete
                        value={
                          value
                            ? paymentOptions.find((option) => {
                                return value === option.id;
                              }) ?? null
                            : null
                        }
                        options={paymentOptions}
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
                            fontSize: "small",
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
          </div>
          <div className="bg-white rounded-md mt-6 p-5 shadow-md flex flex-col items-start col-span-4 justify-start gap-1 ">
            <table className="w-full p-6">
              <thead className="border-b border-[#cecece]">
                <tr className="text-left">
                  {columns.map((col, index) => (
                    <th className="font-normal p-2" key={index}>
                      {col}
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody>
                {fields.map((field, index) => {
                    
                  return (
                    <tr  className="border-b border-[#E5E5E5]" key={field.id}>
                      <td className="p-4">
                        <Controller
                          name={`purchases.${index}.productName`}
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
                                    {
                                      border: "1px solid #E5E5E5",
                                      borderRadius: 1,
                                    },
                                  "& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline":
                                    { border: "1px solid #E5E5E5" },
                                  "& .MuiOutlinedInput-input": {
                                    fontSize: "small",
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
                      </td>
                      <td className="p-4 text-left">
                        <input
                          type="number"
                          placeholder="Quantity"
                          className="bg-[#F5F7F9] p-3 text-sm border border-[#E5E5E5] rounded-md w-full outline-none"
                          required={true}
                          {...register(`purchases.${index}.quantity`, {
                            required: "This field is required",
                          })}
                        />
                      </td>
                      <td className="p-4 text-left">
                        <input
                          type="text"
                          placeholder="Price"
                          className="bg-[#F5F7F9] p-3 text-sm border border-[#E5E5E5] rounded-md w-full outline-none"
                          required={true}
                          {...register(`purchases.${index}.price`, {
                            required: "This field is required",
                          })}
                        />
                      </td>
                      <td className="p-4 text-left">
                        <input
                          type="text"
                          placeholder="Discount"
                          className="bg-[#F5F7F9] p-3 text-sm border border-[#E5E5E5] rounded-md w-full outline-none"
                          required={true}
                          {...register(`purchases.${index}.discount`, {
                            required: "This field is required",
                          })}
                        />
                      </td>
                      <td className="p-4 text-center flex items-center ">
                      {
                        purchaseIndex === index ? (
                            <button
                            type="button"
                            className="bg-primary flex items-center text-sm text-white rounded-md px-3 py-2 shadow-md whitespace-nowrap"
                            onClick={() => {
                                append({ productName: "", quantity: null, price: "", discount: "" });
                                setPurchaseIndex((index)=> index + 1);
                            }}
                            >
                            +
                            </button>
                        ) : (
                            <button
                            type="button"
                            className="bg-[#ff3a31] text-white rounded-md flex items-center text-sm px-1 py-2 shadow-md whitespace-nowrap"
                            onClick={() => {
                                remove(index);
                                setPurchaseIndex((index)=> index - 1);
                            }}
                            >
                            <DeleteOutlineOutlinedIcon />
                            </button>
                            )
                        }

                        
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            <div className="flex gap-4 mt-5">
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
    </>
  );
}

const options = [
  { id: "1", label: "Received" },
  { id: "2", label: "Pending" },
];
const paymentOptions = [
  { id: "1", label: "Paid" },
  { id: "2", label: "Unpaid" },
];

export default AddPurchaseForm;
