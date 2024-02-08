import { Link } from "react-router-dom";
import Table from "../../components/table/Table";
import Modal from "../../global/Modal";
import ConfirmDelete from "../../global/ConfirmDelete";
import CreateIcon from "@mui/icons-material/Create";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";



const columns= [
    { field: 'name', headerName: 'Name', flex:1 ,
      renderCell:(params) => (
       <span>{params.row.name}</span>
      )
    },
    { field: 'percentage', headerName: 'Percentage', flex:1 ,
      renderCell:(params) => (
       <span>{params.row.percentage}</span>
      )
    },
    { field: 'status', headerName: 'Status', flex:1 ,
      renderCell:(params) => (
        <div className={`${params.row.status === "active" ? "text-green-600" : "text-gray-600"} flex gap-4 items-center`}>
            <span className={`h-2 w-2 rounded-full ${params.row.status === "active" ? "text-green-600" : "text-gray-600"}`}></span>
            <span>{params.row.purchase_no}</span>
        </div>
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

function TaxScreen(){
    return(<div className="px-4 py-6 text-sm">
    <div className="flex item-center justify-between flex-wrap gap-4">

        <div className="text-start">
            <h2 className="text-lg text-primary font-semibold">Taxe Rate</h2>
            <span className="text-sm">Manage Your Tax Rate</span>
        </div>
        <Link to="/settings/tax/add" className="bg-primary flex items-center text-sm text-white rounded-md px-4 md:py-0 py-3 shadow-md whitespace-nowrap">
            + Add Tax Rate
        </Link>
    </div>

    <div className="bg-white rounded-md mt-6 p-5 shadow-md">
        
        <Table columns={columns} data={[]} />
    </div>
</div>)
}

export default TaxScreen;