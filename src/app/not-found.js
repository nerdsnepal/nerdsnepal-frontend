import Link from 'next/link'
import { API_URL,SICHU_API_KEY } from './lib/utils/utils'
import { fetchSichu } from './www/actions/action'
import { Box, Stack, Typography } from '@mui/material/index'
import Image from 'next/image'
import ProductItem from './www/component/products/product-item'
 
export default async function NotFound({message="404"}) {
  let data = null 
    try {
        data = await fetchSichu({accessToken:null,endPoint:'trending/',revalidate:90})
        if(data.success){
            data= data?.data 
        }else{
            data= null;
        }
    } catch (error) {
        data= null;
    }
  return (<Box className='h-[100%] w-[100%]'  bgcolor={'white'}>
      <Stack direction={'column'}  className='h-[500px] w-full' position={'relative'}  alignItems={'center'}>
      <Box position={'relative'} top={52} display={'flex'} justifyContent={'center'} alignItems={'center'}>
           <div className='absolute'> <Typography variant='h1' fontSize={{xs:96,md:128}} role='presentation' position={'relative'} textAlign={'center'} color={'#C6D5E3'}>{message}</Typography></div>
            <Typography variant='h5' role='presentation' fontWeight={'bold'} fontSize={{xs:24,md:36}} className='text-[#0A172D]' position={'relative'}  zIndex={111} textAlign={'center'}>Looks Like You Are Lost</Typography>
       </Box>
       <Image src={'/404.png'} unoptimized alt='Not found' loading='lazy'  height={230} width={730} className='h-[230px] mobile:w-[730px] rounded-lg w-[95%] object-cover relative top-[120px] z-[999]' />
      </Stack>
     <Stack direction={'column'} padding={{xs:0,md:4}} justifyContent={'center'} alignItems={'start'}>
     <Typography variant='h6'  className='text-[#0A172D]' marginBottom={2} fontWeight={'bold'}>YOU CAN BUY THESE INSTEAD</Typography>
      <Stack position={'relative'} display={'flex'} justifyContent={'center'} direction={'row'} gap={1} flexWrap={'wrap'}>
       {
         data!==null?data.map((product,index)=>{
            return <ProductItem key={index} product={product} />
         }):null
       }
      </Stack>
     </Stack>
  </Box>)
}