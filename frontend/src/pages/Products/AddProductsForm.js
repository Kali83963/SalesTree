import { TextareaAutosize } from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import SelectInput from "../../global/SelectInput";
import { Link, useNavigate, useParams } from "react-router-dom";
import useEntityForm from "../../Hooks/useEntityForm";
import FileInput from "../../components/FileInput/FileInput";
import request from '../../requests/request';
import Loading from "../../components/Loading/Loading";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

function AddProductsForm({ entity, isEditing }) {
  let { id } = useParams();

  const navigate = useNavigate();
  const token = useSelector((state) => state.auth.current.user.jwt);
  const [categories,setCategories] = useState([]);
  const [subCategories , setSubCategories] = useState([]);
  const [manufactures , setManufactures] = useState([]); 

  const { result, onSubmit, isLoading, isSuccess } = useEntityForm({
    entity,
    id,
    isEditing,
  });

  const { register, handleSubmit, reset, control , setValue } = useForm({
    values: result || null,
  });

  async function listCategories(){
    const response = await request.listAll({entity:'products/category',token})
    setCategories(response.rows)
  }
  async function listManufactures(){
    const response = await request.listAll({entity:'products/manufacture',token})
    setManufactures(response.rows)
  }

  async function listSubCategories(category){
    setValue('sub_category','');
    const response = await request.listAll({entity:'products/subcategory',token: token , options: { category : category}});
    setSubCategories(response?.rows || [])
  }

  useEffect(()=>{
    async function listData(){
      await listCategories()
      await listManufactures()
    }
    listData()
  },[])

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
            <h2 className="text-lg text-primary font-semibold">Add Product</h2>
            <span className="text-sm">You Can Add Your Product</span>
          </div>
        </div>
        <div className="bg-white rounded-md mt-6 p-5 shadow-md">
          <form
            className="w-full grid lg:grid-cols-3 md:grid-cols-2 gap-4"
            onSubmit={handleSubmit(onSubmit)}
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
                  {...register("name", {
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
                    data={categories}
                    control={control}
                    name="category"
                    {...register("category", {
                      required: "This field is required",
                      onChange:(event) => listSubCategories(event.target.value)
                    })}
                  />
                </div>

                <Link
                  to="/products/category/add"
                  className="bg-primary flex items-center text-sm text-white rounded-r-lg px-4 py-2 shadow-md whitespace-nowrap h-full "
                >
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
                    data={subCategories}

                    control={control}
                    name="subcategory"
                    {...register("sub_category", {
                      required: "This field is required",
                    })}
                  />
                </div>

                <Link
                  to="/products/subcategory/add"
                  className="bg-primary flex items-center text-sm text-white rounded-r-lg px-4 py-2 shadow-md whitespace-nowrap h-full "
                >
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
                  data={manufactures}
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
              <Controller
                control={control}
                name="file"
                render={({ field: { onChange, onBlur, value, ref } }) => (
                  <FileInput onChange={onChange} value={value} />
                )}
              />
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
              <button
                className="bg-white text-primary border text-sm rounded-md border-primary px-8 py-3 shadow-md"
                type="button"
                onClick={() => navigate(-1)}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </Loading>
  );
}

export default AddProductsForm;
