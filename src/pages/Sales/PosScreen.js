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

const columns = [
  {
    field: "item_name",
    headerName: "Item Name",
    flex: 1,
    sortable: false,
    renderCell: (params) => <span>{params.row.item_name}</span>,
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
    headerName: "Status",
    flex: 1,
    sortable: false,
    renderCell: (params) => (
      <div>
        <span>{params.row.quantity}</span>
      </div>
    ),
  },
  {
    field: "price",
    headerName: "Price",
    flex: 1,
    sortable: false,
    renderCell: (params) => <span>{params.row.price}</span>,
  },
  {
    field: "action",
    headerName: "Action",
    sortable: false,
    renderCell: (params) => (
      <div className="flex items-center justify-between gap-2">
        <Modal>
          <Modal.Open opens="delete-form">
            <button className="bg-[#ff3a31] text-white rounded-md p-1">
              <DeleteOutlineOutlined />
            </button>
          </Modal.Open>
          <Modal.Window name="delete-form">
            <ConfirmDelete />
          </Modal.Window>
        </Modal>
      </div>
    ),
  },
];

function PosScreen() {
  const cashCheckboxLabelRef = useRef(null);
  const debitCheckboxLabelRef = useRef(null);
  const [cart, setCart] = useState([]);

  var total = 0;
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

  return (
    <div className="px-4 py-6 text-sm">
      <div className="flex item-center justify-between flex-wrap gap-4">
        <div className="text-start">
          <h2 className="text-lg text-primary font-semibold">Point Of Sales</h2>
          <span className="text-sm">Manage Your Sales</span>
        </div>
      </div>
      <div className="bg-white rounded-md mt-6 p-5 shadow-md flex">
        <div className="w-4/6 h-max">
          <div className="py-2  px-4 flex items-center gap-6">
            <button className="bg-primary flex items-center text-sm text-white rounded-md  px-4 py-2 shadow-md font-bold">
              Scan Barcode
            </button>
            <label className="flex items-center justify-center shadow-md rounded-md relative ">
              <input
                type="search"
                className="bg-[#F5F7F9] p-2 w-72 text-sm border border-[#E5E5E5] rounded-md outline-none "
                placeholder="Search by item,name or barcode"
              />
              <button className="bg-primary flex items-center text-sm text-white rounded-md px-2 py-1.5 font-bold absolute right-0">
                <SearchIcon />
              </button>
            </label>
          </div>

          <Table
            columns={columns}
            data={[]}
            showToolbar={false}
            showCheckboxSelection={false}
            showPagination={false}
          />
        </div>
        <div className=" w-2/6 pl-6 py-2">
          <div className="flex items-center justify-between">
            <h2 className="text-primary font-bold">Order List</h2>
            <span>
              Invoice: <span className="font-bold">#65565</span>
            </span>
          </div>
          <div>
            <form>
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
                    type="text"
                    maxLength="11" // Limit the input to 11 digits
                    inputMode="numeric"
                    pattern="[0-9]*"
                    placeholder="Enter Phone number"
                    className="bg-[#F5F7F9] p-3 text-sm border border-[#E5E5E5] rounded-md w-full outline-none"
                    required={true}
                    {...register("phone_no", {
                      required: "This field is required",
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
                          type="text"
                          maxLength="11" // Limit the input to 11 digits
                          inputMode="numeric"
                          pattern="[0-9]*"
                          readOnly
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
