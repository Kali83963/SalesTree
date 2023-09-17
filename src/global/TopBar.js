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

const userDropDownList = [
    {
        'name':'Profile',
        'icon': <PersonOutlineOutlinedIcon />
    },
    {
        'name':'Settings',
        'icon': <SettingsOutlinedIcon />
    },
    {
        'name':'Log Out',
        'icon': <LogoutOutlinedIcon />
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


const TopBar = () =>{

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
        <div className="topbar">
            <span className='topbar-arrow'>

                <KeyboardDoubleArrowLeftIcon />
            </span>
            <div className='topbar-right'>
                <span className='topbar-icon'>
                    <EmailOutlinedIcon />
                </span>
                <span className='topbar-icon'>
                    <NotificationsNoneOutlinedIcon onClick={handleNotificationDropDown} />
                    <span className='notification-no'>1</span>
                   { isNotificationOpen && <DropDown messages = {notifications} onRemove={handleRemoveNotification} onClear ={handleClearNotifications}/>}
                   
                </span>
                <div className='profile'>
                    <div className='image-container'>
                        <img src={profileimage} alt='profile-image' />
                    </div>
                    <div className='profile-info'>
                        <p>
                            <span>John Doe</span>
                            {
                                isUserDropDownOpen ? <span onClick={handleUserDropDown}><KeyboardArrowUpOutlinedIcon /></span> : <span onClick={handleUserDropDown}><KeyboardArrowDownOutlinedIcon /></span>
                            }
                            
                        </p>
                        <span className='user-role'>Super Admin</span>
                        { isUserDropDownOpen && <UserDropDown DropDownList = {userDropDownList} />}
                    </div>
                </div>
            </div>
        </div>
    )
};

export default TopBar;


function UserDropDown({DropDownList}){
    return(
        <div className='user-dropdown'>
            {
            DropDownList.map((item)=>
                
                <a href='#' className='user-dropdown-item'>
                    {item.icon}
                    <span>{item.name}</span>
                </a>
              
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
                { isMessages && <a onClick={onClear}>Clear all</a> }
                

            </p>
            <hr />
            <div className='dropdown-container'>
                {isMessages ? 

                    messages.map( message=> (
                    <li key={message.id}>
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