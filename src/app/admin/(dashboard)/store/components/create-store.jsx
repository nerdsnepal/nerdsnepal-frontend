import { toggler } from "@/app/state/reducer/createStoreSlice";
import { Alert, Backdrop, Button, Dialog, Input, Snackbar, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CloseIcon from '@mui/icons-material/Close';

import InputUserSearch from "@/app/lib/components/UserSearch";
import SelectedUser from "./selectedUser";
import { clearAll } from "@/app/state/reducer/userSelectSlice";
import { _createStore } from "../action/actions";
import { useSession } from "next-auth/react";



const CreateStoreDialog = () => {
    const isOpen = useSelector(state=>state.createStore.isOpen)
    const dispatch = useDispatch()
    const {status,data} = useSession()
    const users = useSelector((state)=>state.userSelect.selectedUsers)
    const [error, setError] = useState("")
    const [storename,setStoreName] = useState("")
    const [isSnackOpen, setOpen] =useState(false)
    const [responseState,setResponseState] = useState({
        isSuccess:false,
        message:""
    })

    const onChange = (e)=>{
        setStoreName(e.target.value)
    }

    useEffect(()=>{
        dispatch(clearAll())
    },[])
    // create store for the user which required userId and store name 
    const createStore =async ()=>{
      //reset the state here 
      setResponseState({isSuccess:false,message:""})
      setOpen(false)
      //End 
        if(storename.trim()===""){
            setError("Store name can't be empty")
            return
        }
        if(users.length===0){
            setError("Please select user")
            return
        }
        if(status==="unauthenticated"||status==="loading")
        return
        //request to create a store 
        const result=await  _createStore({merchantId:users[0]._id,name:storename,accessToken:data.user.accessToken})
        if(result.success){
            setResponseState({
                isSuccess:true,
                message:result.message
            })
            setOpen(true)
        }else{
            setResponseState({
                isSuccess:false,
                message:result.error
            })
            setOpen(true)
            setTimeout(()=>{
                dispatch(toggler())
            },3000)
        }
    }

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
        setOpen(false);
      };
    return (<>
    <Backdrop open={isOpen}>
    <Dialog open={isOpen} maxWidth='lg' className="overflow-hidden duration-150 transition-all ease-in-out">
        <header className="flex flex-row  items-center">
        <h2 className="font-bold m-2 p-2 justify-self-start">Create Store</h2>
        <CloseIcon onClick={()=>dispatch(toggler())} className="font-medium m-2 absolute right-2 justify-self-end capitalize w-8 cursor-pointer h-8 p-2 duration-200 transition-all ease-in hover:font-extrabold hover:bg-red-900 rounded-full hover:text-white" variant="contained" color="error" titleAccess="Close"/>
        </header>
        <form className={`flex flex-col gap-4 justify-center  ${isOpen?'opacity-100':'opacity-0'} items-center m-2 w-[80vw] h-fit mobile:w-[30vw] `}>
        <InputUserSearch key={1} />
        <div className="border w-[70vw] mobile:w-[80%] rounded-sm">
        {
            users.map((user)=><SelectedUser key={user._id} user={user}/>)
        }
        </div>
        <TextField onChange={onChange} variant="outlined" label="Store name" className="border w-[70vw] mobile:w-[80%] rounded-sm" name="store_name" type="text" value={storename} required min={4} maxLength={20} placeholder="Eg:Apple Store" />
        <div className="text-sm mobile:text-xl text-red-600">{error}</div>
        <Button onClick={createStore} className="font-medium capitalize w-[30%]" variant="outlined"  type="button">Create</Button>
        </form>
        <Snackbar  open={isSnackOpen}  onClose={handleClose}   anchorOrigin={{ vertical:"bottom", horizontal:"right" }} autoHideDuration={3000} >
            <Alert severity={responseState.isSuccess?"success":"info"}>{responseState.message}</Alert>
        </Snackbar>
    </Dialog>
    </Backdrop>
    </>);
}
 
export default CreateStoreDialog;