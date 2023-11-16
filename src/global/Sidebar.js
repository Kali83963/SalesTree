import { NavLink } from "react-router-dom";
import Logo from '../Assests/images/Group 60223.png';
import { CalculatorIcon, ChartBarIcon, ChartBarSquareIcon, CubeIcon, CurrencyDollarIcon, DocumentTextIcon, MapPinIcon, PowerIcon, ShoppingBagIcon, ShoppingCartIcon, Squares2X2Icon,TagIcon, UserGroupIcon, UserIcon, UsersIcon} from "@heroicons/react/24/outline";

function SideBar(){


    return(
        <div className="fixed z-50 w-56 h-full overflow-scroll transition duration-200 ease-in-out text-[#313131] bg-white sidebar">
            <div className="px-6 py-3">
                <img src={Logo} alt="logo"/>
            </div>
            <hr style={{backgroundColor:"#00000012"}}/>
            <ul className="p-2 pl-2">
                <li className="flex flex-col items-start px-2 py-1">
                    <span className="font-semibold text-sm">Main</span>
                    <ul className="ml-3 py-1 flex flex-col gap-2">
                        <NavLink to="/" className={({isActive}) => (`flex gap-3 text-sm ${ isActive && ('text-primary font-semibold')}`)}>
                            <Squares2X2Icon className="h-6"/>
                            <span>DashBoard</span>
                        </NavLink>
                    
                    </ul>
                </li>
                <hr />
                <li className="flex flex-col items-start px-2 py-1">
                    <span className="font-semibold text-sm">Products</span>
                    <ul className="ml-3 py-1 flex flex-col gap-2">
                        <NavLink to="products/category" className={({isActive}) => (`flex gap-3 text-sm ${ isActive && ('text-primary font-semibold')}`)}>
                            <Squares2X2Icon className="h-6"/>
                            <span>Category</span>
                        </NavLink>
                        <NavLink to="products/subcategory" className={({isActive}) => (`flex gap-3 text-sm ${ isActive && ('text-primary font-semibold')}`)}>
                            <Squares2X2Icon className="h-6" />
                            <span>Sub Category</span>
                        </NavLink>
                        <NavLink to="products/product" className={({isActive}) => (`flex gap-3 text-sm ${ isActive && ('text-primary font-semibold')}`)}>
                            
                            <CubeIcon className="h-6" />
                            <span>Products</span> 
                        </NavLink>
                        <NavLink to="products/manufacture" className={({isActive}) => (`flex gap-3 text-sm ${ isActive && ('text-primary font-semibold')}`)}>
                            
                            <TagIcon className="h-6" />
                            <span>Manufacture</span>  
                        </NavLink>
                    </ul>
                </li>
                <hr />
                <li className="flex flex-col items-start px-2 py-1">
                    <span className="font-semibold text-sm">Purchase</span>
                    <ul className="ml-3 py-1 flex flex-col gap-2">
                        <NavLink to="purchase/" className={({isActive}) => (`flex gap-3 text-sm ${ isActive && ('text-primary font-semibold')}`)}>
                            
                            <ShoppingBagIcon className="h-6" />
                            <span>Purchase</span> 
                        </NavLink>
                        <NavLink to="purchase/return" className={({isActive}) => (`flex gap-3 text-sm ${ isActive && ('text-primary font-semibold')}`)}>
                            
                            <ShoppingCartIcon className="h-6" />
                            <span>Purchase Return</span> 
                        </NavLink>
                    </ul>
                </li>
                <hr />
                <li className="flex flex-col items-start px-2 py-1">
                    <span className="font-semibold text-sm">Sales</span>
                    <ul className="ml-3 py-1 flex flex-col gap-2">
                        <NavLink to="sales/" className={({isActive}) => (`flex gap-3 text-sm ${ isActive && ('text-primary font-semibold')}`)}>
                            
                            <ChartBarIcon className="h-6" />
                            <span>Sales</span>
                        </NavLink>
                        <NavLink to="sales/return" className={({isActive}) => (`flex gap-3 text-sm ${ isActive && ('text-primary font-semibold')}`)}>
                            
                            <ChartBarSquareIcon className="h-6" />
                            <span>Sales Return</span>
                        </NavLink>
                        <NavLink to="sales/pos" className={({isActive}) => (`flex gap-3 text-sm ${ isActive && ('text-primary font-semibold')}`)}>
                            
                            <CalculatorIcon className="h-6" />
                            <span>POS</span>  
                        </NavLink>
                    </ul>
                </li>
                <hr />
                <li className="flex flex-col items-start px-2 py-1">
                    <span className="font-semibold text-sm">Expense</span>
                    <ul className="ml-3 py-1 flex flex-col gap-2">
                        <NavLink to="/expense/" className={({isActive}) => (`flex gap-3 text-sm ${ isActive && ('text-primary font-semibold')}`)}>
                            
                            <CurrencyDollarIcon className="h-6" />
                            <span>Expense</span>   
                        </NavLink>
                        <NavLink to="/expense/category" className={({isActive}) => (`flex gap-3 text-sm ${ isActive && ('text-primary font-semibold')}`)}>
                            
                            <Squares2X2Icon className="h-6" />
                            <span>Expense Category</span>  
                        </NavLink>
                        
                        
                    </ul>
                </li>
                <hr />
                <li className="flex flex-col items-start px-2 py-1">
                    <span className="font-semibold text-sm">People</span>
                    <ul className="ml-3 py-1 flex flex-col gap-2">
                        <NavLink to="people/manageuser" className={({isActive}) => (`flex gap-3 text-sm ${ isActive && ('text-primary font-semibold')}`)}>
                            
                            <UserGroupIcon className="h-6" />
                            <span>Manage Users</span>   
                        </NavLink>
                        <NavLink to="people/supplier" className={({isActive}) => (`flex gap-3 text-sm ${ isActive && ('text-primary font-semibold')}`)}>
                            
                            <UserIcon className="h-6" />
                            <span>Suppliers</span>   
                        </NavLink>
                        <NavLink to="people/customer" className={({isActive}) => (`flex gap-3 text-sm ${ isActive && ('text-primary font-semibold')}`)}>
                            
                            <UsersIcon className="h-6" />
                            <span>Customers</span>       
                        </NavLink>
                    </ul>
                </li>
                <hr />
                <li className="flex flex-col items-start px-2 py-1">
                    <span className="font-semibold text-sm">Settings</span>
                    <ul className="ml-3 py-1 flex flex-col gap-2">
                        <NavLink to="settings/tax" className={({isActive}) => (`flex gap-3 text-sm ${ isActive && ('text-primary font-semibold')}`)}>
                            
                            <DocumentTextIcon className="h-6" />
                            <span>Tax Rates</span>       
                        </NavLink>
                        <NavLink to="settings/" className={({isActive}) => (`flex gap-3 text-sm ${ isActive && ('text-primary font-semibold')}`)}>
                            
                            <MapPinIcon className="h-6" />
                            <span>Location</span>       
                        </NavLink>
                        <NavLink to="people/customer" className={({isActive}) => (`flex gap-3 text-sm ${ isActive && ('text-primary font-semibold')}`)}>
                            
                            <PowerIcon className="h-6" />
                            <span>Log Out</span>        
                        </NavLink>
                        
                    </ul>   
                </li>
            </ul>
        </div>
    )
};

export default SideBar;