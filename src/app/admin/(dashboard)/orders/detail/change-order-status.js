'use client';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Dialog from '@mui/material/Dialog';
import RadioGroup from '@mui/material/RadioGroup';
import Radio from '@mui/material/Radio';
import FormControlLabel from '@mui/material/FormControlLabel';
import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { postRequestSichu } from '@/app/www/actions/action';
import { useSelector } from 'react-redux';
import { Typography } from '@mui/material';
import { orderStatusOptions, orderStatusStyle } from '@/app/lib/utils/utils';
 
export default function ChangeOrderStatus ({orderId,orderStatus='pending',accessToken,props}){
    const { status } = props.searchParams;
    const isSuperUser = useSelector((state)=>state.auth.isSuperAdmin)
    const [isopen,setOpen] = useState(status==='true'?true:false)
    const [value, setValue] = useState(orderStatus);
    const radioGroupRef = useRef(null);
    const router = useRouter();
    useEffect(()=>{
        setOpen(status==='true'?true:false)
    },[status])
    const handleChange =async (event) => {
        try {
            const response = await postRequestSichu({accessToken,method:"PATCH",body:{
                    "status":event.target.value,"orderId":orderId},
                endPoint:"order/status"
            })
            if(response.success){
                setValue(event.target.value);
            }else{
                alert(response.error)
            }
        } catch (error) {
            alert(error.message)
        }
    };
    const handleEntering = () => {
      if (radioGroupRef.current != null) {
        radioGroupRef.current.focus();
      }
    };
    const addStatusQueryParam = (status) => {
     
        const updatedQuery = {
          ...props.searchParams,
          status: status,
        };
        const href = {
          pathname: router.pathname,
          query: updatedQuery,
        };
       
        return href;
    };
 
    return <>
        {
            isSuperUser?<Link href={addStatusQueryParam(true)} variant="body1" className={orderStatusStyle(value)}>{value}</Link>:
            <Typography  variant="body1" className={orderStatusStyle(value)}>{value}</Typography>
        }
    <Dialog
    sx={{ '& .MuiDialog-paper': { width: '80%', maxHeight: 435 } }}
    maxWidth="xs"
    TransitionProps={{ onEntering: handleEntering }}
    open={isopen}
  >
    <DialogTitle>Order Status</DialogTitle>
    <DialogContent dividers>
      <RadioGroup
        ref={radioGroupRef}
        aria-label="orderStatus"
        name="order status"
        value={value}
        onChange={handleChange}
      >
        {orderStatusOptions.map((option) => (
          <FormControlLabel
            value={option}
            key={option}
            control={<Radio />}
            label={option}
          />
        ))}
      </RadioGroup>
    </DialogContent>
    <DialogActions>
      <Link href={addStatusQueryParam(false)}>
        Cancel
      </Link>
    </DialogActions>
  </Dialog>
    </> 
}