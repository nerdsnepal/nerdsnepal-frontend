'use client'
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { getProductDetailsById } from "../../actions/action"
import { Alert, Box,  Card,  Snackbar, Stack,  Typography } from "@mui/material"
import EditSellingPriceAndCompareAtPrice from "../../components/edit-sellingprice-compare-at"

import EditDescription from "./edit.description"
import EditProductImage from "./edit.image"
import EditStatus from "./edit.status"
import ShowAndEditName from "./edit.name"
import EditSEO from "./edit.seo"


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
    return (  <Box className="relative h-[100vh] w-full p-4 overflow-scroll">
            <Snackbar open={response.hasSnackbar} autoHideDuration={3000}>
            <Alert severity={response.severity}>{response.message}</Alert>
            </Snackbar> 
            <Stack direction={{ xs: 'column', md: 'row' }} gap={2} className="">
               <Stack direction={'column'} className="w-full mobile:w-[50%]" gap={2}>
                    <ShowAndEditName accessToken={accessToken} handleResponse={handleResponse} product={product} />
                    <EditDescription accessToken={accessToken} handleResponse={handleResponse} product={product}/>
                    <EditSellingPriceAndCompareAtPrice accessToken={accessToken} handleResponse={handleResponse} product={product} />
               </Stack>
               <Stack direction={'column'} className="w-full mobile:w-[50%]" gap={2}>
                <Card className="p-4">
                    <Typography variant="h6 space-y-2">Status</Typography>
                <EditStatus  accessToken={accessToken} handleResponse={handleResponse} product={product} />
                </Card>
                <EditSEO product={product} accessToken={accessToken} handleResponse={handleResponse} />
                <EditProductImage accessToken={accessToken} handleResponse={handleResponse} product={product} />
             
               </Stack>
            </Stack>
            <Box height={125}/>
            </Box> );
}
 

export default EditPage;