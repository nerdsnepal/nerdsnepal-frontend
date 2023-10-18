import TextEditor from "@/app/admin/components/text-editor";
import { Button, Card, Stack, Typography } from "@mui/material";
import { useState } from "react";
import { productAPI } from "../../action";


const EditDescription = ({product,handleResponse,accessToken}) => {
    const [description,setDescription] = useState(product?.description)
    const [updating,setUpdating] = useState(false)
     const handleUpdate =async()=>{
         let severity = 'info'
         let message = ''
         try {
             const body = {description:description,storeId:product?.storeId,productId:product?._id}
             const result = await productAPI({body,accessToken,api:'product/description',method:"PATCH"})
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

    const handleChange = (value)=>{
        if(value===product.description){
            setUpdating(false)
            return
        }
        setUpdating(true)
        setDescription(value)
    }

    return (
    <Card className="p-4 w-[100%]">
        <Typography variant="h6">Description</Typography>
        <TextEditor content={description} onChange={handleChange} />
        <div className="relative h-6 mt-2">
     <Button size="small" onClick={handleUpdate} disabled={!updating} className="capitalize absolute right-3" variant="outlined">Update</Button>
     </div>
     </Card>
    );
}
 
export default EditDescription;