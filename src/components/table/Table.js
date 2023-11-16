import "./Table.css";
import pdfImage from "../../Assests/images/pdf@2x.png";
import xlsImage from "../../Assests/images/xls@2x.png";
import {
  DataGrid,
  GridCsvExportMenuItem,
  GridPrintExportMenuItem,
  GridToolbarContainer,
  GridToolbarQuickFilter,
} from "@mui/x-data-grid";

function CustomToolBar() {
  return (
    <>
      <GridToolbarContainer
        sx={{ display: "flex", justifyContent: "space-between" }}
      >
        <GridToolbarQuickFilter />
        <div className="flex">
          <GridPrintExportMenuItem
            sx={{
              height: "50px",
              width: "50px",
              backgroundImage: `url(${pdfImage})`,
              backgroundSize: "40px",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
            }}
          />
          <GridCsvExportMenuItem
            sx={{
              height: "50px",
              width: "50px",
              backgroundImage: `url(${xlsImage})`,
              backgroundSize: "40px",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
            }}
          />
        </div>
      </GridToolbarContainer>
      <br />
      <hr />
    </>
  );
}

function Table({ data, columns }) {
  return (
    <DataGrid
      localeText={{
        toolbarExportCSV: "",
        toolbarExportPrint: "",
      }}
      sx={{ border: "none" }}
      rows={data}
      getRowId={(row) => row.id}
      columns={columns}
      initialState={{
        pagination: {
          paginationModel: { page: 0, pageSize: 5 },
        },
      }}
      slots={{ toolbar: CustomToolBar }}
      slotProps={{
        toolbar: {
          showQuickFilter: true,
        },
        
      }}
      pageSizeOptions={[5, 10]}
      getRowHeight={(params) => 70}
      checkboxSelection
      disableRowSelectionOnClick
      disableColumnMenu
      disableColumnFilter
      disableColumnSelector
      disableDensitySelector
    />
  );
}

export default Table;
