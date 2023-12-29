import { Alert, AppBar, Box, Button, Card, Dialog, IconButton, Slide, Snackbar, Stack, TextField, Toolbar, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import DeleteIcon from '@mui/icons-material/Delete';
import PlaceIcon from '@mui/icons-material/Place';
import EditLocationAltIcon from '@mui/icons-material/EditLocationAlt';
import { storeAPI } from "../action/actions";
import { CloseOutlined } from "@mui/icons-material";
import AddLocationAltIcon from '@mui/icons-material/AddLocationAlt';
import { isEmpty } from "@/app/lib/utils/utils";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });
const AddOrEditStockLocation = ({location,index,state,onSubmit,mode='Edit',handleClose})=>{
    const [_location,setLocation]=useState(location||{
        country:'',
        city:'',
        state:'',
        postalCode:'',
        addressLine1:'',
        addressLine2:''
    })
    const [error,setError]= useState({
        hasError:false,
        error:""
    })
   
    const handleOnChanage = (field,value)=>{
        setLocation({..._location,[field]:value})
    }
    const handleOnSubmit = ()=>{
        //validate here 
        if(isEmpty(_location.country) || isEmpty(_location.state) || isEmpty(_location.city)){
            setError({
                hasError:true,
                error:"Country, state and city are required fields."
            })
            return;
        }else{
            setError({hasError:false,error:""})
        }

        if(onSubmit)
            onSubmit(_location,index)
        setLocation({
            country:'',
            city:'',
            state:'',
            postalCode:'',
            addressLine1:'',
            addressLine2:''
        })
    }
    return  <Dialog
    fullScreen
    open={state}
    TransitionComponent={Transition}>
    <AppBar color="transparent" sx={{ position: 'relative' }}>
      <Toolbar>
        <IconButton
          edge="start"
          color="inherit"
          onClick={handleClose}
          aria-label="close"
        >
          <CloseOutlined />
        </IconButton>
        <Typography sx={{ ml: 2, flex: 1 }} variant="h5" component="div">
          {mode}
        </Typography>
        <Button  variant="outlined" autoFocus color="inherit" onClick={handleOnSubmit}>
          {mode==='Edit'?'Update':'Add'}
        </Button>
      </Toolbar>
    </AppBar>
     <Stack className="w-full mobile:w-[60vw]" direction={"column"} margin={4}  gap={2}>
            <TextField onChange={(e)=>handleOnChanage('country',e.target.value)} label="Country" size="small" value={_location.country} required />
            <TextField onChange={(e)=>handleOnChanage('state',e.target.value)} label="State" size="small" value={_location.state} required />
            <TextField onChange={(e)=>handleOnChanage('city',e.target.value)} label="City" size="small" value={_location.city} required />
            <TextField onChange={(e)=>handleOnChanage('postalCode',e.target.value)} label="Postal Code" size="small" value={_location.postalCode||""} />
            <TextField onChange={(e)=>handleOnChanage('addressLine1',e.target.value)} label="Address line 1" size="small" value={_location.addressLine1||""} />
            <TextField onChange={(e)=>handleOnChanage('addressLine2',e.target.value)} label="Address line 2" size="small" value={_location.addressLine2||""} />
     </Stack>
     {error.hasError?<Alert className="w-fit" severity="error" >
        {error.error}
     </Alert>:null}
  </Dialog>

}

const StockLocation = ({store,accessToken}) => {
    const [updating,setUpdating] = useState(false) 
    const [_locations,setLocations] = useState(store.stockLocation)
    const [open,setOpen] = useState(false)
    const [response,setResponse] = useState({
        hasAlert:false,
        servity:"info",
        message:""
    })
    const handleDelete = (location)=>{
        let newLocations=_locations.filter((_location)=>_location!=location)
        setLocations(newLocations)
        setUpdating(true)
    }
    const handleUpdate = async()=>{
            try {
                setUpdating(false)
                const body = {storeId:store._id,stockLocation:_locations}
                const result = await storeAPI({body:body,accessToken,api:'stocklocation'})
                setResponse({hasAlert:true,servity:result.success?"success":"error",message:result.message})
                
            } catch (error) {
                setResponse({hasAlert:true,servity:"error",message:"Something went wrong"})
            }finally{
                setTimeout(()=>{
                    setResponse({hasAlert:false,servity:"info",message:""})
                },3000)
            }
    }

    const ShowLocation = ({location,index})=>{
        const [isDialogOpen,setDialogOpen] = useState(false)
         const handleEdit = ()=>{
            setDialogOpen(true)
         }   
         const handleSubmit = (_location,index)=>{
                let newLocations = [..._locations]
                newLocations[index] =_location 
                setLocations(newLocations)
                setUpdating(true)
                setDialogOpen(false)
         }
         const handleClose =()=>{
            setDialogOpen(false)
         }
        return <Stack direction={'row'} gap={3}>
            <AddOrEditStockLocation index={index}  state={isDialogOpen} location={location} onSubmit={handleSubmit} handleClose={handleClose} />
            <PlaceIcon color="info" /> 
            <div className="w-[90%]">
                <b>{location.country}</b><span>, </span>
                <b><i>{location.state}</i></b><span>, </span>
                <span>{location.city}</span>
            </div>
            <Stack direction={'row'} gap={1}>
                <EditLocationAltIcon onClick={handleEdit} color="success" className="cursor-pointer"/>
                <DeleteIcon onClick={()=>handleDelete(location)} color="error" className="cursor-pointer" />
            </Stack>
        </Stack>
    }
    const handleClose = ()=>{
        setOpen(false)
    }
    const handleSubmit=(location)=>{
      try {
        let newLocations = [..._locations] 
        newLocations.push(location)
        const removeDuplicate = new Set(newLocations)
        setLocations(Array.from(removeDuplicate))
        handleClose()
        setUpdating(true)
      } catch (error) {
            //handle error
      }
    }

    return ( <Box className="h-fit border max-h-[50vh] relative overflow-auto p-2 w-[96%]">
            <Snackbar autoHideDuration={300} open={response.hasAlert}>
                <Alert severity={response.servity}>{response.message}</Alert>
            </Snackbar>

        <Stack direction={'column'} padding={3}  gap={2}>
        <Typography variant="h6" fontWeight={'bold'} >Stock Location</Typography>
            <div className="cursor-pointer w-fit">  <AddLocationAltIcon  onClick={()=>setOpen(true)} />
            <b onClick={()=>setOpen(true)}>Add stock location</b>
            </div>
            <AddOrEditStockLocation mode="Add"  state={open} location={null} onSubmit={handleSubmit} handleClose={handleClose} />
        {
            _locations.map((location,index)=>{
                return <ShowLocation index={index} location={location} key={index}/>
            })
        }
    </Stack>
    <Button color="primary"  onClick={handleUpdate}  variant="outlined" className="m-4" type="button" disabled={!updating}>Update</Button>
    </Box>);
}
 
export default StockLocation;


