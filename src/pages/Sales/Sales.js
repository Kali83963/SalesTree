import { Link } from "react-router-dom";
import Table from "../../components/table/Table";


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
    { field: 'status', headerName: 'Status', flex:1,
      renderCell:(params) =>(
        
        <span className={`px-4 py-2 ${params.row.status === "Due" ? 'bg-red-700':'bg-green-700'}`}>{params.row.status}</span>
      )
    },
    { field: 'payment_status', headerName: 'Payment Status', flex:1,
      renderCell:(params) =>(
        <span>{params.row.payment_status}</span>
      )
    },
    { field: 'total', headerName: 'Total', flex:1,
      renderCell:(params) =>(
        <span>{params.row.total}</span>
      )
    },
    { field: 'paid', headerName: 'Paid', flex:1,
      renderCell:(params) =>(
        <span>{params.row.paid}</span>
      )
    },
    { field: 'due', headerName: 'Due', flex:1,
      renderCell:(params) =>(
        <span>{params.row.due}</span>
      )
    },
    { field: 'location', headerName: 'Location', flex:1,
      renderCell:(params) =>(
        <span>{params.row.location}</span>
      )
    },
    { field: 'biller_name', headerName: 'Biller', flex:1,
      renderCell:(params) =>(
        <span>{params.row.biller_name}</span>
      )
    }

  ];


function Sales(){
    return(
        <div className="px-4 py-6 text-sm">
            <div className="flex item-center justify-between flex-wrap gap-4">

                <div className="text-start">
                    <h2 className="text-lg text-primary font-semibold">Sales List</h2>
                    <span className="text-sm">Manage Your Sales List</span>
                </div>
            </div>
            <div className="bg-white rounded-md mt-6 p-5 shadow-md">
            
                <Table columns={columns} data={[]} />
            </div>
        </div>
    )
};

export default Sales;