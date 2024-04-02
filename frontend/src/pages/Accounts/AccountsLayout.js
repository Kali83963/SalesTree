import { Outlet } from "react-router-dom";
import HeroImage from "../../Assests/images/Login@2x.png";

function AccountsLayout() {
  return (
    <div className="grid md:grid-cols-6 w-full h-screen overflow-y-auto gap-4">
        <div className=" lg:col-span-3 col-span-6 flex items-center">

            <Outlet />
        </div>
        
        <div className="hidden lg:block  lg:col-span-3  min-h-screen max-h-full">
            <div className="w-full h-full ">
              <img src={HeroImage} alt="money" className=" w-full h-full" />
              </div>
        </div>
    </div>
  )
}

export default AccountsLayout;