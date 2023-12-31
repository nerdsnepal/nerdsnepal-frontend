import { API_URL } from "@/app/lib/utils/utils"
import { useState } from "react"
import { productAPI } from "../../action"
const { default: UploadMedia } = require("@/app/lib/components/UploadMedia")
const { Delete } = require("@mui/icons-material")
const { Stack, Box, Card, Typography, Button } = require("@mui/material")
const { default: Image } = require("next/image")

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
            <Image  height={48} width={48} className="h-12 w-12 "  src={API_URL(newURl)}  loading="lazy" alt="" />
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
            const result = await productAPI({body,accessToken,api:'product/media',method:"PATCH"})
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


export default EditProductImage;
