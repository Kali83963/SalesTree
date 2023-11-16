import CreateIcon from "@mui/icons-material/Create";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import Table from '../../components/table/Table';
import Modal from '../../global/Modal';

import { useState } from 'react';

import { Link } from "react-router-dom";
import ConfirmDelete from "../../global/ConfirmDelete";


const columns= [
    { field: 'supplier_name', headerName: 'Supplier Name', width: 250 ,
      renderCell:(params) => (
       <span>{params.row.supplier_name}</span>
      )
    },
    { field: 'phone_no', headerName: 'Contact Number', width:250,
      renderCell:(params) =>(
        <span>{params.row.phone_no}</span>
      )
    },
    { field: 'country', headerName: 'Country',width:250 ,
        renderCell:(params)=>(
            <span>{params.row.country}</span>
        )
    },
    {
      field: 'city',
      headerName: 'City', width:250,
      renderCell: (params) => (
        <span>{params.row.city}</span>
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

function Supplier(data){
    const [query,setQuery] = useState("");    

    return(
    <div className="px-4 py-6 text-sm">
        <div className="flex item-center justify-between">

            <div className="text-start">
                <h2 className="text-lg text-primary font-semibold">Supplier</h2>
                <span className="text-sm">Manage Suppliers List</span>
            </div>
            <Link to="/people/supplier/add" className="bg-primary flex items-center text-sm text-white rounded-md px-4 py-2 shadow-md">
                + Add Supplier
            </Link>
        </div>

        <div className="bg-white rounded-md mt-6 p-5 shadow-md">
            
            <Table columns={columns} data={data} />
        </div>
    </div>
    ) 
}

export default Supplier;