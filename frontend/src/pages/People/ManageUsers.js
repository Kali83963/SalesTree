import './manageUser.css';

import Table from '../../components/table/Table';

import { useState } from 'react';

import { Link } from "react-router-dom";
import { IMAGE_BASE_URL } from '../../utils/BASE_CONFIG';


const columns= [
    { field: 'profile_image', headerName: 'Profile Image', width:200 ,maxWidth: 200,sortable:false,
      renderCell:(params) => {
        const url = params.row.profile_image !== 'undefined'  ? IMAGE_BASE_URL + params.row.profile_image.replace('public/', '') : null;

        return (
        <div className="h-11 w-11 overflow-hidden rounded-full">
          {params.row.profile_image !== 'undefined' ? (
            <img
              src={url}
              alt={params.row.id}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex justify-center items-center text-white bg-gray-400">
              {params.row.name.charAt(0)}
            </div>
          )}
        </div>
      )}
    },
    { field: 'name', headerName: 'Name',flex: 1,
      renderCell:(params) =>(
        <span>{params.row.name}</span>
      )
    },
    { field: 'email', headerName: 'Email Address',flex: 1,
        renderCell:(params)=>(
            <span>{params.row.email}</span>
        )
    },
    {
      field: 'role',
      headerName: 'Role',
      flex: 1,
      renderCell: (params) => (
        <span>{params.row.role}</span>
      ),
    },
    {
      field: 'status',
      headerName: 'Status',
      renderCell: (params) => (
        <span className={`${ params.row.status === 'active' ? "text-green-400": 'text-gray-500'} before:content-['•'] before:mr-1 before:text-lg before:scale-[4]`}>{params.row.status === 'active' ? "Active" : "Inactive"}</span>
      ),
    },
  ];

  


  




function ManageUsers(){

  

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
            <Table columns={columns} entity={'/user'} editPath={'people/user'}/>
          
            
        </div>
    </div>
    ) 
}

export default ManageUsers;