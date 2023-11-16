import { Outlet } from "react-router-dom";
import HeroImage from "../../Assests/images/Login@2x.png";

function AccountsLayout() {
  return (
    <div className="flex w-full h-full">
            <Outlet />
        
        <div className="hidden md:flex md:flex-auto fixed top-0 right-0 h-screen md:w-7/12">
            <img src={HeroImage} alt="money" className=" w-full object-cover" />
        </div>
    </div>
  )
}

export default AccountsLayout;