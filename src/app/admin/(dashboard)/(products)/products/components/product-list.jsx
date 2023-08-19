import { API_URL } from "@/app/lib/utils/utils";
import { Box } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid"
import Image from "next/image";
import ImageIcon from '@mui/icons-material/Image';

export const StoreProductList = ({products})=>{
    const cols = [
        {field:'_id',headerName:'ID',minWidth:200},
        {field:'name',headerName:'Name',minWidth:200},
        {field:'description',headerName:'Description',minWidth:200,
        renderCell:({row})=>{
            const {description,_id} = row
            const markup = { __html: description };
            return <div key={_id} dangerouslySetInnerHTML={markup}/>
           // return <div key={_id} className={`w-3 h-3 rounded-full m-auto ${status?'bg-green-800':'bg-red-800'}`}></div>
        },
        
        },

        {
            field:'mediaUrls',headerName:'Image',
            minWidth :100,resizeable:true,
            className:"text-center",
            renderCell: ({row}) => {
                const {mediaUrls,name} = row 
                const len = mediaUrls?.length 
                if(len>0){
                    const url = mediaUrls[0]
                    console.log(API_URL(url));
                    return <Image src={API_URL(url)} className="cursor-pointer" alt={name} width={100} height={100} />;
                }
              return <ImageIcon/>
            }, autoWidth:true
        },
        { field: 'price', headerName: 'Selling Price', minWidth: 80, resizeable:true,pinned:true,
        className:"dark:text-white", autoWidth:true,
        valueGetter:({row})=>{
            const {mrp} = row.price 
           return `Rs. ${mrp}` 
       }
        },
        {
            field:'status',headerName:"Status",
            minWidth :80,resizeable:true,
            className:'text-center',
            renderCell:({row})=>{
                const {status,_id} = row
                return <h1 className={`text-center border border-dashed ${status?'border-green-500':"border-red-500"} px-4 py-1 font-bold  rounded-2xl`}>{status?'Active':'Draft'}</h1>
               // return <div key={_id} className={`w-3 h-3 rounded-full m-auto ${status?'bg-green-800':'bg-red-800'}`}></div>
            }, autoWidth:true
        },


    ]

   return (
    <div className="flex justify-center items-center mt-14" >
        <Box className="dark:bg-gray-900 rounded-lg w-[100%] mobile:w-[80%]" sx={{ height: 520}}>
        <DataGrid
        columns={cols}
        rows={products}
        style={{
            pagination: {
                padding: 7,
                color:"white"
              },
              border:'none',
        }}
        useResizeContainer
        scrollable={true}
        density='comfortable'
        hideFooterSelectedRowCount
        filterMode='server'
        getRowId={(row) => row._id}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 7 },
          },
        }}
        className='dark:text-white'
        editMode='row'
        pageSizeOptions={[7, 20]}
    /></Box>
    </div>
    );

}