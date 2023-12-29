'use client'
import { useSichuFetch } from "@/app/www/hooks/use-fetch";
import { useSelector } from "react-redux";
import { API_URL, orderStatusStyle } from '@/app/lib/utils/utils';
import { Box, Button, Stack, Typography } from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';

const CurrentAdminOrderList = ({rows,columns,title="Recent Orders",hideStyle=false,storeId}) => {
    if(rows.length===0){
        return (<Box className={`bg-slate-50 p-4 border h-[70vh]  w-[60vw] overflow-auto`}>
        <Typography  className='pt-4 pb-4 font-bold text-[#0F172A]'>{title}</Typography>
           
            <Stack className='h-[80%]' direction={'column'}  gap={1} justifyContent={'center'} alignItems={'center'}>
                <Typography variant='body1'>No Orders Yet</Typography>
              <Button className='bg-blue-500' variant='contained'><Link className='text-white capitalize' href={'/shop-all'}>Start Shopping Now</Link></Button>
            </Stack>

    </Box>);
    }
    return (<Box className={`${hideStyle?'':'bg-slate-50'} p-4 ${hideStyle?'':'border'} mobile:w-auto w-[100vw] overflow-auto`}>
        <Typography  className='pt-4 pb-4 font-bold text-[#0F172A]'>{title}</Typography>
            <Stack direction={'row'} gap={3}>
                {
                    columns.map(({width,field,headerName},index)=>{
                        return <Box key={index} width={width}>
                            <Typography width={width}>{headerName}</Typography>
                        </Box>
                    })
                }
            </Stack>
            <Stack direction={'column'}  gap={1}>
                {
                    rows.map((product,index)=>{
                       return  <Stack key={index} alignItems={'center'}  direction={'row'} gap={3}>
                            {
                                columns.map(({width,field},index)=>{
                                    if(field==="mediaUrls"){
                                        const urls = product[field];
                                        if(urls.length===0){
                                            return <Box key={index}></Box>
                                        }
                                        return <Image alt='' src={API_URL(urls[0])} width={82} height={69} key={index}/>
                                    }
                                    if(field==='manage'){
                                        return <Link key={index} href={`orders/detail?orderId=${product['orginalId']}&storeId=${storeId}`}>{hideStyle?'Order details':'Manage'}</Link>
                                    }
                                    if(field==="status"){
                                      return   <Typography  className={orderStatusStyle(product[field])} key={index} variant='body1'>{product[field]}</Typography>
                                    }
                                    return <Box width={width}  key={index}>
                                        <Typography width={width}  className={`w-[${width}]`}>{product[field]}</Typography>
                                    </Box>
                                })
                            }
                        </Stack>
                    })
                }
            </Stack>

    </Box>);
}

function filterUniqueById(arr) {
    const uniqueMap = new Map();
    arr.forEach(obj => {
      if (!uniqueMap.has(obj._id)) {
        uniqueMap.set(obj._id, obj);
      }
    });
  
    return Array.from(uniqueMap.values());
}
const StoreOrderList = ({props})=>{
    const storeId = useSelector((state)=>state.auth.storeId)
    const isSuperUser = useSelector((state)=>state.auth.isSuperAdmin)
    const {data,isLoading} = useSichuFetch({endPoint:`order/store?storeId=${storeId}`,revalidate:2})
    if(!storeId ){
        if(!isSuperUser){return null;}
    };
    if(isLoading)return;
    if(!data)return;
    const columns = [
        { field: '_id', headerName: 'Order #',width:"110px" },
        { field: 'mediaUrls', headerName: 'Items', width: "90px"},
        { field: 'name', headerName: 'Product Name', width: "225px"},
        { field: 'date', headerName: 'Placed on', width: "100px"},
        { field: 'price', headerName: 'Total', width: "100px"},
        { field: 'status', headerName: 'Status', width: "100px"},
        { field: 'manage', headerName: 'Action', width: "70px"},
      ];
      let rows = [];
      let index=0;
      for(let item of data){
        for(const product of item.products){
            index++;
            const _id = parseInt(item._id, 14);
            const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
            rows.push({
                index:index,
                ...product,
                price:`NRS.${product.price}`,
                _id,
                orginalId:item._id,
                status:item.status,
                date:new Date(item.createdAt).toLocaleDateString("en-US",options)
            })
        }
      }  
     rows = filterUniqueById(rows)
    return <Box padding={4} className="relative h-screen w-[100%]" overflow={'auto'}>
       <CurrentAdminOrderList hideStyle={true} storeId={storeId} rows={rows} columns={columns} title="Orders" />
       <Box height={140}/>
    </Box>
}
export default StoreOrderList;