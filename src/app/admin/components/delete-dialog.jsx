"use client"
import {  Button, Dialog, DialogActions, DialogTitle } from "@mui/material";
const ShowDeleteAlert = ({open=false,title='Do you want to delete this?',onClose,onDelete})=>{
    const handleClose = ()=>{
        if(onClose)
        onClose()
    }
    const handleDelete = ()=>{
        if(onDelete)
        onDelete()
    }
    return  <Dialog
    open={open}
    keepMounted
    onClose={handleClose}
    aria-describedby="alert-dialog-for-delete-product">
    <DialogTitle>{title}</DialogTitle>
    <DialogActions>
      <Button color="error" onClick={handleClose}>Cancel</Button>
      <Button color="success"  onClick={handleDelete}>Delete</Button>
    </DialogActions>
  </Dialog>
}
export default ShowDeleteAlert;