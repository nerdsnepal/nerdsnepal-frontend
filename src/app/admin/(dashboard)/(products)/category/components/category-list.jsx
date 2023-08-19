'use client'
import { fetchUserInfoById } from "@/app/actions/actions";
import { API_URL, isEmpty } from "@/app/lib/utils/utils";
import CategoryIcon from '@mui/icons-material/Category';
import { Box } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import Image from "next/image";
import { useEffect, useState } from "react";
import ExpandableViewForUser from "./expandable-view";
import GridDataCategoryToolbar from "./category-toolbar";

const RenderSubCategoryList=({subCategory})=>{
    return <ul>
        {subCategory.map((value,index)=>{
            if(isEmpty(value))return <></>
        return <li key={'s'+index}>{value}</li>
    })}
    </ul>
}
const CategoryList = ({categories,accessToken}) => {
    let ids= new Set()
    categories?.map(({created_by})=>ids.add(created_by))
    const [users,setUsers] = useState([])
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
    },[categories])
    const cols = [
        { field: '_id', headerName: 'ID', minWidth: 250, resizeable:true,pinned:true,
        className:"dark:text-white", autoWidth:true
        },
        { field: 'name', headerName: 'Name', minWidth: 250, resizeable:true,pinned:true,
        className:"dark:text-white", autoWidth:true
        },
        {
            field:'subCategory', headerName:'Sub Category',minWidth:200,
            renderCell:({row})=>{
                return <RenderSubCategoryList subCategory={row.subCategory} />
            }
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
              return <CategoryIcon />
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
        { field: 'creation_date', headerName: 'Creation date', minWidth: 80, resizeable:true,pinned:true,
             className:"dark:text-white", autoWidth:true,
             valueGetter:({row})=>{
                const date = new Date(row.creation_date)
                console.log(date.getUTCDate());
                const formattedDate = `${date.getDate()}/${date.getUTCDate()}/${date.getFullYear()}`
                return formattedDate
            }
        },
        { field: 'created_by', headerName: 'Created by', minWidth: 180, resizeable:true,pinned:true,
        className:"dark:text-white", autoWidth:true,
        //valueGetter:({row})=>{
          
        //   if(!user)return {}
        //   return user
           
        //},
        renderCell:({row})=>{
            const user = users?.find(({_id})=>_id===row.created_by)
            if(!user) return <h1>Unknown</h1>
            return <ExpandableViewForUser user={user}/>
        }
    },
        
  
        
         ]
    if(categories===null)return <></>
    if(isLoading)   return <>Loading....</>
    return (
    <div className="flex justify-center items-center mt-14" >
        <Box className="dark:bg-gray-900 rounded-lg w-[100%] mobile:w-[80%]" sx={{ height: 520}}>
        <DataGrid
        columns={cols}
        rows={categories}
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
        slots={
            {
                toolbar:GridDataCategoryToolbar
            }
        }
        pageSizeOptions={[7, 20]}
    /></Box>
    </div>
    );
}
 
export default CategoryList;