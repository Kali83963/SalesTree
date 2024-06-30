import profileimage from '../Assests/images/profile-image.jpg';

import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import { useState } from 'react';
import { ChevronDoubleDownIcon, ChevronDoubleLeftIcon, ChevronDoubleRightIcon, ChevronDownIcon, ChevronLeftIcon, ChevronUpIcon, Cog6ToothIcon, PowerIcon, UserIcon } from '@heroicons/react/24/outline';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toggleSidebar } from '../redux/globalslice';
import { logout } from "../redux/auth/action";
import { Dropdown } from 'antd';
import  {LogoutOutlined , UserOutlined , MenuOutlined }   from '@ant-design/icons';
import { IMAGE_BASE_URL } from '../utils/BASE_CONFIG';

const userDropDownList = [
    {
        'id':Math.random().toFixed(2),
        'name':'Profile',
        'icon':<Link >
            <UserIcon className='h-6 text-primary' />
        </Link> 
    },
    {
        'id':Math.random().toFixed(2),
        'name':'Settings',
        'icon':<Link >
            <Cog6ToothIcon className='h-6 text-primary' />
        </Link> 
    },
    {
        'id':Math.random().toFixed(2),
        'name':'Log Out',
        'icon':<button onClick={logout}>
            <PowerIcon className='h-6 text-primary'/>
        </button> 
    },
]




function TopBar(){

    const [isUserDropDownOpen,setUserDropDown] = useState(false);

    const sidebarShow = useSelector(state => state.global.sidebarShow);
    const user = useSelector(state => state.auth.current.user.user);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    function handleUserDropDown(){
        setUserDropDown(DropDown => !DropDown);
    }

   
    function logoutFunction(){
        dispatch(logout())
        navigate('/account/login')
    }

    const profileItems= [
        
        {
          key: '1',
          danger: true,
          label: 'Logout',
          onClick: ()=> logoutFunction(),
          icon:<LogoutOutlined />
        },
      ];


      const url = user.profile_image && user.profile_image !== 'undefined'  ? IMAGE_BASE_URL + user.profile_image.replace('public/', '') : null;

  

    return(
        <header className="p-2 bg-white flex items-center justify-between">
            <button className='text-white bg-primary flex items-center justify-center cursor-pointer rounded-full p-1' onClick={()=>dispatch(toggleSidebar(!sidebarShow))}>
                {
                    sidebarShow ?
                    <ChevronDoubleLeftIcon className="h-4"/>
                    :
                    <ChevronDoubleRightIcon className='h-4' />
                }
            </button>

           
            <div className='topbar-right'>
                <Menu items={profileItems}>
                    
                <div className='flex items-center gap-2'>
                    <div className='h-11 w-11 overflow-hidden rounded-full'>
                    {user.profile_image && user.profile_image !== 'undefined' ? (
                        <img
                        src={url}
                        alt={user.id}
                        className="w-full h-full object-cover"
                        />
                    ) : (
                        <div className="w-full h-full flex justify-center items-center text-white bg-gray-400">
                        {user.name.charAt(0)}
                        </div>
                    )}
                    </div>
                    <div className='flex flex-col   relative text-start text-sm font-semibold'>
                       <div className='flex gap-1 items-center'>
                            <span>{user.name}</span> 
                       </div>
                        <span className='text-xs font-normal'>{user.role}</span>
                    </div>
                </div>
                </Menu>
            </div>
        </header>
    )
};

export default TopBar;


// function UserDropDown({list}){
//     return(
//         <div className='absolute top-8 right-0 z-50 flex flex-col gap-1 bg-white px-8 text-sm py-2 rounded-md shadow-md'>
//             {
//             list.map((item)=>
                
//                 <li className='flex items-start justify-center gap-1 text-[#313131] font-normal' key={item.id}>
//                     {item.icon}
//                     <span>{item.name}</span>
//                 </li>
              
//             )}

//         </div>
//     )
// };

// function DropDown({messages,onRemove,onClear}){

//     const isMessages = messages.length > 0;

//     return(

//         <div className='dropdown'>
//             <p>
//                 <span>Notifications</span>
//                 { isMessages && <button onClick={onClear}>Clear all</button> }
                

//             </p>
//             <hr />
//             <div className='dropdown-container'>
//                 {isMessages ? 

//                     messages.map( message=> (
//                     <li key={message.id}
                    
//                         >
//                         <div className='image-container'>
//                             <img src={message.profile} alt='profile-image' />
//                         </div>
//                         <p className='text-wrapper'>
//                             {message.text}
//                         </p>
                        
//                         <CloseOutlinedIcon onClick={()=> onRemove(message.id)} />
//                     </li>
//                 ))
//                     :
//                     <p className='no-notification'>No Notifications Available</p>}
//             </div>
//             {
//             isMessages && 
//             <>
//                 <hr />
//                 <p className='dropdown-end'>View All</p>
//             </>
//              }
//         </div>
//     )
// };

function Menu({items,children}) {

    const onClick = (e) => {
        console.log('click ', e);
      };

  return (
    <Dropdown
        menu={{items}} 
        trigger={['click']} 
        placement="bottom"
        overlayStyle={{minWidth:150 , width:'max-content'}}    
    >
        <a onClick={(e) => e.preventDefault()}  className="cursor-pointer">
      
           {children}
        
    </a>
    </Dropdown>
  )
}