import { useRef } from "react";
import { useForm } from "react-hook-form";
import { validatePhoneNumber } from "./PosScreen";
import dollarCurrency from "../../Assests/images/dollor-currency.svg";
import CreditCardIcon from "../../Assests/images/credit-card.svg";

function PosFom({data}) {
  const cashCheckboxLabelRef = useRef(null);
  const debitCheckboxLabelRef = useRef(null);
  
  const { cart } = data;
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

  return (
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
  )
}

export default PosFom