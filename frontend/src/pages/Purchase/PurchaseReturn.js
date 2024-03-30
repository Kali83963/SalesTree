import { Link } from "react-router-dom";
import Table from "../../components/table/Table";
import Modal from "../../global/Modal";
import ConfirmDelete from "../../global/ConfirmDelete";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import CreateIcon from "@mui/icons-material/Create";



const columns= [
    { field: 'supplier_name', headerName: 'Supplier Name', flex:1 ,
      renderCell:(params) => (
       <span>{params.row.supplier_name}</span>
      )
    },
    { field: 'date', headerName: 'Date', flex:1 ,
      renderCell:(params) => (
       <span>{params.row.date}</span>
      )
    },
    { field: 'product_name', headerName: 'Product Name', flex:1 ,
      renderCell:(params) => (
       <span>{params.row.product_name}</span>
      )
    },
    { field: 'quality_return', headerName: 'Quality Return', flex:1,
      renderCell:(params) =>(
        <span>{params.row.quality_return}</span>
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


function PurchaseReturn(){
    return(
        <div className="px-4 py-6 text-sm">
            <div className="flex item-center justify-between flex-wrap gap-4">
    
                <div className="text-start">
                    <h2 className="text-lg text-primary font-semibold">Purchase Return</h2>
                    <span className="text-sm">Manage Your Purchase Return</span>
                </div>
                <Link to="/purchase/return/add" className="bg-primary flex items-center text-sm text-white rounded-md px-4 md:py-0 py-3 shadow-md whitespace-nowrap">
                    + Add Purchase Return
                </Link>
            </div>
    
            <div className="bg-white rounded-md mt-6 p-5 shadow-md">
                
                <Table columns={columns} data={[]} />
            </div>
        </div>
    )
};

export default PurchaseReturn;