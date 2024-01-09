import { CustomNoRowsOverlay } from "../../components/table/Table";

function PosTable({ columns, data,handleDecrement,handleIncrement,handleDeleteCartitem }) {
  return (
    <table className="w-full text-left">
      <thead>
        <tr className="p-2">
          {columns.map((h, i) => (
            <th className="font-semibold py-3 px-2" key={i} style={{width:h.width}}>
              {h.headerName}
            </th>
          ))}
        </tr>
      </thead>
      <tbody className="border-t-2">
        {data.length > 0 ?data.map((d, i) => (
          <tr key={i}>
            {columns.map((h,index)=>{ 
                return(
                <td className="py-4 px-2 text-wrap" key={index}>
                    {h.field==="quantity"?h.renderCell(d,handleDecrement,handleIncrement,i): h.field === "action" ? h.renderCell(handleDeleteCartitem,d):h.renderCell(d)}
                </td>)
            })}
          </tr>
        )): 
        <tr>
            <td colSpan={columns.length} className="py-2">
            <CustomNoRowsOverlay width = {800} text = {"No Item"} />
            </td>
        </tr>
}
      </tbody>
    </table>
  );
}

export default PosTable;
