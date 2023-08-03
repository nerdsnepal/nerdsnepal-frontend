import { Avatar } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';

import { useCallback, useState } from 'react';
import LocalMallIcon from '@mui/icons-material/LocalMall';
function EditToolbar(props){
    console.log(props);
    return <>
    <h1>This is a toolbar</h1>
    </>
}


function StoreList({stores}){
    let columns = [
        { field: '_id', headerName: 'ID', minWidth: 200, resizeable:true,pinned:true,
            className:"dark:text-white"
        },
        {
            field:'logo',headerName:'Logo',
            minWidth :100,resizeable:true,
            className:"text-center",
            renderCell: (params) => {
                const row = params.row 
                const {logo,name} = row 
                if(logo===null) return <LocalMallIcon/>
                return <Avatar src={logo} alt={name} />;
            }
        },
        {
            field:'name',headerName:'Store name',
            minWidth :200,resizeable:true,
        },
        {
            field:'status',headerName:"Status",
            minWidth :80,resizeable:true,
            renderCell:({row})=>{
                const {status,_id} = row 
                return <div key={_id} className={`w-3 h-3 rounded-full m-auto ${status?'bg-green-800':'bg-red-800'}`}></div>
            }
        },
        {
            field:'merchantId',headerName:'Merchant ID'
        },
        {
            field:'creation_date',headerName:'Date creation',
            minWidth :200,resizeable:true,
        },
        ,
        {
            field:'subscribed_date',headerName:"Subscribed Date",
            minWidth :200,resizeable:true,
            valueGetter:({row})=>{
                const len = row.subscriptionDetails?.length
                return new Date(row.subscriptionDetails[len-1].subscribed_date)
            }
        },
        {
            field:'expire_on',headerName:"Expire Date",
            minWidth :200,resizeable:true,
            valueGetter:({row})=>{
                const len = row.subscriptionDetails?.length
                const isExpire = row.subscriptionDetails[len-1].isExpire
                if(!isExpire)return "Never Expire"
                return row.subscriptionDetails[len-1].expire_on
            }
        },
        {
            field:'paymentMethod',headerName:'Payment method',
            minWidth :200,resizeable:true,
            valueGetter: ({row}) => {
                const len = row.subscriptionDetails?.length
                return row.subscriptionDetails[len-1].paymentMethod
            },
        },
        {
            field:'subscriptionModel',headerName:"Subscription Model",
            minWidth :150,resizeable:true,
            valueGetter:({row})=>{
                const len = row.subscriptionDetails?.length
                return row.subscriptionDetails[len-1].subscriptionModel
            }
        },
        {
            field:'subscriptionLevel',headerName:"Subscription level",
            minWidth :150,resizeable:true,
            valueGetter:({row})=>{
                const len = row.subscriptionDetails?.length
                return row.subscriptionDetails[len-1].subscriptionLevel
            }
        }
       
    ]
    

    const processRowUpdate = useCallback(
        async(newRow)=>{
            console.log(newRow);
        }
    )

    if(stores===undefined)
    return <></>
    return <div className='h-[75vh] w-[80vw] dark:text-white'>
    <DataGrid
        columns={columns}
        rows={stores}
        style={{
            pagination: {
                padding: 10,
              },
              border:'none',
            //  alignItems:'center',

        }}
        useResizeContainer
        scrollable={true}
        density='comfortable'
        hideFooterSelectedRowCount
        filterMode='client'
        processRowUpdate={processRowUpdate}
        getRowId={(row) => row._id}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 7 },
          },
        }}
        className='dark:text-white'
        editMode='row'
        pageSizeOptions={[7, 20]}
        //checkboxSelection
        slots={{
            toolbar: EditToolbar,
            //columnMenu:EditToolbar

        }}
      />
    

    </div>

}

export default StoreList