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
import CreateIcon from "@mui/icons-material/Create";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import ConfirmDelete from '../../global/ConfirmDelete';
import Modal from '../../global/Modal';

import {  useCallback, useEffect, useState } from "react";
import { Box, LinearProgress, styled } from "@mui/material";
import request from "../../requests/request";
import useAsyncRequest from "../../Hooks/useAsyncRequest";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

// const PAGE_SIZE = 5;

// const SERVER_OPTIONS = {
//   useCursorPagination: false, // Set to false for page number pagination
// };


const StyledGridOverlay = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  height: '100%',
  '& .ant-empty-img-1': {
    fill: theme.palette.mode === 'light' ? '#aeb8c2' : '#262626',
  },
  '& .ant-empty-img-2': {
    fill: theme.palette.mode === 'light' ? '#f5f5f7' : '#595959',
  },
  '& .ant-empty-img-3': {
    fill: theme.palette.mode === 'light' ? '#dce0e6' : '#434343',
  },
  '& .ant-empty-img-4': {
    fill: theme.palette.mode === 'light' ? '#fff' : '#1c1c1c',
  },
  '& .ant-empty-img-5': {
    fillOpacity: theme.palette.mode === 'light' ? '0.8' : '0.08',
    fill: theme.palette.mode === 'light' ? '#f5f5f5' : '#fff',
  },
}));

export function CustomNoRowsOverlay({width=1200,text}) {
  return (
    <>
    <StyledGridOverlay>
      <svg
        width={width}
        height="100"
        viewBox="0 0 184 152"
        aria-hidden
        focusable="false"
      >
        <g fill="none" fillRule="evenodd">
          <g transform="translate(24 31.67)">
            <ellipse
              className="ant-empty-img-5"
              cx="67.797"
              cy="106.89"
              rx="67.797"
              ry="12.668"
            />
            <path
              className="ant-empty-img-1"
              d="M122.034 69.674L98.109 40.229c-1.148-1.386-2.826-2.225-4.593-2.225h-51.44c-1.766 0-3.444.839-4.592 2.225L13.56 69.674v15.383h108.475V69.674z"
            />
            <path
              className="ant-empty-img-2"
              d="M33.83 0h67.933a4 4 0 0 1 4 4v93.344a4 4 0 0 1-4 4H33.83a4 4 0 0 1-4-4V4a4 4 0 0 1 4-4z"
            />
            <path
              className="ant-empty-img-3"
              d="M42.678 9.953h50.237a2 2 0 0 1 2 2V36.91a2 2 0 0 1-2 2H42.678a2 2 0 0 1-2-2V11.953a2 2 0 0 1 2-2zM42.94 49.767h49.713a2.262 2.262 0 1 1 0 4.524H42.94a2.262 2.262 0 0 1 0-4.524zM42.94 61.53h49.713a2.262 2.262 0 1 1 0 4.525H42.94a2.262 2.262 0 0 1 0-4.525zM121.813 105.032c-.775 3.071-3.497 5.36-6.735 5.36H20.515c-3.238 0-5.96-2.29-6.734-5.36a7.309 7.309 0 0 1-.222-1.79V69.675h26.318c2.907 0 5.25 2.448 5.25 5.42v.04c0 2.971 2.37 5.37 5.277 5.37h34.785c2.907 0 5.277-2.421 5.277-5.393V75.1c0-2.972 2.343-5.426 5.25-5.426h26.318v33.569c0 .617-.077 1.216-.221 1.789z"
            />
          </g>
          <path
            className="ant-empty-img-3"
            d="M149.121 33.292l-6.83 2.65a1 1 0 0 1-1.317-1.23l1.937-6.207c-2.589-2.944-4.109-6.534-4.109-10.408C138.802 8.102 148.92 0 161.402 0 173.881 0 184 8.102 184 18.097c0 9.995-10.118 18.097-22.599 18.097-4.528 0-8.744-1.066-12.28-2.902z"
          />
          <g className="ant-empty-img-4" transform="translate(149.65 15.383)">
            <ellipse cx="20.654" cy="3.167" rx="2.849" ry="2.815" />
            <path d="M5.698 5.63H0L2.898.704zM9.259.704h4.985V5.63H9.259z" />
          </g>
        </g>
      </svg>
      <Box sx={{ mt: 1 }}>{text ? text:"No Result"}</Box>
    </StyledGridOverlay>
    </>
  );
}

function CustomToolBar() {
  

  return (
    <>
      <GridToolbarContainer
        sx={{ display: "flex", justifyContent: "space-between" }}
      >
        <GridToolbarQuickFilter debounceMs={500}  />
        <div className="flex">
          {/* <GridPrintExportMenuItem
            sx={{
              height: "50px",
              width: "50px",
              backgroundImage: `url(${pdfImage})`,
              backgroundSize: "40px",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
            }}
          /> */}
          {/* <GridCsvExportMenuItem
            sx={{
              height: "50px",
              width: "50px",
              backgroundImage: `url(${xlsImage})`,
              backgroundSize: "40px",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
            }}
          /> */}
        </div>
      </GridToolbarContainer>
      <br />
      <hr />
    </>
  );
}

function Table({entity, columns,editPath,showToolbar=true,showCheckboxSelection = false,showPagination=false }) {

  const [paginationModel, setPaginationModel] = useState({
    page: 0, 
    pageSize: 5,
  });

  const [query,setQuery] = useState(null);


  const { onRequest, isLoading, isSuccess, result } = useAsyncRequest();
  const token = useSelector((state) => state.auth.current.user.jwt);

  console.log(result)

  const data = result?.rows || [];
  const rowCount = result?.rowCount || 0;

  const getData = async (options,entity) =>{
    return await request.list({entity,token,options});
  }

  const deleteRequest = async(entity,id)=>{
    return await request.delete({entity,id,token});
  }


  const searchRequest = async (entity,options) =>{
    console.log(entity)
    
    return await request.search({entity,token,options})
  }

  const handelDataTableLoad = async (pagination) => {
    const options = { limit: paginationModel.pageSize , offset: (paginationModel.page) * paginationModel.pageSize };
    const callback = getData(options,entity);
    onRequest(callback);
  };

  const handleDelete = async (id)=>{
    await onRequest(deleteRequest(entity,id));
    setPaginationModel((state) => ({...state,page:0}));
    await handelDataTableLoad();
  };

  const handleSearch = async ()=>{
    const options = { query:query,limit: paginationModel.pageSize , offset: (paginationModel.page) * paginationModel.pageSize };
    const callback = searchRequest(entity,options);
    onRequest(callback);
  }

  const onFilterChange = useCallback((filterModel) => {
    // Here you save the data you need from the filter model
    const filteredValue = filterModel.quickFilterValues[0];
    setQuery(filteredValue);
    setPaginationModel((state)=>({...state,page:0}));
  }, []);
  

  const updatedColumn = [
    ...columns,
    {
      field: 'action',
      headerName: 'Action',
      sortable:false,
      renderCell: (params) => (
        <div className='flex items-center justify-between gap-2'>
            <Link className='bg-primary text-white text-sm rounded-md p-1' to={`/${editPath}/edit/${params.row.id}`}>
                <CreateIcon />
            </Link>
            <Modal>
                <Modal.Open opens='delete-form'>
                    <button className='bg-[#ff3a31] text-white rounded-md p-1' >
                        <DeleteOutlineOutlinedIcon />
                    </button>
                </Modal.Open>
                <Modal.Window name='delete-form'>
                    <ConfirmDelete id={params.row.id} handleDelete={handleDelete}  />
                </Modal.Window>
            </Modal>
        </div>
        ),
    }, 
  ]
  

  
 


  useEffect(()=>{
    if(query){
      handleSearch();
    }else{
      handelDataTableLoad();
    }
  },[paginationModel,query])




  const gridConfig = {
    localeText: {
      toolbarExportCSV: '',
      toolbarExportPrint: '',
    },
    sx: { border: 'none' },
    rows: data,
    rowCount: rowCount,
    getRowId: (row) => row.id,
    columns: updatedColumn,
    initialState: {
      pagination: {
        paginationModel: { page: 1, pageSize: 5 },
      },
    },
    slots: {
      noResultsOverlay: CustomNoRowsOverlay,
      toolbar: showToolbar && CustomToolBar,
      loadingOverlay: LinearProgress,
    },
    slotProps: {
      toolbar: {
        showQuickFilter: true,
      },
    },
    pageSizeOptions: [5, 10],
    getRowHeight: (params) => 70,
    disableRowSelectionOnClick: true,
    disableColumnMenu: true,
    disableColumnFilter: true,
    disableColumnSelector: true,
    disableDensitySelector: true,
    paginationMode: 'server',
    filterMode:"server",
    onPaginationModelChange: setPaginationModel,
    onFilterModelChange:onFilterChange,
    paginationModel: paginationModel,
    loading: isLoading,
    useCursorPagination:false
  };

  
  return (
    <DataGrid {...gridConfig} />
  );
}

export default Table;
