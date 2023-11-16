import './manageUser.css';
import CreateIcon from "@mui/icons-material/Create";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import Table from '../../components/table/Table';
import Modal from '../../global/Modal';

import { useState } from 'react';

import { Link } from "react-router-dom";
import ConfirmDelete from '../../global/ConfirmDelete';


const columns= [
    { field: 'profile_image', headerName: 'Profile Image', width: 130 ,sortable:false,
      renderCell:(params) => (
        <div className='h-11 w-11 overflow-hidden rounded-full'>
            <img src={params.row.profile_image} alt={params.row.id} className='w-full h-full object-cover'/>
        </div>
      )
    },
    { field: 'username', headerName: 'Username', width:120,
      renderCell:(params) =>(
        <span>{params.row.username}</span>
      )
    },
    { field: 'email', headerName: 'Email Address',width:250 ,
        renderCell:(params)=>(
            <span>{params.row.email}</span>
        )
    },
    {
      field: 'phone_no',
      headerName: 'Phone Number', width:150,
      renderCell: (params) => (
        <span>{params.row.phone_no}</span>
      ),
    },
    {
      field: 'role',
      headerName: 'Role',
      width:200,
      renderCell: (params) => (
        <span>{params.row.role}</span>
      ),
    },
    {
      field: 'location',
      headerName: 'Location',
      width: 100,
      renderCell: (params) => (
        <span>{params.row.location}</span>
      ),
    },
    {
      field: 'Status',
      headerName: 'Status',
      renderCell: (params) => (
        <span className={`${ params.row.Status ? "text-green-400": 'text-gray-500'} before:content-['•'] before:mr-1 before:text-lg before:scale-[4]`}>{params.row.Status ? "Active" : "Inactive"}</span>
      ),
    },
    {
      field: 'action',
      headerName: 'Action',
      sortable:false,
      renderCell: (params) => (
        <div className='flex items-center justify-between gap-2'>
            <Link className='bg-primary text-white text-sm rounded-md p-1' to={`/people/user/edit/${params.row.id}`}>

                <CreateIcon />
            </Link>
            <Modal>
                <Modal.Open opens='delete-form'>
                    <button className='bg-[#ff3a31] text-white rounded-md p-1' >
                        <DeleteOutlineOutlinedIcon />
                        
                    </button>
                </Modal.Open>
                <Modal.Window name='delete-form'>
                    <ConfirmDelete />
                </Modal.Window>
            </Modal>
        </div>
        ),
    },

  ];

  


  




function ManageUsers({data}){
    const [query,setQuery] = useState("");    

    return(
    <div className="px-4 py-6 text-sm">
        <div className="flex item-center justify-between">

            <div className="text-start">
                <h2 className="text-lg text-primary font-semibold">Manage Users</h2>
                <span className="text-sm">Manage Your User</span>
            </div>
            <Link to="/people/user/add" className="bg-primary flex items-center text-sm text-white rounded-md px-4 py-2 shadow-md">
                + Add User
            </Link>
        </div>

        <div className="bg-white rounded-md mt-6 p-5 shadow-md">
            
            <Table columns={columns} data={data} />
        </div>
    </div>
    ) 
}

export default ManageUsers;