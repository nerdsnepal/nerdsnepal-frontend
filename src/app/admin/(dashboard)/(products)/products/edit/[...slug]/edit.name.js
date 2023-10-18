import { useRef, useState } from "react"

const { Edit } = require("@mui/icons-material")
const { Box, TextField, Button, Card, Stack, Typography } = require("@mui/material")
const { productAPI } = require("../../actions/action")

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
 export default ShowAndEditName