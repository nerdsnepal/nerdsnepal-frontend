import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Box, FormControlLabel, Radio, RadioGroup, Rating, TextField, Typography } from '@mui/material';
import { postRequestSichu } from '@/app/www/actions/action';
import { redirect, useRouter } from 'next/navigation';

const options = [
    'Accidental order',
    'Found product with low price',
    'Other'
  ];
export default function ReviewAndCancellation({handleClick,name,color,onChange,accessToken,productId,storeId,orderId}) {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState(options[0]);

  const radioGroupRef = React.useRef(null);
 const handleOrderCancel=(e)=>{
    if(onChange)
    onChange(name,value)
  }
  const handleClickOpen = (e) => {
    if(name==="Reviewed")return;
    setOpen(true);
    if(handleClick)
    handleClick(e)
  };
 

  const handleClose = () => {
    setOpen(false);
  };
  const handleChange = (event) => {
    setValue(event.target.value);
  };
  const Review = ()=>{
    const [rating, setRating] = React.useState(3);
    const [comment,setComment] = React.useState("")
    const router = useRouter()
    const rate= async()=>{
       try {
        const result = await postRequestSichu({endPoint:"rating",body:{
          "storeId":storeId,
          "productId":productId,
          "value":rating,
          "comment":comment,
          "orderId":orderId
        },
        accessToken:accessToken
        })
        console.log(result);
        if(result.success){
          handleClose()
          router.refresh()
        }
       } catch (error) {
          handleClose()
       }
      
    }
    return <>
     {
        name==='Review'?<>  <DialogTitle id="alert-dialog-title">
        {"Write a Review"}
      </DialogTitle>
      <DialogContent>
        <Box height={10}/>
      <TextField
        onChange={(e)=>{
          setComment(e.target.value)
        }}
        fullWidth
        className='w-full mobile:w-[350px]'
        style={{textAlign: 'left'}}
        placeholder='Review'
        label='Review'
        multiline
        rows={2}
        />
        <Box height={5}/>
        <Typography>Give Ratings</Typography>
        <Rating
        name="rating"
        value={rating}
        onChange={(event, newValue) => {
            setRating(newValue);
        }}
        />
      </DialogContent>
      <DialogActions>
        <Button variant='contained'  className='bg-blue-500 text-white capitalize' onClick={rate}>Post Review</Button>
        <Button variant='text' className='capitalize' onClick={handleClose} autoFocus>Cancel</Button>
      </DialogActions>
    </>:null
      }
    </>
  }

  return (
    <React.Fragment>
    <Button onClick={handleClickOpen} variant="text" name={name} className={`capitalize ${color}`}>{name}</Button>
      <Dialog
        open={open}
        maxWidth="lg"
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <Review/>
      {
        name==='Cancel Order'?<>
        <DialogTitle id="alert-dialog-title">
        {"Do you want to cancel this order?"}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
        Choose one of the following reasons:
        </DialogContentText>
        <RadioGroup
        ref={radioGroupRef}
          aria-label="ringtone"
          name="ringtone"
          value={value}
          onChange={handleChange}
        >
          {options.map((option) => (
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
        <Button variant='contained' className='bg-blue-500 text-white capitalize' onClick={handleOrderCancel}>Yes, cancel</Button>
        <Button onClick={handleClose} className='capitalize' autoFocus>No</Button>
      </DialogActions>
        </>:null
      }
      
      </Dialog>
    </React.Fragment>
  );
}
