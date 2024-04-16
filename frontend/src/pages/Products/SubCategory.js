import { Modal } from "@mui/material";
import ConfirmDelete from "../../global/ConfirmDelete";
import { Link } from "react-router-dom";
import CreateIcon from "@mui/icons-material/Create";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import Table from "../../components/table/Table";

const columns= [
    { field: 'category_name', headerName: 'Category Name', flex:1 ,
      renderCell:(params) => (
       <span>{params.row.category_name}</span>
      )
    },
    { field: 'name', headerName: 'Sub Category Name', flex:1 ,
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


function SubCategory({entity}){
    return(
        <div className="px-4 py-6 text-sm">
            <div className="flex item-center justify-between flex-wrap gap-4">
    
                <div className="text-start">
                    <h2 className="text-lg text-primary font-semibold">Sub Category</h2>
                    <span className="text-sm">View/Search Sub Category</span>
                </div>
                <Link to="/products/subcategory/add" className="bg-primary flex items-center text-sm text-white rounded-md px-4 md:py-0 py-3 shadow-md whitespace-nowrap">
                    + Add Sub Category
                </Link>
            </div>
    
            <div className="bg-white rounded-md mt-6 p-5 shadow-md">
                
                <Table columns={columns} entity={entity} editPath={entity} />
            </div>
        </div>
        )
}

export default SubCategory;