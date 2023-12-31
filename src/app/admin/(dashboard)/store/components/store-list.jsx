import { Avatar, Box } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import EditIcon from '@mui/icons-material/Edit';
import { useCallback } from 'react';
import LocalMallIcon from '@mui/icons-material/LocalMall';
import Link from 'next/link';
import { API_URL } from '@/app/lib/utils/utils';


export const metadata = {
    title:"Store",
    description:"Store List"
}

const StoreAction = ({store})=>{
    return <>
        <Link href={`store/edit/${store._id}`} target='_blank'><EditIcon/></Link>
    </>
}
function StoreList({stores}){
    let columns = [
        {
            field:'name',headerName:'Store name',
            minWidth :200,resizeable:true,
        },
        {
            field:'logo',headerName:'Logo',
            minWidth :100,resizeable:true,
            className:"text-center",
            renderCell: (params) => {
                const row = params.row 
                const {logo,name} = row 
                if(logo===null) return <LocalMallIcon/>
                return <Avatar src={API_URL(logo)} alt={name} />;
            }
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
                const len = row?.subscriptionDetails?.length
                if(len>0)
                return new Date(row?.subscriptionDetails[len-1]?.subscribed_date)
                return ""
            }
        },
        {
            field:'expire_on',headerName:"Expire Date",
            minWidth :200,resizeable:true,
            valueGetter:({row})=>{
                const len = row.subscriptionDetails?.length
                const isExpire = row.subscriptionDetails[len-1].isExpire
                const currentDate = Date.now()

                if(!isExpire)return "Never Expire"
                return row.subscriptionDetails[len-1].expire_on
            }
        },
        {
            field:'expire_status',headerName:"Expire Status",
            minWidth :120,resizeable:true,
            renderCell:({row})=>{
                const len = row.subscriptionDetails?.length
                const isExpire = row.subscriptionDetails[len-1].isExpire
                let status = true
                //compareDateToC(row.subscriptionDetails[len-1].expire_on)
                if(!isExpire)status= false
                return <div key={row._id+"expire"} className={`w-3 h-3 rounded-full m-auto ${status?'bg-green-800':'bg-red-800'}`}></div>
            },
            
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
        },
        { field: '_id', headerName: 'Action', minWidth: 200, resizeable:true,pinned:true,
        className:"text-black",
        renderCell:({row})=>{
            return <StoreAction store={row} key={row._id} />
        }
         
    },
    ]

    const processRowUpdate = useCallback(
        async(newRow)=>{
            //console.log(newRow);
        }
    )
   
    return <div className="flex justify-center items-center mt-14" >
    <Box className=" rounded-lg w-[100vw] mobile:w-[72vw]" sx={{ height: 520}}>
    <DataGrid
        columns={columns}
        rows={stores}
        style={{
            pagination: {
                padding: 10,
              },
              border:'none',
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
        className='text-black'
        editMode='row'
        pageSizeOptions={[7, 20]}
        //checkboxSelection
        slots={{
            //toolbar: EditToolbar,
            //columnMenu:EditToolbar

        }}
      />
   </Box>
   </div>

}

export default StoreList