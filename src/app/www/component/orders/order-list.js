"use client"
import { API_URL, orderStatusStyle } from '@/app/lib/utils/utils';
import { Box, Button, Stack, Typography } from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';
const OrderList = ({rows,columns,title="Recent Orders",hideStyle=false}) => {
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
                                        return <Link key={index} href={`/account/orders/detail?orderId=${product['orginalId']}`}>{hideStyle?'Order details':'Manage'}</Link>
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
 
export default OrderList;