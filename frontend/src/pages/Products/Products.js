

import ConfirmDelete from "../../global/ConfirmDelete";
import { Link } from "react-router-dom";
import CreateIcon from "@mui/icons-material/Create";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import Table from "../../components/table/Table";
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import Modal from "../../global/Modal";

const columns= [
    { field: 'product_name', headerName: 'Product Name',flex:1,
      renderCell:(params) => (
      <div className="flex items-center gap-2">
        <div className="h-10 w-10 overflow-hidden rounded-full">
            <img src={params.row.product_image} className="h-full w-full object-cover"/>
        </div>
        <span>{params.row.product_name}</span>
      </div>
      )

    },
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
    
    { field: 'barcode', headerName: 'Barcode', flex:1,
      renderCell:(params) =>(
        <span>{params.row.barcode}</span>
      )
    },
    { field: 'manufacture_name', headerName: 'Manufacture', flex:1,
      renderCell:(params) =>(
        <span>{params.row.manufacture_name}</span>
      )
    },
    { field: 'price', headerName: 'Selling Price', flex:1,
      renderCell:(params) =>(
        <span>{params.row.price}</span>
      )
    },
    { field: 'unit', headerName: 'Unit', flex:1,
      renderCell:(params) =>(
        <span>{params.row.unit}</span>
      )
    },
    { field: 'sku', headerName: 'SKU', flex:1,
      renderCell:(params) =>(
        <span>{params.row.sku}</span>
      )
    }
  ];


function Products({entity}){
    return(
        <div className="px-4 py-6 text-sm">
            <div className="flex item-center justify-between flex-wrap gap-4">
    
                <div className="text-start">
                    <h2 className="text-lg text-primary font-semibold">Product List</h2>
                    <span className="text-sm">Manage Your Products</span>
                </div>
                <Link to="/products/product/add" className="bg-primary flex items-center text-sm text-white rounded-md px-4 md:py-0 py-3 shadow-md whitespace-nowrap">
                    + Add Product
                </Link>
            </div>
    
            <div className="bg-white rounded-md mt-6 p-5 shadow-md">
                
                <Table columns={columns} entity={entity} editPath={entity} />
            </div>
        </div>
        )
};

export default Products;