import { Link } from "react-router-dom";
import Table from "../../components/table/Table";
import Modal from "../../global/Modal";
import ConfirmDelete from "../../global/ConfirmDelete";
import CreateIcon from "@mui/icons-material/Create";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";

const columns= [
    { field: 'manufacture_image', headerName: 'Manufacture Image', flex:1 ,
      renderCell:(params) => (
       <span>{params.row.manufacture_image}</span>
      )
    },
    { field: 'manufacture_name', headerName: 'Manufacture Name', flex:1 ,
      renderCell:(params) => (
       <span>{params.row.manufacture_name}</span>
      )
    },
    { field: 'description', headerName: 'Manufacture Description', flex:1,
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
function Manufacture(){
    return(
        <div className="px-4 py-6 text-sm">
            <div className="flex item-center justify-between flex-wrap gap-4">
    
                <div className="text-start">
                    <h2 className="text-lg text-primary font-semibold">Manufacture</h2>
                    <span className="text-sm">Manage Your Manufacture</span>
                </div>
                <Link to="/products/manufacture/add" className="bg-primary flex items-center text-sm text-white rounded-md px-4 md:py-0 py-3 shadow-md whitespace-nowrap">
                    + Add Manufacture
                </Link>
            </div>
    
            <div className="bg-white rounded-md mt-6 p-5 shadow-md">
                
                <Table columns={columns} data={[]} />
            </div>
        </div>
        )
}

export default Manufacture;