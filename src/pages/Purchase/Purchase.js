
import { Link } from "react-router-dom";
import Table from "../../components/table/Table";
import Modal from "../../global/Modal";
import ConfirmDelete from "../../global/ConfirmDelete";
import CreateIcon from "@mui/icons-material/Create";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";

const columns= [
    { field: 'date', headerName: 'Date', flex:1 ,
      renderCell:(params) => (
       <span>{params.row.date}</span>
      )
    },
    { field: 'supplier_name', headerName: 'Supplier Name', flex:1 ,
      renderCell:(params) => (
       <span>{params.row.supplier_name}</span>
      )
    },
    { field: 'purchase_no', headerName: 'Purchase No', flex:1 ,
      renderCell:(params) => (
       <span>{params.row.purchase_no}</span>
      )
    },
    { field: 'grand_total', headerName: 'Grand Total', flex:1,
      renderCell:(params) =>(
        <span>{params.row.grand_total}</span>
      )
    },
    { field: 'paid', headerName: 'Paid', flex:1,
      renderCell:(params) =>(
        <span>{params.row.paid}</span>
      )
    },
    { field: 'status', headerName: 'Status', flex:1,
      renderCell:(params) =>(
        <span>{params.row.status}</span>
      )
    },
    { field: 'payment_status', headerName: 'Payment Status', flex:1,
      renderCell:(params) =>(
        <span>{params.row.payment_status}</span>
      )
    },
    { field: 'location', headerName: 'Location', flex:1,
      renderCell:(params) =>(
        <span>{params.row.location}</span>
      )
    },
    { field: 'product_name', headerName: 'Product Name', flex:1,
      renderCell:(params) =>(
        <span>{params.row.product_name}</span>
      )
    },
    { field: 'quantity', headerName: 'Quantity', flex:1,
      renderCell:(params) =>(
        <span>{params.row.quantity}</span>
      )
    },
    { field: 'discount', headerName: 'Discount', flex:1,
      renderCell:(params) =>(
        <span>{params.row.discount}</span>
      )
    },
    { field: 'tax', headerName: 'Tax', flex:1,
      renderCell:(params) =>(
        <span>{params.row.tax}</span>
      )
    },
    { field: 'price', headerName: 'Price    ', flex:1,
      renderCell:(params) =>(
        <span>{params.row.price}</span>
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

function Purchase(){
    return(
        <div className="px-4 py-6 text-sm">
            <div className="flex item-center justify-between flex-wrap gap-4">
    
                <div className="text-start">
                    <h2 className="text-lg text-primary font-semibold">Purchase List</h2>
                    <span className="text-sm">Manage Your Purchase</span>
                </div>
                <Link to="/products/purchase/add" className="bg-primary flex items-center text-sm text-white rounded-md px-4 md:py-0 py-3 shadow-md whitespace-nowrap">
                    + Add Purchase
                </Link>
            </div>
    
            <div className="bg-white rounded-md mt-6 p-5 shadow-md">
                
                <Table columns={columns} data={[]} />
            </div>
        </div>
        )
};

export default Purchase;