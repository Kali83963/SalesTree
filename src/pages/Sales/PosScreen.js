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

const data = [
  {
    id: 1,
    item_name: "Item 1",
    barcode: "0123456789011",
    description: "Description for Item 1",
    price: 25.99,
    quantity: 2
  },
  {
    id: 2,
    item_name: "Item 2",
    barcode: "1234567890122",
    description: "Description for Item 2",
    price: 19.99,
    quantity: 2
  },
  {
    id: 3,
    item_name: "Item 3",
    barcode: "2345678901233",
    description: "Description for Item 3",
    price: 32.49,
    quantity: 2
  },
  {
    id: 4,
    item_name: "Item 4",
    barcode: "3456789012344",
    description: "Description for Item 4",
    price: 12.99,
    quantity: 2
  },
  {
    id: 5,
    item_name: "Item 5",
    barcode: "4567890123455",
    description: "Description for Item 5",
    price: 44.99,
    quantity: 2
  },
  {
    id: 6,
    item_name: "Item 6",
    barcode: "5678901234566",
    description: "Description for Item 6",
    price: 8.75,
    quantity: 2
  },
  {
    id: 7,
    item_name: "Item 7",
    barcode: "6789012345677",
    description: "Description for Item 7",
    price: 17.5,
    quantity: 2
  },
  {
    id: 8,
    item_name: "Item 8",
    barcode: "7890123456788",
    description: "Description for Item 8",
    price: 39.99,
    quantity: 2
  },
  {
    id: 9,
    item_name: "Item 9",
    barcode: "8901234567899",
    description: "Description for Item 9",
    price: 21.99,
    quantity: 2
  },
  {
    id: 10,
    item_name: "Item 10",
    barcode: "9012345678900",
    description: "Description for Item 10",
    price: 13.25,
    quantity: 2
  },
  {
    id: 11,
    item_name: "Item 11",
    barcode: "0123456789012",
    description: "Description for Item 11",
    price: 29.99,
    quantity: 2
  },
  {
    id: 12,
    item_name: "Item 12",
    barcode: "1234567890123",
    description: "Description for Item 12",
    price: 36.5,
    quantity: 2
  },
  {
    id: 13,
    item_name: "Item 13",
    barcode: "2345678901234",
    description: "Description for Item 13",
    price: 9.99,
    quantity: 2
  },
  {
    id: 14,
    item_name: "Item 14",
    barcode: "3456789012345",
    description: "Description for Item 14",
    price: 18.49,
    quantity: 2
  },
  {
    id: 15,
    item_name: "Item 15",
    barcode: "4567890123456",
    description: "Description for Item 15",
    price: 42.99,
    quantity: 2
  }
];



const columns = [
  
  {
    field: "item_name",
    headerName: "Item Name",
    flex: 1,
    sortable: false,
    width:'200px',
    renderCell: (params) => (<span>{params.row.item_name}</span>),
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
        <button className={`rounded-full ${params.row.quantity === 1 ? 'text-slate-700 bg-slate-400' : "text-primary border-2 border-primary"}  w-6 h-6 text-center font-bold`} onClick={()=>handleDecrement(params.row,params.row.id-1)} disabled={params.row.quantity === 1}>-</button>
        <span>{params.row.quantity}</span>
        <button className="rounded-full text-white bg-primary w-6 h-6 text-center font-bold" onClick={()=>handleIncrement(params.row,params.row.id-1)}>+</button>
      </div>
    ),
  },
  {
    field: "price",
    headerName: "Price",
    flex: 1,
    sortable: false,
    renderCell: (params) => <span>${params.row.price}</span>,
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
            <ConfirmDelete handleDelete ={handleDeleteCartitem} value = {params.row}/>
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
  const [cart, setCart] = useState(data);
  const [searchQueries,setSearchQueries] = useState([]);
  const [discount,setDiscount] = useState(null);
  
  console.log(discount);
  


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
        <div className="w-full lg:w-4/6">
          <div className="py-2  px-4 flex flex-row flex-wrap items-center gap-6">
            <button className="bg-primary whitespace-nowrap flex order-last md:order-1 items-center text-sm text-white rounded-md  px-4 py-2 shadow-md font-bold">
              Scan Barcode
            </button>
            <div className="flex w-72 flex-col relative md:order-2">
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
             <div className="mb-3">
              <PosTable
                columns={columns}
                data={cart}
                handleDecrement={handleDecrement}
                handleIncrement={handleIncrement}
                handleDeleteCartitem = {handleDeleteCartitem}
              />
             </div>
             <hr className="bg-[#e5e7eb] h-0.5"/>
             <div className="flex items-center gap-4  py-4">
                <button className="bg-white text-primary border text-sm rounded-md border-primary px-7 py-3 shadow-md">
                  Save
                </button>
                <Modal>
                  <Modal.Open opens="discount-form">
                  <button className="bg-primary flex items-center text-sm text-white rounded-md px-7 py-3 shadow-md">
                    Discount
                  </button>
                  </Modal.Open>
                  <Modal.Window name="discount-form"  >
                    <div className="flex items-center justify-center flex-col w-full">
                      <h1 className="text-primary">Discount</h1>
                      <input
                        type="number"
                        placeholder="Enter Discount" 
                        className="bg-[#F5F7F9] p-3 text-sm border border-[#E5E5E5] rounded-md w-full outline-none"
                        value={discount}
                        onChange={(e)=>setDiscount(e.target.value)}
                        
                      />
                      
                    </div>
                  </Modal.Window>
                </Modal>
                
                <button className="bg-white text-primary border text-sm rounded-md border-primary px-7 py-3 shadow-md">
                  Clear All
                </button>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PosScreen;
