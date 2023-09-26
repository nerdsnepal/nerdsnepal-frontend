'use client'
import { useEffect, useRef, useState } from "react"
import { useSelector } from "react-redux"
import { getProductDetailsById, productAPI } from "../../actions/action"
import { Alert, Box, Button, Card, Skeleton, Snackbar, Stack, TextField, Typography } from "@mui/material"
import { API_URL, isEmpty, skeletonSX } from "@/app/lib/utils/utils"
import { Edit } from "@mui/icons-material"
import Status from "@/app/admin/components/status"
import EditSellingPriceAndCompareAtPrice from "../../components/edit-sellingprice-compare-at"
import Image from "next/image"
import Delete from "@mui/icons-material/Delete"
import UploadMedia from "@/app/lib/components/UploadMedia"
const ShowAndEditName = ({product,handleResponse,accessToken})=>{
   const [name,setName] = useState(product?.name)
   const [updating,setUpdating] = useState(false)
    const [editing,setEditing] = useState(false)
    const EditMode = ()=>{
        const nameRef = useRef()
        const handleDone = ()=>{
            if(isEmpty(nameRef.current.value)){
                setUpdating(false)
                return
            }
            setEditing(false)
            if(nameRef.current.value===name){
                setUpdating(false)
                return 
            }
            setName(nameRef.current.value)
            setUpdating(true) 
        }
        return <Box>
            <TextField label="Product name" className="m-2" inputRef={nameRef} size="small" defaultValue={name} required />
            <Button  className="m-2 capitalize" variant="outlined" onClick={handleDone}>Done</Button>
        </Box>
    }
    const handleUpdate =async()=>{
        let severity = 'info'
        let message = ''
        try {
            const body = {name:name,storeId:product?.storeId,productId:product?._id}
            const result = await productAPI({body,accessToken,api:'name'})
            severity =result.success?'success':'error'
            message=result.message
        } catch (error) {
            severity='error'
            message='Something went wrong'
        }finally{
            if(severity==='info')return
            if(handleResponse)
            handleResponse(severity,message)
        setUpdating(false)
        }
        return
    }
    return <Card className="p-4 w-[100%]">
        <Stack direction={'row'} gap={3} className="items-center">
            <Typography variant="h6">Product Name</Typography>
            <Edit className="cursor-pointer" color="primary" onClick={()=>setEditing(true)}/>
        </Stack>
     {
        editing?<EditMode/>:<Typography  variant="body1">{name}</Typography>
     }
    <div className="relative h-6">
    <Button size="small" onClick={handleUpdate} disabled={!updating} className="capitalize absolute right-3" variant="outlined">Update</Button>
    </div>
    </Card>
}

const EditStatus = ({product,handleResponse,accessToken})=>{
    const {status} = product
    const handleOnChange = async(value)=>{
        if(status===value)return 
        let severity = 'info'
        let message = ''
        try {
            const body = {status:Boolean(value),storeId:product?.storeId,productId:product?._id}
            const result = await productAPI({body,accessToken,api:'status'})
            severity =result.success?'success':'error'
            message=result.message
        } catch (error) {
            severity='error'
            message='Something went wrong'
        }finally{
            if(severity==='info')return
            if(handleResponse)
            handleResponse(severity,message)
        }
        return
        
    }
    return <Status value={status} onChange={handleOnChange} />


}
const EditProductImage = ({product,handleResponse,accessToken})=>{
    const [mediaUrls,setMediaUrls] = useState([...product.mediaUrls])
    const [canUpdating,setUpdating] = useState(false)
    const [deletePath,setDeletedPath] = useState([])
    const MediaViewAndAction = ({url})=>{
        const onDelete = ()=>{
            let newUrls = [...mediaUrls] 
            newUrls = newUrls.filter((_url)=>url!==_url)
            let paths = [...deletePath]
            paths.push(url)
            setDeletedPath(paths)
            setMediaUrls(newUrls)
            setUpdating(true)
        }
        const newURl = url?.replace('assets/','')
        return <Stack className="relative ml-2 p-1" direction={'row'}   justifyContent={'start'} alignItems={'center'}>
            {/*<Typography variant="body1" className="sticky top-1" padding={4} right={7}>Media</Typography>*/}
            <a href={API_URL(newURl)} target="_blank">
            <Image  height={48} width={48} className="h-12 w-12 "  src={API_URL(newURl)} loading="lazy" alt="" />
            </a>
            <Delete onClick={onDelete} className="absolute cursor-pointer hover:text-red-600 right-3" />

        </Stack>
    }
    const handleUploadMedia = ({urls})=>{
        if(urls===undefined)return
        let newUrls = [...mediaUrls]
        for(const url of urls){
           newUrls.push(url)
        }
        setMediaUrls(newUrls)
        setUpdating(true)
    }
    const update= async()=>{
        let severity = 'info'
        let message = ''
        try {
            const body = {mediaUrls:mediaUrls,storeId:product?.storeId,productId:product?._id,deletePath:deletePath}
            const result = await productAPI({body,accessToken,api:'media'})
            severity =result.success?'success':'error'
            message=result.message
        } catch (error) {
            severity='error'
            message='Something went wrong'
        }finally{
            if(severity==='info')return
            if(handleResponse)
            handleResponse(severity,message)
            setUpdating(false)
        }
        return
    }
    return <Box className='h-[500px]'>
        <Card className="p-4 w-[100%] ">
       <Typography variant="h6">Media</Typography>
       <Box className="h-40 overflow-auto">
       {
        mediaUrls?.map((url,index)=>{
            return <MediaViewAndAction key={index} url={url} />
        })
       }
        </Box>
        <UploadMedia state={(state)=>{}} btnName={'Add Media'} clearState={false}   hideUploadedImageView onUploadedMedialUrl={handleUploadMedia} />
      <div className="relative h-8"> 
        <Button disabled={!canUpdating} className="absolute right-2 capitalize" variant="outlined" onClick={update}>Update</Button>
      </div>

       </Card></Box>
}


const EditPage = ({params}) => {
    const accessToken = useSelector((state)=>state.auth.accessToken)
    const [product,setProduct]= useState(null)
    const [productId,storeId] = [...params.slug]
    const [loading,setLoading] = useState(true) 
    const [error,setError] = useState({error:false,message:""})
    const [response,setResponse] = useState({
        hasSnackbar:false,
        severity:"info",
        message:""
    })
    useEffect(()=>{
        (async()=>{
         try {
            setError({error:false,message:""})
            let result = await  getProductDetailsById({accessToken,storeId,productId})
            if(result.success){
              setProduct(result.product)
            }else{
                setError({error:true,message:result.message})
            }
         } catch (error) {
            setError({error:true,message:error.message})
         }finally{
            setLoading(false)
         }
        })()
    },[accessToken,storeId,productId])
    const handleResponse = (severity,message)=>{
        setResponse({hasSnackbar:true,severity,message})
        setTimeout(()=>{
            setResponse({hasSnackbar:false,severity:"info",message:""})
        },2500)
    }
    
    if(params.slug.length<2){
        return <h1>Something went wrong</h1>
    }
    if(error.error){
        return <Typography variant="h5">{error.message}</Typography>
    }
    if(loading)return <h1>Loading...</h1>
    return (  <Box className="relative h-[100%] w-full m-4 overflow-scroll">
        <Snackbar open={response.hasSnackbar} autoHideDuration={3000}>
            <Alert severity={response.severity}>{response.message}</Alert>
        </Snackbar> 
            <Stack direction={{ xs: 'column', md: 'row' }} gap={2} className="">
               <Stack direction={'column'} className="w-full mobile:w-[50%]" gap={2}>
                    <ShowAndEditName accessToken={accessToken} handleResponse={handleResponse} product={product} />
                    <EditSellingPriceAndCompareAtPrice accessToken={accessToken} handleResponse={handleResponse} product={product} />
                  
               </Stack>
               <Stack direction={'column'} className="w-full mobile:w-[50%]" gap={2}>
                <Card className="p-4">
                    <Typography variant="h6 space-y-2">Status</Typography>
                <EditStatus  accessToken={accessToken} handleResponse={handleResponse} product={product} />
            
                </Card>
                <EditProductImage accessToken={accessToken} handleResponse={handleResponse} product={product} />
               </Stack>
            </Stack>
            </Box> );
}
 

export default EditPage;