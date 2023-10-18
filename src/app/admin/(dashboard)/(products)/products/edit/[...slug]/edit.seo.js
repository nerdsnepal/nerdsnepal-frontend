import ProductSearchEngineListing from "@/app/admin/components/product-search-engine-listing";
import { Button, Card, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { productAPI } from "../../action";

const EditSEO = ({product,handleResponse,accessToken}) => {
    const [updating,setUpdating] = useState(false)
    const [data,setData]= useState({...product.seo})
    useEffect(()=>{
        if(product.seo.title !== data.title || product.seo.description!==data.description){
            setUpdating(true)
        }
    },[data, product.seo.description, product.seo.title])
    const handleUpdate = async()=>{
        let severity = 'info'
        let message = ''
        try {
            const body = {title:data?.title,description:data?.description,storeId:product?.storeId,productId:product?._id}
            const result = await productAPI({body,accessToken,api:'product/seo',method:"PATCH"})
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
    return ( <Card className="p-4 w-[100%]">
     <Typography variant="h6">SEO</Typography>
     <ProductSearchEngineListing value={data} 
      onChangeDescription={(value)=>setData({...data,description:value})}
      onChangeTitle={(value)=>setData({...data,title:value})} />
    <div className="relative h-6">
    <Button size="small" onClick={handleUpdate} disabled={!updating} className="capitalize absolute right-3" variant="outlined">Update</Button>
    </div>
</Card> );
}
 
export default EditSEO;