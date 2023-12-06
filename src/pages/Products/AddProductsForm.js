import { TextareaAutosize } from "@mui/material";
import { useForm } from "react-hook-form";
import SelectInput from "../../global/SelectInput";
import { useState } from "react";
import { Link } from "react-router-dom";

function AddProductsForm() {
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
    setValue("profile_image",file);

    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImagePreview(imageUrl);
    }
  }

  return (
    <div className="px-4 py-6 text-sm">
      <div className="flex item-center justify-between">
        <div className="text-start">
          <h2 className="text-lg text-primary font-semibold">Add Product</h2>
          <span className="text-sm">You Can Add Your Product</span>
        </div>
      </div>
      <div className="bg-white rounded-md mt-6 p-5 shadow-md">
        <form
          className="w-full grid lg:grid-cols-3 md:grid-cols-2 gap-4"
          onSubmit={handleSubmit(onSubmitLogin)}
        >
          <div className="flex flex-col items-start justify-start gap-1 mt-5">
            <label
              htmlFor="product"
              className='text-sm after:content-["*"] after:text-red-600'
            >
              Product Name
            </label>
            <div className="relative w-full">
              <input
                id="product"
                type="text"
                placeholder="Product Name"
                className="bg-[#F5F7F9] p-3 text-sm border border-[#E5E5E5] rounded-md w-full outline-none"
                required={true}
                {...register("product_name", {
                  required: "This field is required",
                })}
              />
            </div>
          </div>
          <div className="flex flex-col items-start justify-start gap-1 mt-5 ">
            <label
              htmlFor="category_name"
              className='text-sm after:content-["*"] after:text-red-600'
            >
              Category
            </label>
            <div className="relative w-full flex items-center basis-full">
                <div className="flex-1">
                    <SelectInput
                    data={["Electronics", "Fruit", "Appliances", "Utensils"]}
                    control={control}
                    name="category"
                    {...register("category", {
                    required: "This field is required",
                    })}
                />
                </div>
              
              <Link to="/products/category/add" className="bg-primary flex items-center text-sm text-white rounded-md px-4 py-2 shadow-md whitespace-nowrap ">
                + 
              </Link>
            </div>
          </div>
          <div className="flex flex-col items-start justify-start gap-1 mt-5">
            <label
              htmlFor="name"
              className='text-sm after:content-["*"] after:text-red-600'
            >
              Sub Category Name
            </label>
            <div className="relative w-full flex items-center basis-full">
                <div className="flex-1">
                    <SelectInput
                    data={["Electronics", "Fruit", "Appliances", "Utensils"]}
                    control={control}
                    name="subcategory"
                    {...register("sub_category", {
                    required: "This field is required",
                    })}
                />
                </div>
              
              <Link  to="/products/subcategory/add" className="bg-primary flex items-center text-sm text-white rounded-md px-4 py-2 shadow-md whitespace-nowrap ">
                + 
              </Link>
            </div>
          </div>
          <div className="flex flex-col items-start justify-start gap-1 mt-5">
            <label
              htmlFor="barcode"
              className='text-sm after:content-["*"] after:text-red-600'
            >
              Barcode
            </label>
            <div className="relative w-full">
              <input
                id="barcode"
                type="text"
                placeholder="Barcode"
                className="bg-[#F5F7F9] p-3 text-sm border border-[#E5E5E5] rounded-md w-full outline-none"
                required={true}
                {...register("barcode", {
                  required: "This field is required",
                })}
              />
            </div>
          </div>
          <div className="flex flex-col items-start justify-start gap-1 mt-5">
            <label
              htmlFor="manufacture"
              className='text-sm after:content-["*"] after:text-red-600'
            >
              Manufacture
            </label>
            <div className="relative w-full">
              <SelectInput
                data={["Electronics", "Fruit", "Appliances", "Utensils"]}
                control={control}
                name="manufacture"
                {...register("manufacture", {
                  required: "This field is required",
                })}
              />
            </div>
          </div>
          <div className="flex flex-col items-start justify-start gap-1 mt-5">
            <label
              htmlFor="price"
              className='text-sm after:content-["*"] after:text-red-600'
            >
              Selling Price
            </label>
            <div className="relative w-full">
              <input
                id="price"
                type="text"
                placeholder="selling price"
                className="bg-[#F5F7F9] p-3 text-sm border border-[#E5E5E5] rounded-md w-full outline-none"
                required={true}
                {...register("price", {
                  required: "This field is required",
                })}
              />
            </div>
          </div>
          <div className="flex flex-col items-start justify-start gap-1 mt-5">
            <label
              htmlFor="unit"
              className='text-sm after:content-["*"] after:text-red-600'
            >
              Unit
            </label>
            <div className="relative w-full">
              <input
                id="unit"
                type="text"
                placeholder="Unit"
                className="bg-[#F5F7F9] p-3 text-sm border border-[#E5E5E5] rounded-md w-full outline-none"
                required={true}
                {...register("unit", {
                  required: "This field is required",
                })}
              />
            </div>
          </div>
          <div className="flex flex-col items-start justify-start gap-1 mt-5">
            <label
              htmlFor="sku"
              className='text-sm after:content-["*"] after:text-red-600'
            >
              SKU
            </label>
            <div className="relative w-full">
              <input
                id="sku"
                type="text"
                placeholder="sku"
                className="bg-[#F5F7F9] p-3 text-sm border border-[#E5E5E5] rounded-md w-full outline-none"
                required={true}
                {...register("sku", {
                  required: "This field is required",
                })}
              />
            </div>
          </div>
          <div className="flex flex-col items-start gap-2 mt-6 col-span-full">
            <span className='after:content-["*"] after:text-red-600 text-sm'>
              Profile Image
            </span>
            <div className="w-full flex flex-col lg:flex-row gap-4">
              <label
                for="dropzone-file"
                className="flex flex-col items-center justify-center w-max-xl lg:w-3/6 h-44 cursor-pointer rounded-md bg-[#F5F7F9] border border-[#E5E5E5] text-[#313131] text-sm"
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
          <div className="flex flex-col items-start justify-start gap-1 mt-5 col-span-full">
            <label
              htmlFor="description"
              className='text-sm after:content-["*"] after:text-red-600'
            >
              Description
            </label>
            <div className="relative w-full w-max-xl lg:w-3/6">
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
          <div className="flex gap-4 col-span-full">
            <button className="bg-primary flex items-center text-sm text-white rounded-md px-8 py-3 shadow-md">
              Save
            </button>
            <button className="bg-white text-primary border text-sm rounded-md border-primary px-8 py-3 shadow-md">
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddProductsForm;
