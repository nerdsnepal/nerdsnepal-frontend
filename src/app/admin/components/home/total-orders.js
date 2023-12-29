'use client'

import { useSichuFetch } from "@/app/www/hooks/use-fetch"
import {  Skeleton, Stack, Typography } from "@mui/material";

export default function TotalOrders  ({date=new Date(),storeId}){
    const {data,isLoading,error} = useSichuFetch({endPoint:`order/analytics/today?storeId=${storeId}`,revalidate:10})
    if(isLoading){
        return  <Stack direction={{xs:'column',md:'row'}} flexWrap={'wrap'} gap={2} justifyContent={'center'} alignContent={['center']}>
          {
              [1,2,3,4,5,6,7].map((index)=>   <Skeleton key={index} variant="rounded" height={'150px'} width={'250px'} />)
          }
        </Stack>
    }
    if(!data){
        return <></>
    }
    return <Stack direction={{xs:'column',md:'row'}} gap={2} justifyContent={'center'} alignContent={['center']} flexWrap={'wrap'}>
        <Stack alignItems={'center'}  className="h-[150px] bg-slate-100 text-blue-800 mobile:w-[250px] border p-3 hover:shadow-lg cursor-pointer shadow-md rounded-lg">
                    <Typography className="p-2" variant="h5" role="presentation" fontWeight={'bold'}><b className="text-slate-500">#</b>Total Orders</Typography>
                    <Typography className={`p-2 ${data.totalOrder==0?'text-slate-500 !important':''}`} variant="h4" role="presentation" fontWeight={'bold'}> {data.totalOrder}</Typography>
        </Stack>
        <Stack alignItems={'center'}  className="h-[150px] bg-slate-100 mobile:w-[250px] text-blue-800 border p-3 hover:shadow-lg cursor-pointer shadow-md rounded-lg">
          <Typography className="p-2" variant="h5" role="presentation" fontWeight={'bold'}><b className="text-slate-500">#</b>Total Quantity</Typography>
           <Typography className={`p-2 ${data.totalQuantity==0?'text-slate-500 !important':''}`} variant="h4" role="presentation" fontWeight={'bold'}> {data.totalQuantity}</Typography>
        </Stack>
        <Stack alignItems={'center'}  className="h-[150px] bg-slate-100 mobile:w-[250px] text-blue-800 border p-3 hover:shadow-lg cursor-pointer shadow-md rounded-lg">
          <Typography className="p-2" variant="h5" role="presentation" fontWeight={'bold'}><b className="text-slate-500">#</b>Users</Typography>
           <Typography className={`p-2 ${data.users.length==0?'text-slate-500 !important':''}`} variant="h4" role="presentation" fontWeight={'bold'}> {data.users.length}</Typography>
        </Stack>
        <Stack alignItems={'center'}  className="h-[150px] bg-slate-100 mobile:w-fit text-blue-800 border p-3 hover:shadow-lg cursor-pointer shadow-md rounded-lg">
          <Typography className="p-2" variant="h5" role="presentation" fontWeight={'bold'}><b className="text-slate-500">#</b>Total Cancellation</Typography>
           <Typography className={`p-2 ${data.totalCancellation==0?'text-slate-500 !important':''}`} variant="h4" role="presentation" fontWeight={'bold'}> {data.totalCancellation}</Typography>
        </Stack>
        <Stack alignItems={'center'}  className="h-[150px] bg-slate-100 mobile:w-fit text-blue-800 border p-3 hover:shadow-lg cursor-pointer shadow-md rounded-lg">
          <Typography className="p-2" variant="h5" role="presentation" fontWeight={'bold'}><b className="text-slate-500">#</b>Total Delivered</Typography>
           <Typography className={`p-2 ${data.totalDeliverd==0?'text-slate-500 !important':''}`} variant="h4" role="presentation" fontWeight={'bold'}> {data.totalDeliverd}</Typography>
        </Stack>
        <Stack alignItems={'center'}  className="h-[150px] bg-slate-100 mobile:w-fit text-blue-800 border p-3 hover:shadow-lg cursor-pointer shadow-md rounded-lg">
          <Typography className="p-2" variant="h5" role="presentation" fontWeight={'bold'}><b className="text-slate-500">#</b>Total Pending</Typography>
           <Typography className={`p-2 ${data.totalPending==0?'text-slate-500 !important':''}`} variant="h4" role="presentation" fontWeight={'bold'}> {data.totalPending}</Typography>
        </Stack>
        <Stack alignItems={'center'}  className="h-[150px] bg-slate-100 mobile:w-fit text-blue-800 border p-3 hover:shadow-lg cursor-pointer shadow-md rounded-lg">
          <Typography className="p-2" variant="h5" role="presentation" fontWeight={'bold'}><b className="text-slate-500">#</b>Total Shipped</Typography>
           <Typography className={`p-2 ${data.totalShipped==0?'text-slate-500 !important':''}`} variant="h4" role="presentation" fontWeight={'bold'}> {data.totalShipped}</Typography>
        </Stack>
        <Stack alignItems={'center'}  className="h-[150px] bg-slate-100 mobile:w-fit text-blue-800 border p-3 hover:shadow-lg cursor-pointer shadow-md rounded-lg">
          <Typography className="p-2" variant="h5" role="presentation" fontWeight={'bold'}><b className="text-slate-500">#</b>Total Processing</Typography>
           <Typography className={`p-2 ${data.totalShipped==0?'text-slate-500 !important':''}`} variant="h4" role="presentation" fontWeight={'bold'}> {data.totalProcessing}</Typography>
        </Stack>
    </Stack>

}