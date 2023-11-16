import profileimage from '../Assests/images/profile-image.jpg';
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import KeyboardArrowDownOutlinedIcon from '@mui/icons-material/KeyboardArrowDownOutlined';
import KeyboardArrowUpOutlinedIcon from '@mui/icons-material/KeyboardArrowUpOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import { useState } from 'react';
import { ChevronDoubleDownIcon, ChevronDoubleLeftIcon, ChevronDownIcon, ChevronLeftIcon, ChevronUpIcon, Cog6ToothIcon, PowerIcon, UserIcon } from '@heroicons/react/24/outline';
import { Link, NavLink } from 'react-router-dom';

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
        'icon':<button>
            <PowerIcon className='h-6 text-primary'/>
        </button> 
    },
]

const notification = [
    {
        'id':Math.random().toFixed(2),
        'text': 'Elwis Mathew added a new product Redmi Pro 7 Mobile',
        'profile': profileimage
    },
    {
        'id':Math.random().toFixed(2),
        'text': 'John Doe added a new product category Computers',
        'profile': profileimage
    },
    {
        'id':Math.random().toFixed(2),
        'text':'William added a new product category Computers',
        'profile': profileimage
    },
]


function TopBar(){

    const [isUserDropDownOpen,setUserDropDown] = useState(false);
    const [isNotificationOpen,setNotificationOpen] = useState(false);
    const [notifications,setNotifications] = useState(notification)

    function handleUserDropDown(){
        setUserDropDown(DropDown => !DropDown);
    }

    function handleNotificationDropDown(){
        setNotificationOpen( DropDown=> !DropDown);
    }

    function handleRemoveNotification(id){

        setNotifications( notifications=> notifications.filter( notification=> notification.id !== id));

    }

    function handleClearNotifications(){
        setNotifications([]);
    }

    return(
        <header className="p-2 bg-white flex items-center justify-between">
            <span className='text-white bg-primary flex items-center justify-center cursor-pointer rounded-full p-1'>
                <ChevronDoubleLeftIcon className="h-4"/>
            </span>
            <div className='topbar-right'>
                {/* <span className='topbar-icon'>
                    <EmailOutlinedIcon />
                </span>
                <span className='topbar-icon'>
                    <NotificationsNoneOutlinedIcon onClick={handleNotificationDropDown} />
                    { notifications.length > 0 && <span className='notification-no'>{notifications.length}</span> }

                    
                   { isNotificationOpen && <DropDown messages = {notifications} onRemove={handleRemoveNotification} onClear ={handleClearNotifications}/>}
                   
                </span> */}
                <div className='flex items-center gap-2'>
                    <div className='h-11 w-11 overflow-hidden rounded-full'>
                        <img src={profileimage} alt="user-profile"  className='w-full h-full object-cover'/>
                    </div>
                    <div className='flex flex-col   relative text-start text-sm font-semibold'>
                       <div className='flex gap-1 items-center'>
                            <span>John Doe</span> 
                            {
                                isUserDropDownOpen ? <ChevronUpIcon className='cursor-pointer h-4' onClick={handleUserDropDown}/> : <ChevronDownIcon className='cursor-pointer h-4' onClick={handleUserDropDown} />
                            }
                       </div>
                        <span className='text-xs font-normal'>Super Admin</span>
                        { isUserDropDownOpen && <UserDropDown list = {userDropDownList} />}
                    </div>
                </div>
            </div>
        </header>
    )
};

export default TopBar;


function UserDropDown({list}){
    return(
        <div className='absolute top-8 right-0 z-50 flex flex-col gap-1 bg-white px-8 text-sm py-2 rounded-md shadow-md'>
            {
            list.map((item)=>
                
                <li className='flex items-start justify-center gap-1 text-[#313131] font-normal' key={item.id}>
                    {item.icon}
                    <span>{item.name}</span>
                </li>
              
            )}

        </div>
    )
};

function DropDown({messages,onRemove,onClear}){

    const isMessages = messages.length > 0;

    return(

        <div className='dropdown'>
            <p>
                <span>Notifications</span>
                { isMessages && <button onClick={onClear}>Clear all</button> }
                

            </p>
            <hr />
            <div className='dropdown-container'>
                {isMessages ? 

                    messages.map( message=> (
                    <li key={message.id}
                    
                        >
                        <div className='image-container'>
                            <img src={message.profile} alt='profile-image' />
                        </div>
                        <p className='text-wrapper'>
                            {message.text}
                        </p>
                        
                        <CloseOutlinedIcon onClick={()=> onRemove(message.id)} />
                    </li>
                ))
                    :
                    <p className='no-notification'>No Notifications Available</p>}
            </div>
            {
            isMessages && 
            <>
                <hr />
                <p className='dropdown-end'>View All</p>
            </>
             }
        </div>
    )
};