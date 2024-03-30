import DeleteOutlineOutlined from "@mui/icons-material/DeleteOutlineOutlined";
import Table from "../../components/table/Table";
import ConfirmDelete from "../../global/ConfirmDelete";
import Modal from "../../global/Modal";
import CreateIcon from "@mui/icons-material/Create";
import { Link } from "react-router-dom";



const columns= [
    { field: 'customer_name', headerName: 'Customer Name', flex:1 ,
      renderCell:(params) => (
       <span>{params.row.customer_name}</span>
      )
    },
    { field: 'date', headerName: 'Date', flex:1,
      renderCell:(params) =>(
        <span>{params.row.date}</span>
      )
    },
    { field: 'receipt_no', headerName: 'Receipt No', flex:1,
      renderCell:(params) =>(
        <span>{params.row.receipt_no}</span>
      )
    },
    { field: 'quality', headerName: 'Quality', flex:1,
      renderCell:(params) =>(
        
        <span >{params.row.quality}</span>
      )
    },
    { field: 'product_name', headerName: 'Product Name', flex:1,
      renderCell:(params) =>(
        <span>{params.row.product_name}</span>
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
                          <DeleteOutlineOutlined />
                          
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


function SalesReturn(){
    return(
        <div className="px-4 py-6 text-sm">
        <div className="flex item-center justify-between flex-wrap gap-4">

            <div className="text-start">
                <h2 className="text-lg text-primary font-semibold">Sales Return List</h2>
                <span className="text-sm">Manage Your Sales Return</span>
            </div>
        </div>
        <div className="bg-white rounded-md mt-6 p-5 shadow-md">
        
            <Table columns={columns} data={[]} />
        </div>
    </div>
    )
};

export default SalesReturn;