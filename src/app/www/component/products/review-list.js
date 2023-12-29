"use client";
import { API_URL } from "@/app/lib/utils/utils";
import { Avatar, Box, Pagination, Rating, Stack, Typography } from "@mui/material";
import Image from "next/image";
import { useState } from "react";

const ReivewList = ({data,justifyContent='center',itemsPerPage=3}) => {
    const totalItems = data?.length
    const [page,setPage] = useState(1)
   const handleChange = (e,value)=>{
        setPage(value)
   }
   const ReviewItem = ({comment})=>{
    if(!comment.comment){
        return null
    }
    return <Stack direction={'row'} className="p-3 bg-slate-100 rounded-md" gap={2}>
        <Avatar style={{borderRadius:0,height:100,width:100}} src={API_URL(comment.userId.profile)} width={100} height={100} alt="" />
        <Box>
            <Rating  value={Number(comment.value)} readOnly/><div></div>
            <Typography variant="caption">Reivewed by</Typography>
            <Typography variant="body1" fontWeight={'bold'}>{comment.userId.name}</Typography>
            <Typography>{comment.comment}</Typography>
        </Box>
    </Stack>
   }
    const NoReviewFound = ()=>{
        return <h1 className="p-4">No review</h1>
    }
    return (<Box gap={2} role="presentation" >
        <Typography variant="body" padding={2} fontWeight={'bold'} >Reviews</Typography>
        <Box height={10}/>
    {totalItems==0?<NoReviewFound />:null}
        <Stack display={'flex'} direction={'column'} flexWrap={'wrap'}  justifyContent={justifyContent} gap={1.2}>
            {
                data?.slice((page-1)*itemsPerPage,page*itemsPerPage).map((comment,index)=>{
                    return <ReviewItem comment={comment}  key={index}/>
                })
            }
        </Stack>
        {totalItems>itemsPerPage?<div className="flex w-full justify-center mb-3"><Pagination  className={`pagination-label text-black`} count={Math.ceil(totalItems/itemsPerPage)} onChange={handleChange}  page={page}  /></div>:null}    
    </Box>);
}
 
export default ReivewList;