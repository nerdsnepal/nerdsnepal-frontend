'use client'
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { getProductDetailsById } from "../../actions/action"
import { Stack, Typography } from "@mui/material"
import { API_URL, isEmpty } from "@/app/lib/utils/utils"
import Image from "next/image"
import Avatar from '@mui/material/Avatar';
import Chip from '@mui/material/Chip';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import UserProfile from "@/app/admin/components/UserProfile"
import fetchUserById from "@/app/lib/action/fetchUserById"
import { ArrowBackIos } from "@mui/icons-material"
import Link from "next/link"
import { NextSeo } from "next-seo"

export const metadata= {
    title:"Product",
    description:"Product page"
}

export default function Page  ({params}){
  
    const accessToken = useSelector((state)=>state.auth.accessToken)
    const [product,setProduct]= useState(null)
    const [user,setUser] = useState({isLoading:true,currentUser:null})
    const {slug} = params 
    const [productId,storeId] = [...slug]

    useEffect(()=>{
        (async()=>{
          let result = await  getProductDetailsById({accessToken,storeId,productId})
          if(result.success){
            setProduct(result.product)
            console.log(product);
          }
        })()
    },[accessToken,slug])
    useEffect(()=>{
        if(product!==null){
            (async()=>{
               try{
                const result =await fetchUserById({_id:product.created_by})
                if(result.success){
                   const currentUser = result?.users[0]
                    setUser({...user,currentUser})
                }
               }catch(error){
                console.log(error);
                    //handle error
               }finally{
                //setUser({...user,isLoading:false})
               }
            })()
        }

    },[product])

    if(slug.length<2){
        return <h1>Something went wrong</h1>
    }
    return <>
    <NextSeo 
        title={`Product - ${isEmpty(product?.seo?.title) ? product?.name : product?.seo?.title}`}
    />
    
    <div className="h-screen  overflow-auto m-1 space-y-4 mobile:m-4">
        <Link href={"/products?selectedView=all&role=merchant"}><ArrowBackIos /></Link>
         <Stack direction='column' gap={3}>
        <Stack direction={{ xs: 'column', md: 'row' }}  className=" mobile_tablet:col-auto" gap={3}>
          <Swiper 
            className="w-full mobile:w-[45vw] h-[40vh] mobile:h-[60vh] "
           modules={[Navigation, Pagination, A11y]}
           pagination={{ clickable: true }}>
                {
                    product?.mediaUrls.map((url,index)=>{
                        return <SwiperSlide key={index} className="shadow-md z-0" >
                        <Image width={1024} height={1024} objectFit="fit" src={API_URL(url)} alt=" " className="w-full z-0 mobile:w-[45vw] h-[40vh] mobile:h-[60vh]"/>
                      </SwiperSlide>
                    })
                }
          </Swiper>
          <div className=' w-[40vw] relative text-left font-semibold' >
          
            <h2 className='text-2xl mt-20 mb-5 font-bold'>{product?.name}</h2>
            <h2 className='mb-2 inline text-sm'>Rs.{product?.price?.mrp}</h2>
                {
                    product?.price?.compare_at!==""?<del className="ml-4 text-red-600">Rs.{product?.price?.compare_at}</del>:<></>
                }
            <h2 className={product?.isAvailable?'text-green-700 font-bold':'text-red-600 font-semibold'}>{product?.isAvailable?"Available":"Out of Stock"}</h2>
          {
          product?.inventory!=null?!isEmpty(product.inventory.sku)?<h2 className='mb-2 text-xs'>SKU:{product.inventory.sku}</h2>:<></>:<></>}
           {
            user.isLoading &&user.currentUser===null?<h2>Loading...</h2>:
            <div className="h-[100px] w-fit relative">
                <UserProfile name={user.currentUser.username} profileUrl={user.currentUser.profile} />
            </div>
           } 
            <div dangerouslySetInnerHTML={{__html:product?.description}}></div>
          </div>
        </Stack>
        <Stack direction={{ xs: 'column', md: 'row' }}  gap={4}>
                {product?.variants?.length>0?
            <div className='border rounded-lg border-gray-500 p-4 w-full mobile:w-[60%] space-y-3  h-fit max-h-[250px]'>
            <div className='text-xl font-bold '> Variants</div>
                 {
                    product?.variants.map(({name,value},index)=>{
                        return  <Stack key={index} direction={"row"} gap={2}>
                            <h3 className="text-xs font-bold">{name}</h3>
                            {value?.map((variant,index)=>{
                                if(isEmpty(variant))return <span key={index}></span>
                              return <Chip size="small" className="dark:text-white"  key={index} label={variant}/>
                            })
                            }
                        </Stack>
                    })
                 }
            </div>:<></>}
            {
                product?.inventory?.quantities?.length>0?
                <div className='border rounded-lg border-gray-600 p-4 mr-4 w-full mobile:max-w-[40%] mobile:ml-4 h-fit max-h-[250px] overflow-auto'>
                <h2 className='font-bold text-xl'>Inventory</h2>
                    {
                         product?.inventory?.quantities?.map(({location,quantity},index)=>{
                            return <Stack direction={"row"} gap={2} key={index}>
                                <h3>{location}</h3>
                                <Chip className="dark:text-white" 
                                size="small" label={quantity} />
                            </Stack>
                         })
                    }
              </div>:<></>
            }
        
        </Stack>
        {
            product?.updated?.length>0?<Stack direction={{ xs: 'column', md: 'row' }} >
            <div className='border rounded-lg border-gray-600 p-4 mr-4 h-[250px] w-full'>
             <div className="text-xl font-bold">Update history</div>
              <div className='border rounded-lg border-gray-600 w-[25%] h-[70%] py-5 my-5' >
                <div className='px-5'>
                <Avatar alt="Remy Sharp" src="A" /> 
              </div>
              <div className='font-semibold text-xl  ml-5'>
              <h2>Safal</h2>
              <b className='inline mr-10 '> 26 aug,2023</b>
              <i  className='inline'> 3 days ago</i>
              </div>
              </div>
              <div>
              </div>
            </div>
          </Stack>:<></>
        }
        <div className="h-[12vh]"></div>
      </Stack>

        </div></>
}
