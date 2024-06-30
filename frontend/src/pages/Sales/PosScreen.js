import "./PosScreen.css";
import { useEffect, useRef, useState } from "react";
import Table from "../../components/table/Table";
import Modal from "../../global/Modal";
import DeleteOutlineOutlined from "@mui/icons-material/DeleteOutlineOutlined";
import ConfirmDelete from "../../global/ConfirmDelete";
import SearchIcon from "@mui/icons-material/Search";
import { Controller, useForm } from "react-hook-form";
import request from '../../requests/request';
import PosTable from "./PosTable";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import LocalAtmIcon from '@mui/icons-material/LocalAtm';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import { List, ListItem, ListItemText, Radio, RadioGroup } from "@mui/material";
import useEntityForm from "../../Hooks/useEntityForm";





const columns = [
  
  {
    field: "name",
    headerName: "Item Name",
    flex: 1,
    sortable: false,
    width:'200px',
    renderCell: (params) => (<span>{params.row.name}</span>),
  },
  {
    field: "barcode",
    headerName: "Barcode",
    flex: 1,
    sortable: false,
    renderCell: (params) => <span>{params.row.barcode}</span>,
  },
  {
    field: "description",
    headerName: "Description",
    flex: 1,
    sortable: false,
    renderCell: (params) => <span>{params.row.description}</span>,
  },
  {
    field: "quantity",
    headerName: "Quantity",
    flex: 1,
    sortable: false,
    renderCell: (params,handleDecrement,handleIncrement,index) => (
      <div className="flex items-center justify-center gap-2">
        <button className={`rounded-full ${params.row.quantity === 1  ? 'text-slate-700 bg-slate-400' : "text-primary border-2 border-primary"}  w-6 h-6 text-center font-bold`} onClick={()=>handleDecrement(params.row,params.row.id-1)} disabled={params.row.quantity === 1}>-</button>
        <span>{params.row.quantity}</span>
        <button className="rounded-full text-white bg-primary w-6 h-6 text-center font-bold" onClick={()=>handleIncrement(params.row,params.row.id-1)}>+</button>
      </div>
    ),
  },
  {
    field: "selling_price",
    headerName: "Price",
    flex: 1,
    sortable: false,
    renderCell: (params) => <span>${params.row.selling_price}</span>,
  },
  {
    field: "action",
    headerName: "Action",
    sortable: false,
    renderCell: (params,handleDeleteCartitem) => (
      <div className="flex items-center justify-center gap-2">
        <Modal>
          <Modal.Open opens="delete-form">
            <button className="bg-[#ff3a31] text-white rounded-md p-1" >
              <DeleteOutlineOutlined />
            </button>
          </Modal.Open>
          <Modal.Window name="delete-form">
            <ConfirmDelete handleDelete ={handleDeleteCartitem} id = {params.row.id}/>
          </Modal.Window>
        </Modal>
      </div>
    ),
  },
];

export const validatePhoneNumber = (value) => {
  const isValid = /^[0-9]*$/.test(value);
  return isValid || 'Please enter a valid phone number (only numbers allowed)';
};




function PosScreen() {
  
  const searchInput = useRef(null);
  const [cart, setCart] = useState([]);
  const [searchQueries,setSearchQueries] = useState([]);
  const [totalCost,setTotalCost] = useState(0)
  const [discount,setDiscount] = useState(0);
  const [cashRefund,setCashRefund] = useState(0);
  const [subTotal,setSubTotal] = useState(0);
  const token = useSelector((state) => state.auth.current.user.jwt);


  const { register, handleSubmit, reset, control , setValue , getValues  } = useForm({
    values: null,
  });

  // const {   result, onSubmit, isLoading, isSuccess } = useEntityForm({
  //   entity,
  //   id,
  //   false,
  // });

  const createRequest = async (data) => {
    console.log(data)
    return await request.createAndUpload({
      entity: 'sales/create',
      token: token,
      jsonData: data,
    });
  };

  async function onSubmit(event){
    try{
      const { cash_received } = event;
      

      if( subTotal > parseInt(cash_received)){
        toast.error("Please enter correct amount.")
        return;
      }

      const modifiedValues = {
        ...event,
        cash_refund: cashRefund,
        total_cost:totalCost,
        products: cart
      }

      const response = await createRequest(modifiedValues);

      if(response.success === true){
        setCart([]);
        setTotalCost(0);
        setDiscount(0);
        setCashRefund(0);
        setSubTotal(0);
        reset();
      }
      
    }catch(error){
      console.error(error)
    }
  }
  
  
  async function searchProducts(queryParam){
    const options = { query:queryParam }
    const response = await request.search({entity:'products/product/list-all',token:token,options});
    return response?.rows
  }

  async function checkProductQuantity(id,quantityToCheck){
    const jsonData = { quantity : quantityToCheck}
    const reponse = await request.patch({entity:`products/product/check-product-quantity/${id}`,jsonData,token:token})

    return reponse;
  }

  async function calculateTotalCost(){
    let newTotalCost = 0;
    cart.map((item)=>{
      newTotalCost += item.quantity *parseInt(item.selling_price)
    })

    setTotalCost(newTotalCost);
  }
  async function calculateSubTotal(){
    const newSubTotal = totalCost - discount
    setSubTotal(newSubTotal);
  }

  async function handleDecrement(val,index){

    // Find the object in the list
    const updatedObject = {...val};

    const checkQuantity = await checkProductQuantity(updatedObject.id , updatedObject.quantity-1);
    if(checkQuantity){
      updatedObject.quantity = updatedObject.quantity -1;    
      const updatedList = cart.map(item => 
        item.id === updatedObject.id ? updatedObject : item
      );;
      // Set the updated state
      setCart(updatedList);
    }

  }

  async function handleIncrement(val,index){
    // const updatedList = [...cart];

    // Find the object in the list
    const updatedObject = {...val};

    const checkQuantity = await checkProductQuantity(updatedObject.id , updatedObject.quantity+1);
    if(checkQuantity){
      updatedObject.quantity = updatedObject.quantity +1;    
      const updatedList = cart.map(item => 
        item.id === updatedObject.id ? updatedObject : item
      );;
      // Set the updated state
      setCart(updatedList);
    }
  }

  async function handleSearch(event){
    event.target.focus();
    const searchTerm = event.target.value.toLowerCase();
    let searchResults;
    if(searchTerm !== ""){
       searchResults = await searchProducts(searchTerm)      
    }else{
      searchResults = []
    }
  
    setSearchQueries(searchResults);
    
  }


  function handleAddCart(value,index){
    const valueExist = cart.find(item =>{
        return item.id === value.id;
    });

    if(valueExist){
      toast.error("Product Already Exist");
      return;
    }
  

    const newCart = [...cart , {...value,quantity:1}];

    setCart(newCart);
    setSearchQueries([]);
    searchInput.current.value ="";
  }

  function handleDeleteCartitem(id){
    console.log(id)
    const newCart = cart.filter(item=>(
      item.id !== id
    ));
    
    setCart(newCart)

  }

  useEffect(function(){
    calculateTotalCost();
  },[cart])

  useEffect(function(){
    calculateSubTotal();
  },[totalCost,discount])

  useEffect(function(){
    setCashRefund(getValues('cash_received') - totalCost )
  },[totalCost])


  return (
    <div className="px-4 py-6 text-sm">
      <div className="flex item-center justify-between flex-wrap gap-4">
        <div className="text-start">
          <h2 className="text-lg text-primary font-semibold">Point Of Sales</h2>
          <span className="text-sm">Manage Your Sales</span>
        </div>
      </div>
      <div className="bg-white rounded-md mt-6 p-5 shadow-md flex custom">
        <div className="w-full lg:w-4/6">
          <div className="py-2 px-6 flex flex-row flex-wrap items-center gap-6">
            {/* <button className="bg-primary whitespace-nowrap flex order-last md:order-1 items-center text-sm text-white rounded-md  px-4 py-2 shadow-md font-bold">
              Scan Barcode
            </button> */}
            <div className="flex   flex-1  flex-col relative md:order-2">
              <label className="flex items-center justify-center  relative ">
                <input
                  type="search"
                  className=" p-2 px-4  flex-1 text-sm border border-[#E5E5E5] rounded-s-md outline-none "
                  placeholder="Search by item,name or barcode"
                  onChange={(e) => handleSearch(e)}
                  ref={searchInput}
                />
                <button className="bg-primary flex items-center text-sm text-white rounded-e-md px-2 py-1.5 font-bold ">
                  <SearchIcon />
                </button>
              </label>
              {searchQueries.length > 0 && (
                <div className="w-full bg-white absolute top-full mt-1 shadow-md max-h-40 overflow-y-auto z-50 custom-scroll">
                  {searchQueries.map((item, index) => (
                    <li key={index} className="list-none p-2 text-sm cursor-pointer" onClick={()=>handleAddCart(item,index)}>
                      <div className="flex items-center justify-between">
                        <h1 className="text-left">{item.name}</h1>
                        <span>${item.selling_price}</span>
                      </div>
                      <h6 className="text-left text-xs text-gray-500">{item.description}</h6>
                    </li>
                  ))}
                </div>
              )}
            </div>
          </div>
          <div className="h-full flex flex-col gap-2">
             <div className="mb-3">
              <PosTable
                columns={columns}
                data={cart}
                handleDecrement={handleDecrement}
                handleIncrement={handleIncrement}
                handleDeleteCartitem = {handleDeleteCartitem}
              />
             </div>
          </div>
        </div>
        <div className="ml-5 lg:w-2/6">
          <form
            className="w-full flex flex-col gap-4"
            onSubmit={handleSubmit(onSubmit)}
          >
              <div className="text-lg text-primary font-bold">
                <span>Order List</span>
              </div>
              <div className="flex flex-col items-start justify-start gap-1 mt-5">
                <label
                  htmlFor="customer_name"
                  className='text-sm after:content-["*"] after:text-red-600'
                >
                 Customer Name
                </label>
                <div className="relative w-full">
                  <input
                    id="product"
                    type="text"
                    placeholder="Enter Customer Name"
                    className="bg-[#F5F7F9] p-3 text-sm border border-[#E5E5E5] rounded-md w-full outline-none"
                    required={true}
                    {...register("customer_name", {
                      required: "This field is required",
                    })}
                  />
                </div>
              </div>
              <div className="flex flex-col items-start justify-start gap-1 mt-5">
                <label
                  htmlFor="customer_name"
                  className='text-sm after:content-["*"] after:text-red-600'
                >
                 Phone Number
                </label>
                <div className="relative w-full">
                  <input
                    id="product"
                    type="text"
                    placeholder="Enter Phone Number"
                    className="bg-[#F5F7F9] p-3 text-sm border border-[#E5E5E5] rounded-md w-full outline-none"
                    required={true}
                    maxLength={11}
                    {...register("customer_phoneno", {
                      required: "This field is required",
                      validate: validatePhoneNumber,
                      maxLength:11
                    })}
                  />
                </div>
              </div>
              <div className="flex flex-col items-start justify-start gap-1 mt-5">
                <span>
                  Billing details
                </span>
                <ul className="w-full px-4 mt-6">
                  <li className="flex justify-between items-center py-2">
                     <span>Total Cost</span>
                     <span>${totalCost}</span>
                  </li>
                  <li className="flex justify-between items-center py-2">
                     <span>Discount</span>
                     <span>${discount}</span>
                  </li>
                </ul>
                
                <div className="w-full flex justify-between items-center font-bold border-t border-b py-2 text-lg" >
                  <span>Sub Total</span>
                  <span>${subTotal}</span>
                </div>
              </div>
              <div className="flex flex-col items-start justify-start gap-1 mt-5">
                <label
                  htmlFor="cash_recieved"
                  className='text-sm after:content-["*"] after:text-red-600'
                >
                 Cash Received
                </label>
                <div className="relative w-full">
                  <input
                    id="product"
                    type="text"
                    placeholder="Enter Cash Received"
                    className="bg-[#F5F7F9] p-3 text-sm border border-[#E5E5E5] rounded-md w-full outline-none"
                    required={true}
                    maxLength={11}
                    {...register("cash_received", {
                      required: "This field is required",
                      onChange:(event)=>{
                        if(event.target.value){
                          const cashReceived = parseInt(event.target.value);
                          setCashRefund(cashReceived-subTotal);
                        }
                      }
                    })}
                  />
                </div>
              </div>
              <div className="flex flex-col items-start justify-start gap-1 mt-5">
                <label
                  htmlFor="discount"
                  className='text-sm after:content-["*"] after:text-red-600'
                >
                 Discount
                </label>
                <div className="relative w-full">
                  <input
                    id="product"
                    type="text"
                    placeholder="Enter Discount"
                    className="bg-[#F5F7F9] p-3 text-sm border border-[#E5E5E5] rounded-md w-full outline-none"
                    required={true}
                    maxLength={11}
                    {...register("discount", {
                      required: "This field is required",
                      onChange:(event)=>{
                        if(event.target.value){
                        const discount = parseInt(event.target.value)
                        setDiscount(discount)
                        }
                      }
                    })}
                  />
                </div>
              </div>
              <div className="flex flex-col items-start justify-start gap-1 mt-5">
                  <div className="w-full flex justify-between items-center px-4">
                    <span>Cash Refund</span>
                    <span>${cashRefund}</span>
                  </div>
              </div>
              <div className="flex flex-col items-start justify-start gap-1 mt-5">
                <label
                  htmlFor="discount"
                  className='after:content-["*"] after:text-red-600 text-primary font-bold text-lg'
                >
                 Payment Method
                </label>
                <div className="relative w-full">
                  
                    <label className="text-primary cursor-pointer w-max h-max ">
                <Controller
                  name="payment_method"
                  control={control}
                  defaultValue=""  // Set default value if needed
                  render={({ field }) => (
                      <Radio 
                      {...field}
                      required
                        icon={<LocalAtmIcon className="text-primary" sx={{
                        height:'4 w-max h-maxrem',
                        width: '4rem',
                        fontSize: '3rem',
                        border: '1px solid #E5E5E5',
                        borderRadius: '0.5rem'
                        }} />}  
                        checkedIcon={
                        <LocalAtmIcon className="text-primary" sx={{
                          height:'4 w-max h-maxrem',
                          width: '4rem',
                          fontSize: '3rem',
                        
                          borderRadius: '0.5rem'
                        }} />
                        }
                        name="payment_method"
                        value="CASH"
                        
                      />
                    )}/>
                    </label>
                    <label className="text-primary cursor-pointer w-max h-max ">
                    <Controller
                  name="payment_method"
                  control={control}
                 
                  defaultValue=""  // Set default value if needed
                  render={({ field }) => (
                      <Radio 
                      required
                      {...field}
                        icon={<CreditCardIcon className="text-primary" sx={{
                        height:'4 w-max h-maxrem',
                        width: '4rem',
                        fontSize: '3rem',
                        border: '1px solid #E5E5E5',
                        borderRadius: '0.5rem'
                        }} />}  
                        checkedIcon={
                        <CreditCardIcon className="text-primary" sx={{
                          height:'4 w-max h-maxrem',
                          width: '4rem',
                          fontSize: '3rem',
                         
                          borderRadius: '0.5rem'
                        }} />
                        }
                        name="payment_method"
                        value={"DEBIT"}
                      />
                  )} />
                    </label>
                   

                </div>
              </div>
              <div className="w-full flex items-center justify-center mt-5">
                  <button type="submit" className="bg-primary w-96 text-center text-sm text-white rounded-md px-8 py-3 shadow-md">
                    Checkout
                  </button>
              </div>
              

          </form>

        </div>
      </div>
    </div>
  );
}

export default PosScreen;
