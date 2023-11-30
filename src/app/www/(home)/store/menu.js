"use client"
import { Box, InputAdornment, Stack, TextField } from "@mui/material";
import Link from "next/link";
import { Search } from "@mui/icons-material";
import { isEmpty } from "@/app/lib/utils/utils";
import {  useState } from "react";

export const StoreInfoMenu = ({tabs,tab,storeId})=>{
    const [query,setQuery] = useState();
    return <Stack direction={{xs:"column",md:"row"}} alignItems={'center'} >
        <Stack direction={'row'} gap={4} className="bg-slate-300 p-4 m-2 rounded-md mobile:w-[70vw] w-[100vw]">
            {
                tabs.map((current,index)=>{
                    let color = current.tab==tab?"blue":"black";
                    if(isEmpty(tab) && current.tab==tabs[0].tab){
                        color = "blue-500";
                    }
                    return   <span key={index}>
                    <Link style={{color:color}} href={`/store?id=${storeId}&tab=${current.tab}`}>{current.label}</Link>
                    </span>
                })
            }
        </Stack>
        <Box className='mobile:w-[23.5vw] w-[100%]'>
        <TextField  value={query} onChange={(e)=>setQuery(e.target.value)}  label="Search in Store" fullWidth variant="outlined"
        InputProps={{
            endAdornment: <InputAdornment position="end"><Link href={`/store?id=${storeId}&q=${query}&tab=${tab}`}> <Search className="cursor-pointer"    /></Link></InputAdornment>,
          }}
          />
        </Box>

    </Stack>
}