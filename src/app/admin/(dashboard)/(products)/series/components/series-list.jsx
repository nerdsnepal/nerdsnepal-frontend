'use client'
import { fetchUserInfoById } from "@/app/actions/actions";
import { API_URL, isEmpty } from "@/app/lib/utils/utils";
import CategoryIcon from '@mui/icons-material/Category';
import { Alert, Box, Skeleton, Snackbar, Stack } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import Image from "next/image";
import { useEffect, useState } from "react";
import ExpandableViewForUser from "./expandable-view";
import Link from "next/link";
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ShowDeleteAlert from "@/app/admin/components/delete-dialog";
import { deleteCategoryById } from "../actions/action";
import { postRequestSichu } from "@/app/www/actions/action";

const SeriesAction = ({series,onActionPerform})=>{
    const [showDialog,setDialog] = useState(false)
    const handleEdit = ()=>{
        if(onActionPerform)
        onActionPerform("Edit",series)
    }
    const handleDelete = ()=>{
        setDialog(true)
    }
    const style = 'hover:cursor-pointer hover:text-blue-800 transition-all'
    return <Stack direction={"row"} gap={1}>
        <ShowDeleteAlert title="Do you want to delete this series?" open={showDialog} onClose={()=>setDialog(false)} onDelete={()=>{
                setDialog(false)
              if(onActionPerform)
              onActionPerform("Delete",series)
        }}  />
       {/*<Link target="_blank" href={`/view/${category._id}/${category.storeId}`}> <VisibilityIcon className={style}  /></Link>*/}
        {/*<EditIcon className={style} onClick={handleEdit}/>*/}
        <DeleteIcon className={style} onClick={handleDelete}/>
    </Stack>
}


const SeriesList = ({series,accessToken,onDelete}) => {
    let ids= new Set()
    series?.map(({created_by})=>ids.add(created_by))
    const [users,setUsers] = useState([])
    const [response,setResponse] = useState({
        hasResponse:false,
        servity:"info",
        message:""
    })
    const [isLoading,setIsLoading] = useState(true)
    useEffect(()=>{
        const fetch =async ()=>{
            try {
                const userId = [...ids]
                if(userId.length===0)return
                let result= await fetchUserInfoById({accessToken,userId})
                setUsers(result.users)
            } catch (error) {
                //console.log(error);
            }finally{
                setIsLoading(false)
            }
        }
        fetch()
    },[series])

    const handleActionPerform =async (type,_series)=>{
        if(type==="Delete"){
            const {storeId,_id} = _series 
         try {
            let result  = await  postRequestSichu({accessToken:accessToken,body:{storeId,seriesId:_id},endPoint:"admin/series",method:"Delete"})
            console.log(result);
            if(result.success){
                setResponse({hasResponse:true,servity:"success",message:result.message})
                if(onDelete)
                onDelete(_series)
            }
            else{
                setResponse({hasResponse:true,servity:"error",message:result.message})
            }
         } catch (error) {
            setResponse({hasResponse:true,servity:"error",message:"Something went wrong"})
         }finally{
            setTimeout(()=>{
                setResponse({hasResponse:false,servity:"info",message:""})
            },3000)
         }
        }
    }

    const cols = [
        { field: 'name', headerName: 'Series name', minWidth: 250, resizeable:true,pinned:true,
        className:"dark:text-white", autoWidth:true
        },
        {
            field:'images',headerName:'Image',
            minWidth :100,resizeable:true,
            className:"text-center",
            renderCell: ({row}) => {
                const {images,name} = row 
                const len = images?.length 
                if(len>0){
                    const {url} = images[0]
                    return <Image src={API_URL(url)} className="cursor-pointer" alt={name} width={100} height={100} />;
                }
              return <></>
            }, autoWidth:true
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
        { field: 'created_by', headerName: 'Created by', minWidth: 180, resizeable:true,pinned:true,
        className:"dark:text-white", autoWidth:true,
        //valueGetter:({row})=>{
          
        //   if(!user)return {}
        //   return user
           
        //},
        renderCell:({row})=>{
            const user = users?.find(({_id})=>_id===row.created_by)
            return isLoading?<Skeleton width={100} />:user===null?<span>Unknown</span>:<ExpandableViewForUser user={user}/>
        }
    },
    { field: '_id', headerName: 'Action',resizeable:true,pinned:true,
        className:"dark:text-white",
    renderCell:({row})=>{
        return <SeriesAction  onActionPerform={handleActionPerform} series={row}/>
    }}
    ]
    if(series===null)return <></>
    return (
        <div>
             <Snackbar open={response.hasResponse} autoHideDuration={300}>
            <Alert severity={response.servity} >{response.message}</Alert>
        </Snackbar>
    <div className="flex justify-center  items-center mt-14" > 
        <Box className="dark:bg-gray-900  rounded-lg w-[100%] mobile:w-[80%]" sx={{ height: 520}}>
        <DataGrid
        columns={cols}
        rows={series}
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
    </div>
    );
}
 
export default SeriesList;