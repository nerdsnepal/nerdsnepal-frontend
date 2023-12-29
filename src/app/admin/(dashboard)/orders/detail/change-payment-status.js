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
import { paymentStatusOptions, paymentStatusStyle } from '@/app/lib/utils/utils';

  
export default function ChangePaymentStatus ({orderId,paymentStatus='pending',accessToken,props}){
    const { pstatus } = props.searchParams;
    const isSuperUser = useSelector((state)=>state.auth.isSuperAdmin)
    const [isopen,setOpen] = useState(pstatus==='true'?true:false)
    const [value, setValue] = useState(paymentStatus);
    const radioGroupRef = useRef(null);
    const router = useRouter();
    useEffect(()=>{
        setOpen(pstatus==='true'?true:false)
    },[pstatus])
    const handleChange =async (event) => {
        try {
            const response = await postRequestSichu({accessToken,method:"PATCH",body:{
                    "status":event.target.value,"orderId":orderId},
                endPoint:"order/paymentStatus"
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
          pstatus: status,
        };
        const href = {
          pathname: router.pathname,
          query: updatedQuery,
        };
       
        return href;
    };
  
    return <>
        {
            isSuperUser?<Link href={addStatusQueryParam(true)} variant="body1" className={paymentStatusStyle(value)}>{value}</Link>:
            <Typography  variant="body1" className={paymentStatusStyle(value)}>{value}</Typography>
        }
    <Dialog
    sx={{ '& .MuiDialog-paper': { width: '80%', maxHeight: 435 } }}
    maxWidth="xs"
    TransitionProps={{ onEntering: handleEntering }}
    open={isopen}
  >
    <DialogTitle>Payment Status</DialogTitle>
    <DialogContent dividers>
      <RadioGroup
        ref={radioGroupRef}
        aria-label="paymentStatus"
        name="paymentStatus"
        value={value}
        onChange={handleChange}
      >
        {paymentStatusOptions.map((option) => paymentStatus===paymentStatusOptions[1] && option===paymentStatusOptions[0]||option===paymentStatusOptions[2]?null: (
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