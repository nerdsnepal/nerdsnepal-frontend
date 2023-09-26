'use client'
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { getProductDetailsById } from "../../actions/action"
import { Skeleton, Stack, Typography } from "@mui/material"
import { API_URL, currency_code, isEmpty, skeletonSX } from "@/app/lib/utils/utils"
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
import ProductViewLoading from "../../components/product-view-loading"

export const metadata= {
    title:"Product",
    description:"Product page"
}
const findUser = ({users,userId})=>{
    let user = null 
    console.log(users);
    for(const __user of users){
        if(__user._id===userId){
           user = __user 
           break
        }
      }
      return user 
}

const UpdateHistoryItem = ({update,user})=>{
    const {updated_by,updated_at,remarks}= update
    const currentUser = findUser({users:user,userId:updated_by})
    console.log(currentUser);
    const days = Math.ceil((new Date().getTime() - new Date(updated_at).getTime()) / 86400000)
    const date = new Date(updated_at).toDateString()
    return <div  className='border rounded-lg p-2 border-gray-600 w-full mobile:w-fit mobile:max-w-[25%] h-[70%] space-y-2' >
        <UserProfile name={currentUser.username} profileUrl={currentUser?.profile} />
        <Typography variant="body2" className="overflow-hidden" >{remarks}</Typography>
        <Stack direction={'row'} gap={2} className="items-center">
        <Typography variant="body2">{date}</Typography>
        <i className="text-[11px]">{days==1?'1 day ago':`${days} days ago`}</i>
        </Stack>
 
  </div>
}


export default function Page  ({params}){
  
    const accessToken = useSelector((state)=>state.auth.accessToken)
    const [product,setProduct]= useState(null)
    const [user,setUser] = useState({isLoading:true,users:[]})
    const [currentUser,setCurrentUser]=useState(null)
    const {slug} = params 
    const [productId,storeId] = [...slug]
    const [loading,setLoading] = useState(true)
    useEffect(()=>{
        (async()=>{
            try {
                let result = await  getProductDetailsById({accessToken,storeId,productId})
                if(result.success){
                  setProduct(result.product)
                }
                
            } catch (error) {
                //error
            }finally{
                setLoading(false)
            }
        })()
    },[accessToken,productId,storeId])
    useEffect(()=>{
        if(product!==null){
            (async()=>{
               try{
                let _users = [product.created_by]
                product?.updated.map(({updated_by})=>{
                    _users.push(updated_by) 
                })
                _users = Array.from(new Set(_users))
                const result =await fetchUserById({_id:_users})
                if(result.success){
                   const users = result?.users
                    setUser({...user,users,isLoading:false})
                    setCurrentUser(findUser({users:users,userId:_users[0]}))
                }else{
                    setUser({...user,isLoading:false})
                }
              
               }catch(error){
                setUser({...user,isLoading:false})
               }
            })()
        }

    },[product])


    if(slug.length<2){
        return <h1>Something went wrong</h1>
    }
    if(loading) return <ProductViewLoading/>
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
                        <Image placeholder="blur" blurDataURL={API_URL(url)} loading="lazy" width={1024} height={1024} objectFit="fit" src={API_URL(url)} alt=" " className="w-full z-0 mobile:w-[45vw] h-[40vh] mobile:h-[60vh]"/>
                      </SwiperSlide>
                    })
                }
          </Swiper>
          <div className=' w-[40vw] relative text-left font-semibold' >
          
            <h2 className='text-2xl mt-20 mb-5 font-bold'>{product?.name}</h2>
            <h2 className='mb-2 inline text-sm'>{currency_code}{product?.price?.mrp}</h2>
                {
                    product?.price?.compare_at!==""?<del className="ml-4 text-red-600">{currency_code}{product?.price?.compare_at}</del>:<></>
                }
            <h2 className={product?.isAvailable?'text-green-700 font-bold':'text-red-600 font-semibold'}>{product?.isAvailable?"Available":"Out of Stock"}</h2>
          {
          product?.inventory!=null?!isEmpty(product.inventory.sku)?<h2 className='mb-2 text-xs'>SKU:{product.inventory.sku}</h2>:<></>:<></>}
           {
            user.isLoading &&user.users===null?<Skeleton sx={skeletonSX}  width={70} />:
            <div className="h-[100px] w-fit relative">
                <UserProfile name={currentUser?.username} profileUrl={currentUser?.profile} />
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
            <div className='border rounded-lg border-gray-600 p-4 mr-4 h-auto max-h-[75vh] space-y-2 overflow-auto w-full'>
             <div className="text-xl font-bold">Update history</div>
             <Stack flexDirection={'row'} flexWrap={'wrap'} gap={2}>
                {
                    product?.updated.map((_update,index)=>{
                        if(user.isLoading){
                            return <Skeleton key={index} width={100} height={50} />
                        }
                        return   <UpdateHistoryItem key={index} update={_update} user={user.users} />
                      
                    })
                }
                </Stack>
              <div>
              </div>
            </div>
          </Stack>:<></>
        }
        <div className="h-[12vh]"></div>
      </Stack>

        </div></>
}
