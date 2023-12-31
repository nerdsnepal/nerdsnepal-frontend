'use client'
import { currency_code, isEmpty } from "@/app/lib/utils/utils";
import { Edit } from "@mui/icons-material";
import { Alert, Button, Card, Stack, TextField, Typography } from "@mui/material/index";
import { useRef, useState } from "react";
import { productAPI } from "../actions/action";

const EditSellingPriceAndCompareAtPrice = ({product,handleResponse,accessToken}) => {
    const [price,setPrice] = useState(product.price)
    const [editing,setEditing] = useState(false)
    const [updating,setUpdating] = useState(false)
    const EditMode = ()=>{
        const priceRef= useRef()
        const compareAtPriceRef = useRef()
        const handleDone = ()=>{
            const _price = priceRef.current.value 
            const compare_at = compareAtPriceRef.current.value
            if(_price===price.mrp && compare_at===price.compare_at){
                setUpdating(false)
                setEditing(false)
                return
            }
            if(isEmpty(_price))return 

            if(isEmpty(compare_at)){
                setPrice({
                    mrp:_price,
                    compare_at:compare_at
                })
                if(_price!==price.mrp){
                    setUpdating(true)
                }
                setEditing(false)
                return 
            }
            if(Number(compare_at)<Number(_price)){
                setUpdating(false)
                return 
            }
            setPrice({
                mrp:_price,
                compare_at:compare_at
            })
            setUpdating(true)
            setEditing(false)
        }
        return <Stack direction={'column'} className='w-[75%]' gap={3}>
            <TextField  inputProps={{min:0}} type="number" inputMode="number" inputRef={priceRef} required label='Selling Price' defaultValue={price.mrp} />
            <Alert severity="info">Set compare at price always higher than selling price.</Alert>
            <TextField   inputProps={{min:0}} type="number" inputMode="number"inputRef={compareAtPriceRef} label='Compare at price' defaultValue={price.compare_at} />
            <Button variant="outlined" size="small" className='w-[25%] capitalize' onClick={handleDone}>Done</Button>
        </Stack>
    }
    const handleUpdate = async()=>{
        let severity= 'info'
        let message = ''
        try {
            setUpdating(false)
            const body = {price,productId:product._id,storeId:product.storeId}
            const result = await productAPI({body,accessToken,api:'price'})
            severity = result.success?'success':'error'
            message=result.message
        } catch (error) {
            severity = 'error'
            message=error.message
        }finally{
            if(handleResponse)
            handleResponse(severity,message)
        }
    }
    return (<Card className="p-2 space-y-2">
      <Stack direction={'row'} gap={2} className="items-center"><Typography variant="h6">Price</Typography> 
      <Edit className='cursor-pointer' color="primary" onClick={()=>setEditing(true)} /> 
      </Stack>
      {
        editing?<EditMode/>:<Stack>
            <Typography><b>Selling Price:</b>{currency_code}{price.mrp}</Typography>
            {isEmpty(price.compare_at)?null:<Typography><b>Compare at price:</b>{currency_code}{price.compare_at}</Typography>}    
        </Stack>
      }
    <div className="relative h-8">
        <Button onClick={handleUpdate} disabled={!updating} size='small' className='capitalize absolute right-4' variant="outlined" >Update</Button>
    </div>

    </Card>);
}
 
export default EditSellingPriceAndCompareAtPrice;