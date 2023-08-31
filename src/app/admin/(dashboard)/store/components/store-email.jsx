import { useRef, useState } from "react";
import MailIcon from '@mui/icons-material/Mail';
import AddIcon from '@mui/icons-material/Add';
import { Alert, Button, Card, Snackbar, Stack, TextField, Typography } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import { Edit } from "@mui/icons-material";
import { emailValidator } from "@/app/lib/utils/utils";
import { storeAPI } from "../action/actions";

const StoreEmail = ({store,accessToken}) => {
    const [emails,setEmails] = useState(store.emails)
    const [updating,setUpdating] = useState(false)
    const handleAddEmail = ()=>{
        let newEmails = [...emails]
        newEmails.push('dummy@sichu.com')
        const removeDuplicate= new Set(newEmails)
        setEmails(Array.from(removeDuplicate))
    }
    const [response,setResponse] = useState({
        hasAlert:false,
        servity:"info",
        message:""
    })
    const handleUpdate = async()=>{
        try {
            setUpdating(false)
            const body = {storeId:store._id,emails}
            const result = await storeAPI({body,accessToken,api:'emails'})
            setResponse({hasAlert:true,servity:result.success?"success":"error",message:result.message})     
        } catch (error) {
            setResponse({hasAlert:true,servity:"error",message:"Something went wrong"})

        }finally{
            setTimeout(()=>{
                setResponse({hasAlert:false,servity:"info",message:""})
            },3000)
        }
    }

    const ShowEmail = ({email,index})=>{
        const [editing,setEditing] = useState(false)
        const emailRef = useRef(10)
        const handleDelete = ()=>{
            const newEmails = emails.filter((_email)=>_email!==email)
            setEmails(newEmails)
            setUpdating(true)
        }
        const onDone = ()=>{
            const currentEmail = emailRef.current.value 
            if(emailValidator(currentEmail)){
                //update email 
                let newEmails = [...emails] 
                newEmails[index] = currentEmail 
                setEmails(newEmails)
                setEditing(false)
                setUpdating(true)
            }
        }
        const EditMode = ()=>{
            return <Stack  className="w-[85%]" direction={"row"} gap={2}>
                <TextField  inputRef={emailRef} defaultValue={email}  id="edit-email-input-field" className="w-[70%]" type="email" placeholder="dummy@sichu.com" required/>
                <Button onClick={onDone} size="small" className="w-fit" type="button" color="success" variant="outlined">Done</Button>
            </Stack>
        }
        return <Stack  className="ml-3 items-center" direction={"row"} gap={1}>
            <MailIcon/>
           {
            editing?<EditMode/>: <Typography  color={'blue'}  className='cursor-pointer select-none w-[80%]' variant="h6" itemType="email" component="address">{email}</Typography>
           }
            <Stack direction={'row'} gap={1}>
               {editing?null:<Edit onClick={()=>setEditing(true)} color="success" className="cursor-pointer"/>}
                <DeleteIcon onClick={()=>handleDelete()} color="error" className="cursor-pointer" />
            </Stack>
        </Stack>
    }
    const NoEmail = ()=>{
        return <Stack>
        <Typography variant="h6" fontWeight={'semi-bold'} component="i">No any email address</Typography>
        </Stack>
    }
    return ( <Card className="p-4 space-y-2 h-fit max-h-[40vh] overflow-auto">
            <Snackbar autoHideDuration={300} open={response.hasAlert}>
                <Alert severity={response.servity}>{response.message}</Alert>
            </Snackbar>
        <Typography variant="h6" fontWeight={'bold'} >Email</Typography>
        <div onClick={handleAddEmail} className="cursor-pointer space-x-2 w-fit flex items-center"><AddIcon/><i>Add email address</i></div>
        <Stack direction={'column'} gap={1}>
            {
                emails?.length===0?<NoEmail/>:null
            }
            {
                emails?.map((email,index)=>{
                        return <ShowEmail email={email} index={index} key={index} />
                })
            }
        </Stack>
        <Button onClick={handleUpdate} disabled={!updating} type="button" variant="outlined">
            Update
        </Button>
    </Card>);
}
 
export default StoreEmail;