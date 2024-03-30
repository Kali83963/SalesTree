import { Box } from "@mui/material";
import { CustomNoRowsOverlay } from "../../components/table/Table";
import { DataGrid } from "@mui/x-data-grid";
import { useEffect } from "react";
import "./PosTable.css";


function PosTable({ columns, data,handleDecrement,handleIncrement,handleDeleteCartitem }) {

  const customRenderCell = (params, index) => {
   
    const field = columns[index];
    if(field.field === "action"){
      return field.renderCell(params,handleDeleteCartitem);
    }
    if(field.field === "quantity"){
      return field.renderCell(params,handleDecrement,handleIncrement,index);
    }


  };
  
  const newColumns = columns.map((column,index) => ({
    ...column,
    renderCell:column.field === "action" || column.field === "quantity" ? (value) => customRenderCell(value,index) : column.renderCell
  }))



  return (

    <Box sx={{ height: 650,maxHeight:650,my:2 }}>
      <hr />
      <DataGrid
        columns={newColumns}
        rows={data}
        hideFooter
        slots={{
          noRowsOverlay:CustomNoRowsOverlay
        }}
        getRowId={(row) => row.id}
        sx={{
          border: 'none',
          // '& .MuiDataGrid-virtualScroller': {
          //   overflowX: 'auto !important'
          // }
        }}
        getRowHeight= {(params) => 70}
        disableRowSelectionOnClick = {true}
        disableColumnMenu= {true}
        disableColumnFilter= {true}
        disableColumnSelector= {true}
        disableDensitySelector= {true}

      />
    </Box>
  
//     <div className="custom-scroll overflow-auto">
//     <table className="w-full text-left">
//       <thead>
//         <tr className="p-2">
//           {columns.map((h, i) => (
//             <th className="font-semibold py-3 px-2" key={i} style={{width:h.width}}>
//               {h.headerName}
//             </th>
//           ))}
//         </tr>
//       </thead>
//       <tbody className="border-t-2 ">
//         {data.length > 0 ?data.map((d, i) => (
//           <tr key={i}>
//             {columns.map((h,index)=>{ 
//                 return(
//                 <td className="py-4 px-2 text-wrap" key={index}>
//                     {h.field==="quantity"?h.renderCell(d,handleDecrement,handleIncrement,i): h.field === "action" ? h.renderCell(handleDeleteCartitem,d):h.renderCell(d)}
//                 </td>)
//             })}
//           </tr>
//         )): 
//         <tr>
//             <td colSpan={columns.length} className="py-2">
//             <CustomNoRowsOverlay width = {800} text = {"No Item"} />
//             </td>
//         </tr>
// }
//       </tbody>
//     </table>
//     </div>
  );
}

export default PosTable;
