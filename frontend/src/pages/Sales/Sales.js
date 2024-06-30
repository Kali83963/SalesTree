import { Link } from "react-router-dom";
import Table from "../../components/table/Table";


const columns= [
    { field: 'customer_name', headerName: 'Customer Name', flex:1 ,
      renderCell:(params) => (
       <span>{params.row.customer_name}</span>
      )
    },
    { field: 'created_at', headerName: 'Date', flex:1,
      renderCell:(params) =>(
        <span>{new Date(params.row.created_at).toLocaleString()}</span>
      )
    },
    { field: 'total_cost', headerName: 'Total', flex:1,
      renderCell:(params) =>(
        <span>{params.row.total_cost}</span>
      )
    },
    { field: 'payment_method', headerName: 'Payment Method', flex:1,
      renderCell:(params) =>(
        <span>{params.row.payment_method}</span>
      )
    },
    { field: 'biller', headerName: 'Biller', flex:1,
      renderCell:(params) =>(
        <span>{params.row.biller}</span>
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
            
                <Table columns={columns}  entity={'sales'} action={false}/>
            </div>
        </div>
    )
};

export default Sales;