import { DatePicker } from "@mui/x-date-pickers";
import { Controller, useForm } from "react-hook-form";
import { CustomCalendarIcon } from "./AddPurchaseForm";
import { Autocomplete, TextField } from "@mui/material";

const supplierOptions = [];
const productOptions = [];

function AddPurchaseReturnForm() {
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
        },
  });

  function onSubmitLogin(data) {
    console.log(data);
  }
  return (
    <>
      <div className="px-4 py-6 text-sm">
        <div className="flex item-center justify-between">
          <div className="text-start">
            <h2 className="text-lg text-primary font-semibold">
              Add Purchase Return
            </h2>
            <span className="text-sm">Add/Update Purchase Return</span>
          </div>
        </div>

        <form
          className="w-full flex flex-col max-w-full"
          onSubmit={handleSubmit(onSubmitLogin)}
        >
          <div className="bg-white rounded-md mt-6 p-5 shadow-md md:grid md:grid-flow-row grid-cols-4 gap-x-14">
            <div className="flex flex-col items-start justify-start gap-1 mt-5">
              <label htmlFor="supplier_name" className="text-sm ">
                Supplier Name
              </label>
              <div className="relative w-full">
                <Controller
                  name="supplier_name"
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => {
                    const { onChange, value } = field;
                    return (
                      <Autocomplete
                        value={
                          value
                            ? supplierOptions.find((option) => {
                                return value === option.id;
                              }) ?? null
                            : null
                        }
                        options={supplierOptions}
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
              <label htmlFor="purchase_date" className="text-sm ">
                Purchase Date
              </label>
              <div className="relative flex w-full">
                <Controller
                  name="purchase_date"
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
              <label htmlFor="product_name" className="text-sm ">
                Product Name
              </label>
              <div className="relative w-full">
                <Controller
                  name="product_name"
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => {
                    const { onChange, value } = field;
                    return (
                      <Autocomplete
                        value={
                          value
                            ? productOptions.find((option) => {
                                return value === option.id;
                              }) ?? null
                            : null
                        }
                        options={productOptions}
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
              <label htmlFor="quantity_return" className="text-sm ">
                Quantity Return
              </label>
              <div className="relative w-full">
                <input
                  type="text"
                  placeholder="Quantity Return"
                  className="bg-[#F5F7F9] p-3 text-sm border border-[#E5E5E5] rounded-md w-full outline-none"
                  required={true}
                  {...register("quantity_return", {
                    required: "This field is required",
                  })}
                />
              </div>
            </div>
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

export default AddPurchaseReturnForm;
