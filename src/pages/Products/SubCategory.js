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
    { field: 'subcategory_name', headerName: 'Sub Category Name', flex:1 ,
      renderCell:(params) => (
       <span>{params.row.subcategory_name}</span>
      )
    },
    { field: 'description', headerName: 'Description', flex:1,
      renderCell:(params) =>(
        <span>{params.row.description}</span>
      )
    },
    {
      field: 'action',
      headerName: 'Action',
      sortable:false,
      renderCell: (params) => (
        <div className='flex items-center justify-between gap-2'>
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
            <Link className='bg-primary text-white text-sm rounded-md p-1' to={`/people/user/edit/${params.row.id}`}>

                <CreateIcon />
            </Link>
        </div>
        ),
    },

  ];


function SubCategory(){
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
                
                <Table columns={columns} data={[]} />
            </div>
        </div>
        )
}

export default SubCategory;