import Table from "../../components/table/Table";
import Modal from "../../global/Modal";
import ConfirmDelete from "../../global/ConfirmDelete";
import { Link } from "react-router-dom";
import CreateIcon from "@mui/icons-material/Create";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import { useEffect, useState } from "react";

const columns= [
    { field: 'name', headerName: 'Category Name', flex:1 ,
      renderCell:(params) => (
       <span>{params.row.name}</span>
      )
    },
    { field: 'description', headerName: 'Description', flex:1,
      renderCell:(params) =>(
        <span>{params.row.description}</span>
      )
    }

  ];


function Category({entity}){ 
    
    return(
    <div className="px-4 py-6 text-sm">
        <div className="flex item-center justify-between flex-wrap gap-4">

            <div className="text-start">
                <h2 className="text-lg text-primary font-semibold">Category List</h2>
                <span className="text-sm">View/Search Category</span>
            </div>
            <Link to="/products/category/add" className="bg-primary flex items-center text-sm text-white rounded-md px-4 md:py-0 py-3 shadow-md whitespace-nowrap">
                + Add Category
            </Link>
        </div>

        <div className="bg-white rounded-md mt-6 p-5 shadow-md">
            
            <Table columns={columns} entity={entity} editPath={entity} />
        </div>
    </div>
    )
}

export default Category;