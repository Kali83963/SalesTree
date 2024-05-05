import { Link } from "react-router-dom";
import Table from "../../components/table/Table";
import { IMAGE_BASE_URL } from '../../utils/BASE_CONFIG';


const columns= [
    { field: 'image', headerName: 'Manufacture Image', flex:1 ,
      renderCell:(params) => {
        const url = params.row.images !== 'undefined'  ? IMAGE_BASE_URL + params.row.image.replace('public/', '') : null;
        console.log(params)
        return (
        <div className="h-11 w-11 overflow-hidden rounded-full">
          {params.row.image.trim() !== "undefined" ? (
            <img
              src={url}
              alt={params.row.id}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex justify-center items-center text-white bg-gray-400">
              {params.row.name.slice(0,2).toUpperCase()}
            </div>
          )}
        </div>)}
      
    },
    { field: 'name', headerName: 'Manufacture Name', flex:1 ,
      renderCell:(params) => (
       <span>{params.row.name}</span>
      )
    },
    { field: 'description', headerName: 'Manufacture Description', flex:1,
      renderCell:(params) =>(
        <span>{params.row.description}</span>
      )
    },

  ];
function Manufacture({entity}){
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
                
                <Table columns={columns} entity={entity} editPath={entity} />
            </div>
        </div>
        )
}

export default Manufacture;