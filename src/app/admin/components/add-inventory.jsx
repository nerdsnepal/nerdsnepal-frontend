import { Alert, Autocomplete, Checkbox, Stack, TextField } from "@mui/material";
import { DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import React, { useEffect, useState } from "react";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import { useSelector } from "react-redux";
import { Try } from "@mui/icons-material";


const ChooseLocation = ({stockLocation,onChange,defaultValue=[]})=>{
    const [open, setOpen] = useState(false);
    return <Autocomplete
    id="choose-location"
    value={defaultValue}
    multiple={true}
    disableClearable
    open={open}
    onOpen={() => {
      setOpen(true);
    }}
    onClose={() => {
      setOpen(false);
    }}
    onChange={(e,value)=>{
        if(onChange) onChange(value)
    }}
    isOptionEqualToValue={(option, value) => `${option.state}/${option.city}` === `${value.state}/${value.city}`}
    getOptionLabel={(option) => `${option.state}/${option.city}`}
    renderOption={(props,option)=>{
      return (
          <li {...props} key={`${option.country}/${option.state}/${option.city}`}>
       { `${option.state}/${option.city}`}
          </li>
        )
    }}
    options={stockLocation}
    renderInput={(params) => (
      <TextField
      size='small'
        {...params}
        fullWidth={true}
        label="Location"
        InputProps={{
          ...params.InputProps,
          endAdornment: (
            <React.Fragment>
              {params.InputProps.endAdornment}
            </React.Fragment>
          ),
        }}
      />
    )}
  />


}

const AddInventoryForProduct = ({onChangeInventory,value}) => {
    //const [isExpire,setIsExpire] = useState(false)
    const stockLocation = useSelector((state)=>state.auth?.selectedStore?.stockLocation)
    const [inventory,setInventory] = useState({
            locations:[],
            quantities:[],
            sku:'',
            isExpire:false,
            expireDate:''
    })
    useEffect(()=>{
      try {
        if(value===null){
            setInventory({
                locations:[],
                quantities:[],
                sku:'',
                isExpire:false,
                expireDate:''
        })
        }
        if(value!==null){
            let initInventory = {
                sku:value.sku,
                isExpire:value.isExpire,
                expireDate:value.expireDate,
                quantities:value.quantities
            }
          setInventory({...inventory,initInventory})
        
        }
      } catch (error) {
        //handle error
      }

    },[value])


    const handleQuantity = (e,location,index)=>{
        const newInventory = {...inventory} 
        newInventory.quantities[index] = {location,quantity:e.target.value}
        setInventory(newInventory)
        onChangeInventory(inventory)
    }

    return (<>
        <Stack direction={"column"} gap={1}>
            
        <h2 className="font-bold">Quantity</h2>
        <div className="ml-5 space-y-2">
        <h3 >Location</h3>
        <Alert severity="info">The storage location or warehouse where the product is stored.</Alert>
        {
            stockLocation?.length>0?<ChooseLocation defaultValue={inventory.locations} onChange={(value)=>{
                setInventory({...inventory,locations:value})
                onChangeInventory(inventory)}
            } stockLocation={stockLocation} />:<>No stock location </>
        }
        {
           inventory && inventory?.locations?.map(({state,city,district},index)=>{
                const location = `${state}/${city}`
                return <Stack key={index} direction={"row"} gap={1}>
                   <div className="flex justify-center items-center"> <h2>{location}</h2></div>
                    <TextField onChange={(e)=>handleQuantity(e,location,index)} name="quantity" inputProps={{min:0}} inputMode="numeric"  type="number" label="Quantity" placeholder="Quantity"  />
                </Stack>
            })
        }
        
        </div>
        
        <h2>SKU (Stock Keeping Unit)</h2>
        <Alert severity="info">A unique identifier for the product in your inventory.</Alert>
        <TextField value={inventory.sku} onChange={(e)=>{setInventory(
            {...inventory,sku:e.target.value})
                 onChangeInventory(inventory)
                }} name="sku" type="text" label="SKU" placeholder="SKU"  />
        
        <h2>Expiry Date</h2>
        <Alert severity="info">For perishable or time-sensitive products, you can track the expiry date.</Alert>
        <Stack direction={"row"} gap={1} alignItems={"center"}>
        <Checkbox value={inventory.isExpire}  onChange={(e)=>{
            setInventory({...inventory,isExpire:!inventory.isExpire})
            onChangeInventory(inventory)
             }} /><label>{inventory.isExpire?'Expirable':'Not Expirable'}</label> </Stack>
        {inventory.isExpire?  <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateTimePicker onChange={(value)=>{
                setInventory({...inventory,expireDate:value})
                onChangeInventory(inventory)    
        }}  format="YYYY-MM-DD" defaultValue={dayjs(new Date())} shouldDisableDate={(date)=>{
            return date<new Date()
        }} />
        </LocalizationProvider> :<></>}
        </Stack>
    
    </>);
}
 
export default AddInventoryForProduct;