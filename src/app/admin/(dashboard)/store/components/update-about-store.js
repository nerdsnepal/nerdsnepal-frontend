import TextEditor from "@/app/admin/components/text-editor";
import { postRequestSichu } from "@/app/www/actions/action";
import { Button, Stack, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useState } from "react";

const   UpdateAboutStore = ({accessToken,store})=>{
    const [about,setAbout] = useState(store.about)
    const [updating,setUpdating] = useState(false)
    const handleChange = (value)=>{
        setAbout(value)
        setUpdating(true)
    }
    const handleUpdate =async ()=>{
       try {
        const response = await  postRequestSichu({accessToken,
            body:{
                "storeId":store._id,
                "about":about,
            },
            endPoint:"store/about",
            method:"PATCH"
        })
        if(response.success){
            setUpdating(false)
        }
       } catch (error) {
            alert(error.error)
       }
       
    }
    return <Box className="p-4 border  space-y-2 h-fit  overflow-auto">
      <h1 className="font-bold p-2">About Store</h1>
        <TextEditor  onChange={handleChange} content={store.about} />
       <Stack position={'relative'}direction={'row'}  justifyContent={'space-between'}>
        <Box width={10}></Box>
        <Button onClick={handleUpdate} disabled={!updating} type="button" variant="outlined">
            Update
        </Button>
       </Stack>
    </Box>
}
export default  UpdateAboutStore;