import "./PosScreen.css";
import { useRef, useState } from "react";
import Table from "../../components/table/Table";
import Modal from "../../global/Modal";
import DeleteOutlineOutlined from "@mui/icons-material/DeleteOutlineOutlined";
import ConfirmDelete from "../../global/ConfirmDelete";
import SearchIcon from "@mui/icons-material/Search";
import dollarCurrency from "../../Assests/images/dollor-currency.svg";
import CreditCardIcon from "../../Assests/images/credit-card.svg";
import { useForm } from "react-hook-form";
import PosTable from "./PosTable";
import { toast } from "react-toastify";

const columns = [
  {
    field: "item_name",
    headerName: "Item Name",
    flex: 1,
    sortable: false,
    width:'200px',
    renderCell: (params) => <span>{params.item_name}</span>,
  },
  {
    field: "barcode",
    headerName: "Barcode",
    flex: 1,
    sortable: false,
    renderCell: (params) => <span>{params.barcode}</span>,
  },
  {
    field: "description",
    headerName: "Description",
    flex: 1,
    sortable: false,
    renderCell: (params) => <span>{params.description}</span>,
  },
  {
    field: "quantity",
    headerName: "Quantity",
    flex: 1,
    sortable: false,
    renderCell: (params,handleDecrement,handleIncrement,index) => (
      <div className="flex items-center justify-center gap-2">
        <button className={`rounded-full ${params.quantity === 1 ? 'text-slate-700 bg-slate-400' : "text-primary border-2 border-primary"}  w-6 h-6 text-center font-bold`} onClick={()=>handleDecrement(params,index)} disabled={params.quantity === 1}>-</button>
        <span>{params.quantity}</span>
        <button className="rounded-full text-white bg-primary w-6 h-6 text-center font-bold" onClick={()=>handleIncrement(params,index)}>+</button>
      </div>
    ),
  },
  {
    field: "price",
    headerName: "Price",
    flex: 1,
    sortable: false,
    renderCell: (params) => <span>${params.price}</span>,
  },
  {
    field: "action",
    headerName: "Action",
    sortable: false,
    renderCell: (handleDeleteCartitem,value) => (
      <div className="flex items-center justify-center gap-2">
        <Modal>
          <Modal.Open opens="delete-form">
            <button className="bg-[#ff3a31] text-white rounded-md p-1" >
              <DeleteOutlineOutlined />
            </button>
          </Modal.Open>
          <Modal.Window name="delete-form">
            <ConfirmDelete handleDelete ={handleDeleteCartitem} value = {value}/>
          </Modal.Window>
        </Modal>
      </div>
    ),
  },
];

const validatePhoneNumber = (value) => {
  const isValid = /^[0-9]*$/.test(value);
  return isValid || 'Please enter a valid phone number (only numbers allowed)';
};

// const data = [
//   {
//     item_name: "BlueWow BT09 Wireless HeadPhone",
//     barcode: "01254300113344",
//     description: "Wireless Headphone",
//     price: 100.8,
//   },
//   {
//     item_name: "BlueWow BT09 Wireless HeadPhone",
//     barcode: "01254300113344",
//     description: "Wireless Headphone",
//     price: 100.8,
//   },
// ];
 
const data = [
  {
    item_name: "Item 1",
    barcode: "0123456789011",
    description: "Description for Item 1",
    price: 25.99,
    quantity:2
  },
  {
    item_name: "Item 2",
    barcode: "1234567890122",
    description: "Description for Item 2",
    price: 19.99,
    quantity:2
  },
  {
    item_name: "Item 3",
    barcode: "2345678901233",
    description: "Description for Item 3",
    price: 32.49,
    quantity:2
  },
  {
    item_name: "Item 4",
    barcode: "3456789012344",
    description: "Description for Item 4",
    price: 12.99,
    quantity:2
  },
  {
    item_name: "Item 5",
    barcode: "4567890123455",
    description: "Description for Item 5",
    price: 44.99,
    quantity:2
  },
  {
    item_name: "Item 6",
    barcode: "5678901234566",
    description: "Description for Item 6",
    price: 8.75,
    quantity:2
  },
  {
    item_name: "Item 7",
    barcode: "6789012345677",
    description: "Description for Item 7",
    price: 17.5,
    quantity:2
  },
  {
    item_name: "Item 8",
    barcode: "7890123456788",
    description: "Description for Item 8",
    price: 39.99,
    quantity:2
  },
  {
    item_name: "Item 9",
    barcode: "8901234567899",
    description: "Description for Item 9",
    price: 21.99,
    quantity:2
  },
  {
    item_name: "Item 10",
    barcode: "9012345678900",
    description: "Description for Item 10",
    price: 13.25,
    quantity:2
  },
  {
    item_name: "Item 11",
    barcode: "0123456789012",
    description: "Description for Item 11",
    price: 29.99,
    quantity:2
  },
  {
    item_name: "Item 12",
    barcode: "1234567890123",
    description: "Description for Item 12",
    price: 36.5,
    quantity:2
  },
  {
    item_name: "Item 13",
    barcode: "2345678901234",
    description: "Description for Item 13",
    price: 9.99,
    quantity:2
  },
  {
    item_name: "Item 14",
    barcode: "3456789012345",
    description: "Description for Item 14",
    price: 18.49,
    quantity:2
  },
  {
    item_name: "Item 15",
    barcode: "4567890123456",
    description: "Description for Item 15",
    price: 42.99,
    quantity:2
  },
];

function PosScreen() {
  const cashCheckboxLabelRef = useRef(null);
  const debitCheckboxLabelRef = useRef(null);
  const searchInput = useRef(null);
  const [cart, setCart] = useState(data);
  const [searchQueries,setSearchQueries] = useState([]);

  var total = Math.round(cart.reduce((accumulator, currentItem) => accumulator + currentItem.price * currentItem.quantity, 0),2);
  var sales_tax = 0;
  var discount = 0;

  var sub_total = total + sales_tax + discount;

  var cash_refund = 0;

  const {
    register,
    handleSubmit,
    reset,
    getValues,
    setValue,
    formState,
    control,
  } = useForm({
    defaultValues: {},
  });

  function onSubmitLogin(data) {
    console.log(data);
  }

  function handleDecrement(val,index){
    const updatedList = [...cart];

    // Find the object in the list
    const updatedObject = {...val};

    updatedObject.quantity = updatedObject.quantity -1;    
    updatedList[index] = updatedObject;
    // Set the updated state
    setCart(updatedList);
  }

  function handleIncrement(val,index){
    const updatedList = [...cart];

    // Find the object in the list
    const updatedObject = {...val};

    updatedObject.quantity = updatedObject.quantity +1;    
    updatedList[index] = updatedObject;
    // Set the updated state
    setCart(updatedList);
  }

  function handleSearch(event){
    event.target.focus();
    const searchTerm = event.target.value.toLowerCase();
    let searchResults;
    if(searchTerm !== ""){
      searchResults = data.filter(item => {
        const itemNameLower = item.item_name.toLowerCase();
        const barcodeLower = item.barcode.toLowerCase();
        return itemNameLower.includes(searchTerm) || barcodeLower.includes(searchTerm);
      });
    }else{
      searchResults = []
    }
    


    setSearchQueries(searchResults);
    
  }

  function handleAddCart(value,index){
    const valueExist = cart.find(item =>{
        return item.item_name === value.item_name;
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

  function handleDeleteCartitem(value){
    const newCart = cart.filter(item=>(
      item.item_name !== value.item_name && item.barcode !== value.barcode
    ));
    
    setCart(newCart)

  }


  return (
    <div className="px-4 py-6 text-sm">
      <div className="flex item-center justify-between flex-wrap gap-4">
        <div className="text-start">
          <h2 className="text-lg text-primary font-semibold">Point Of Sales</h2>
          <span className="text-sm">Manage Your Sales</span>
        </div>
      </div>
      <div className="bg-white rounded-md mt-6 p-5 shadow-md flex h-100 custom">
        <div className="w-4/6 ">
          <div className="py-2  px-4 flex items-center gap-6">
            <button className="bg-primary flex items-center text-sm text-white rounded-md  px-4 py-2 shadow-md font-bold">
              Scan Barcode
            </button>
            <div className="flex flex-col relative">
              <label className="flex items-center justify-center shadow-md rounded-md relative ">
                <input
                  type="search"
                  className="bg-[#F5F7F9] p-2 w-72 text-sm border border-[#E5E5E5] rounded-md outline-none "
                  placeholder="Search by item,name or barcode"
                  onChange={(e) => handleSearch(e)}
                  ref={searchInput}
                />
                <button className="bg-primary flex items-center text-sm text-white rounded-md px-2 py-1.5 font-bold absolute right-0">
                  <SearchIcon />
                </button>
              </label>
              {searchQueries.length > 0 && (
                <div className="w-full bg-white absolute top-full mt-1 shadow-md max-h-40 overflow-y-auto z-50 custom-scroll">
                  {searchQueries.map((item, index) => (
                    <li key={index} className="list-none p-2 text-sm cursor-pointer" onClick={()=>handleAddCart(item,index)}>
                      <div className="flex items-center justify-between">
                        <h1 className="text-left">{item.item_name}</h1>
                        <span>${item.price}</span>
                      </div>
                      <h6 className="text-left text-xs text-gray-500">{item.description}</h6>
                    </li>
                  ))}
                </div>
              )}
            </div>
          </div>
          <div className="h-full flex flex-col gap-2">
            <div className="h-90 overflow-auto mb-3 custom-scroll">
              <PosTable
                columns={columns}
                data={cart}
                handleDecrement={handleDecrement}
                handleIncrement={handleIncrement}
                handleDeleteCartitem = {handleDeleteCartitem}
              />
             </div>
             <hr className="bg-[#e5e7eb] h-0.5"/>
             <div className="flex items-center gap-4 p-2">
                <button className="bg-white text-primary border text-sm rounded-md border-primary px-4 py-2 shadow-md">
                  Save
                </button>
                <Modal>
                  <Modal.Open opens="discount-form">
                  <button className="bg-primary flex items-center text-sm text-white rounded-md px-4 py-2 shadow-md">
                    Discount
                  </button>
                  </Modal.Open>
                  <Modal.Window name="discount-form"  >
                    <div className="flex items-center justify-center flex-col w-full">
                      <h1 className="text-primary">Discount</h1>
                      <input
                        type="text"
                        placeholder="Enter Discount"
                        className="bg-[#F5F7F9] p-3 text-sm border border-[#E5E5E5] rounded-md w-full outline-none"
                        required={true}
                        {...register("discount",)}
                      />
                      
                    </div>
                  </Modal.Window>
                </Modal>
                
                <button className="bg-white text-primary border text-sm rounded-md border-primary px-4 py-2 shadow-md">
                  Clear All
                </button>
             </div>
         
          </div>

          

        </div>
        <div className=" w-2/6 pl-6 py-2">
          <div className="flex items-center justify-between">
            <h2 className="text-primary font-bold">Order List</h2>
            <span>
              Invoice: <span className="font-bold">#65565</span>
            </span>
          </div>
          <div>
            <form onSubmit={handleSubmit(onSubmitLogin)}>
              <div className="flex flex-col items-start justify-start gap-1 mt-5">
                <label htmlFor="name" className="text-sm">
                  Customer Name
                </label>
                <div className="relative w-full">
                  <input
                    id="name"
                    type="text"
                    placeholder="Customer name"
                    className="bg-[#F5F7F9] p-3 text-sm border border-[#E5E5E5] rounded-md w-full outline-none"
                    required={true}
                    {...register("customer_name", {
                      required: "This field is required",
                    })}
                  />
                </div>
              </div>
              <div className="flex flex-col items-start justify-start gap-1 mt-5">
                <label htmlFor="name" className="text-sm">
                  Phone Number
                </label>
                <div className="relative w-full">
                  <input
                    type="number"
                    maxLength="11"
                    placeholder="Enter Phone number"
                    className="bg-[#F5F7F9] p-3 text-sm border border-[#E5E5E5] rounded-md w-full outline-none"
                    required={true}
                    {...register("phone_no", {
                      required: "This field is required",
                      validate: validatePhoneNumber,
                    })}
                  />
                </div>
                <div className="flex flex-col items-start justify-start gap-1 mt-5 w-full">
                  <span>Billing details</span>
                  <div className="bg-[#F5F7F9] p-3 flex flex-col gap-3 text-sm border border-[#E5E5E5] rounded-md w-full">
                    <p className="flex items-center justify-between">
                      <span>Total Amount</span>
                      <span>${total}</span>
                    </p>
                    <p className="flex items-center justify-between">
                      <span>Sales Tax</span>
                      <span>${sales_tax}</span>
                    </p>
                    <p className="flex items-center justify-between">
                      <span>Discount</span>
                      <span>${discount}</span>
                    </p>
                    <p className="flex items-center justify-between text-lg font-bold border-y py-2">
                      <span>Discount</span>
                      <span>${discount}</span>
                    </p>

                    <div className="flex flex-col items-start justify-start gap-1">
                      <label htmlFor="name" className="text-sm">
                        Cash Recieved
                      </label>
                      <div className="relative w-full">
                        <input
                          type="number"
                          className="bg-white p-3 text-sm border border-[#E5E5E5] rounded-md w-full outline-none"
                          required={true}
                          {...register("cash_recieved", {
                            required: "This field is required",
                          })}
                        />
                      </div>
                    </div>
                    <p className="flex items-center justify-between">
                      <span>Cash Refund</span>
                      <span className="font-bold">${discount}</span>
                    </p>
                  </div>
                  <div>
                    <div className="flex flex-col items-start justify-start gap-1 my-5 w-full ">
                      <label className="text-sm">Payment Method</label>
                      <div className="relative w-full flex gap-5 items-center mt-2">
                        <label
                          className="cursor-pointer bg-[#F5F7F9] px-6 py-3 text-sm border border-[#E5E5E5] rounded-md"
                          ref={cashCheckboxLabelRef}
                        >
                          <img
                            src={dollarCurrency}
                            alt=""
                            className="text-primary"
                          />
                          <span className="text-xs">Cash</span>
                          <input
                            type="radio"
                            value="cash"
                            name="payment_method"
                            className="hidden"
                            {...register("payment_method")}
                            onChange={(event) => {
                              cashCheckboxLabelRef.current.classList.toggle(
                                "border-primary",
                                event.target.checked
                              );
                              if (
                                debitCheckboxLabelRef.current.classList.contains(
                                  "border-primary"
                                )
                              ) {
                                debitCheckboxLabelRef.current.classList.toggle(
                                  "border-primary"
                                );
                              }
                            }}
                          />
                        </label>

                        <label
                          className="cursor-pointer bg-[#F5F7F9] p-3 flex flex-col items-center justify-center text-sm border border-[#E5E5E5] rounded-md"
                          ref={debitCheckboxLabelRef}
                        >
                          <img
                            src={CreditCardIcon}
                            alt=""
                            className="text-primary"
                          />
                          <span className="text-xs">Debit Card</span>
                          <input
                            type="radio"
                            value="debit"
                            name="payment_method"
                            className="hidden"
                            {...register("payment_method")}
                            onChange={(event) => {
                              if (
                                cashCheckboxLabelRef.current.classList.contains(
                                  "border-primary"
                                )
                              ) {
                                cashCheckboxLabelRef.current.classList.toggle(
                                  "border-primary"
                                );
                              }
                              debitCheckboxLabelRef.current.classList.toggle(
                                "border-primary",
                                event.target.checked
                              );
                            }}
                          />
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
                <button className="bg-primary flex items-center justify-center text-sm text-white rounded-md px-8 py-3 shadow-md w-full">
                  Checkout
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
          
    </div>
  );
}

export default PosScreen;
