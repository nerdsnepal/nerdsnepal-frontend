import { Avatar } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';

function StoreList({stores}){
    const columns = [
        { field: '_id', headerName: 'ID', width: 200 },
        {
            field:'logo',headerName:'Logo',
            renderCell: (params) => {
                const row = params.row 
                const {logo,name} = row 
                return <Avatar src={logo} alt={name} />;
            }
        },
        {
            field:'name',headerName:'Store name',width:200
        },
        {
            field:'status',headerName:"Status",
            renderCell:({row})=>{
                const {status,_id} = row 
                return <div key={_id} className={`w-2 h-2 rounded-full ${status?'bg-green-800':'bg-red-800'}`}></div>
            }
        },
        {
            field:'merchantId',headerName:'Merchant ID'
        },
        {
            field:'creation_date',headerName:'Date creation'
        }
       
    ]
    if(stores===undefined)
    return <></>
    return <div className='h-[75vh]'>
    <DataGrid
        columns={columns}
        rows={stores}
        getRowId={(row) => row._id}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        className='dark:text-white'
        editMode='row'
        pageSizeOptions={[7, 20]}
        checkboxSelection
      />
    

    </div>

}

export default StoreList