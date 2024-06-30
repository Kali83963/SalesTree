import { NavLink, useNavigate } from "react-router-dom";
import Logo from '../Assests/images/Group 60223.png';
import { CalculatorIcon, ChartBarIcon, ChartBarSquareIcon, CubeIcon, CurrencyDollarIcon, DocumentTextIcon, MapPinIcon, PowerIcon, ShoppingBagIcon, Squares2X2Icon,TagIcon, UserGroupIcon, UserIcon, UsersIcon} from "@heroicons/react/24/outline";
import { useDispatch, useSelector } from "react-redux";
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';

import { useEffect } from "react";
import { useRef } from "react";
import { toggleSidebar } from "../redux/globalslice";
import { logout } from "../redux/auth/action";

function SideBar(){
    
    const sidebarShow = useSelector(state => state.global.sidebarShow);
    const user = useSelector(state => state.auth.current.user.user);

    console.log(user)

    const dispatch = useDispatch();
    const navigate = useNavigate()
    const sidebarRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
          // Check if the clicked element is not inside the sidebar
          if (sidebarRef.current && !sidebarRef.current.contains(event.target) && window.innerWidth <= 785) {
            dispatch(toggleSidebar(false));
          }
        };
    
        // Add click event listener to the window
        window.addEventListener('click', handleClickOutside,true);
    
        // Cleanup the event listener on component unmount
        return () => {
          window.removeEventListener('click', handleClickOutside,true);
        };
      }, []);

    
    function logoutFunction(){
        dispatch(logout())
        navigate('/account/login')
    }

    if(user.role === "admin" || user.role === "owner" ){

        return(
                <div className={`fixed z-50 md:block h-full overflow-scroll duration-300 ease-in-out text-[#313131] border bg-white sidebar ${sidebarShow ? 'w-56 block' : 'md:w-14 md:translate-x-0 -translate-x-96'}`} ref={sidebarRef}>
                    <div className="px-6 py-3 w-56 h-16 overflow-hidden">
                        <img src={Logo} alt="logo" className="object-cover w-full h-full"/>
                    </div>
                    <hr style={{backgroundColor:"#00000012"}}/>
                    <ul className="p-2 pl-2">
                        <li className={`flex flex-col items-start px-2 py-1 gap-2 whitespace-nowrap ${ !sidebarShow && 'pl-0'}`}>
                            {
                                sidebarShow && <span className="font-semibold text-sm">Main</span>
                            }
                            
                            <ul className="ml-3 py-1 flex flex-col gap-3">
                                <NavLink to="/dashboard" className={({isActive}) => (`flex gap-3 text-sm ${ isActive && ('text-primary font-semibold')}`)}>
                                    <Squares2X2Icon className="h-7"/>
                                    <span>DashBoard</span>
                                </NavLink>
                            
                            </ul>
                        </li>
                        <hr />
                        <li className={`flex flex-col items-start px-2 py-1 gap-2 whitespace-nowrap ${ !sidebarShow && 'pl-0'}`}>
                            { sidebarShow && <span className="font-semibold text-sm">Products</span>}
                            <ul className="ml-3 py-1 flex flex-col gap-3">
                                <NavLink to="products/category" className={({isActive}) => (`flex gap-3 text-sm ${ isActive && ('text-primary font-semibold')}`)}>
                                    <Squares2X2Icon className="h-7"/>
                                    <span>Category</span>
                                </NavLink>
                                <NavLink to="products/subcategory" className={({isActive}) => (`flex gap-3 text-sm ${ isActive && ('text-primary font-semibold')}`)}>
                                    <Squares2X2Icon className="h-7" />
                                    <span>Sub Category</span>
                                </NavLink>
                                <NavLink to="products/product" className={({isActive}) => (`flex gap-3 text-sm ${ isActive && ('text-primary font-semibold')}`)}>
                                    
                                    <CubeIcon className="h-7" />
                                    <span>Products</span> 
                                </NavLink>
                                <NavLink to="products/manufacture" className={({isActive}) => (`flex gap-3 text-sm ${ isActive && ('text-primary font-semibold')}`)}>
                                    
                                    <TagIcon className="h-7" />
                                    <span>Manufacture</span>  
                                </NavLink>
                            </ul>
                        </li>
                        <hr />
                        
                        <li className={`flex flex-col items-start px-2 py-1 gap-2 whitespace-nowrap ${ !sidebarShow && 'pl-0'}`}>
                            {sidebarShow && <span className="font-semibold text-sm">Sales</span>}
                            <ul className="ml-3 py-1 flex flex-col gap-3">
                                <NavLink to="sales/" className={({isActive}) => (`flex gap-3 text-sm ${ isActive && ('text-primary font-semibold')}`)}>
                                    
                                    <ChartBarIcon className="h-7" />
                                    <span>Sales</span>
                                </NavLink>
                                <NavLink to="sales/pos" className={({isActive}) => (`flex gap-3 text-sm ${ isActive && ('text-primary font-semibold')}`)}>
                                    
                                    <CalculatorIcon className="h-7" />
                                    <span>POS</span>  
                                </NavLink>
                            </ul>
                        </li>
                        <hr />
                        <li className={`flex flex-col items-start px-2 py-1 gap-2 whitespace-nowrap ${ !sidebarShow && 'pl-0'}`}>
                            {sidebarShow && <span className="font-semibold text-sm">People</span>}
                            <ul className="ml-3 py-1 flex flex-col gap-3">
                                <NavLink to="people/manageuser" className={({isActive}) => (`flex gap-3 text-sm ${ isActive && ('text-primary font-semibold')}`)}>
                                    
                                    <UserGroupIcon className="h-7" />
                                    <span>Manage Users</span>   
                                </NavLink>
                            </ul>
                        </li>
                    </ul>
                </div>
           
        )
    }else{
        return(<div className={`fixed z-50 md:block h-full overflow-scroll duration-300 ease-in-out text-[#313131] border bg-white sidebar ${sidebarShow ? 'w-56 block' : 'md:w-14 md:translate-x-0 -translate-x-96'}`} ref={sidebarRef}>
        <div className="px-6 py-3 w-56 h-16 overflow-hidden">
            <img src={Logo} alt="logo" className="object-cover w-full h-full"/>
        </div>
        <hr style={{backgroundColor:"#00000012"}}/>
        <ul className="p-2 pl-2">
            <li className={`flex flex-col items-start px-2 py-1 gap-2 whitespace-nowrap ${ !sidebarShow && 'pl-0'}`}>
                {
                    sidebarShow && <span className="font-semibold text-sm">Main</span>
                }
                
                <ul className="ml-3 py-1 flex flex-col gap-3">
                    <NavLink to="/dashboard" className={({isActive}) => (`flex gap-3 text-sm ${ isActive && ('text-primary font-semibold')}`)}>
                        <Squares2X2Icon className="h-7"/>
                        <span>DashBoard</span>
                    </NavLink>
                
                </ul>
            </li>
            <hr />
            <li className={`flex flex-col items-start px-2 py-1 gap-2 whitespace-nowrap ${ !sidebarShow && 'pl-0'}`}>
                {sidebarShow && <span className="font-semibold text-sm">Sales</span>}
                <ul className="ml-3 py-1 flex flex-col gap-3">
                    <NavLink to="sales/" className={({isActive}) => (`flex gap-3 text-sm ${ isActive && ('text-primary font-semibold')}`)}>
                        
                        <ChartBarIcon className="h-7" />
                        <span>Sales</span>
                    </NavLink>
                    <NavLink to="sales/pos" className={({isActive}) => (`flex gap-3 text-sm ${ isActive && ('text-primary font-semibold')}`)}>
                        
                        <CalculatorIcon className="h-7" />
                        <span>POS</span>  
                    </NavLink>
                </ul>
            </li>
            
            
        </ul>
    </div>)

    }
};

export default SideBar;