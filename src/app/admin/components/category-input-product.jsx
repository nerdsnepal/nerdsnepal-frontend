'use client'

import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import CircularProgress from '@mui/material/CircularProgress';
import { fetchCategories, fetchCategoriesWithStatus } from '../(dashboard)/(products)/category/action/actions';
import { useSelector } from 'react-redux';
import { Stack } from '@mui/material';


export default function CategoryForProduct({onSelect,onSelectSubCategory,value}) {
  const [open, setOpen] = React.useState(false);
  const [_open, set_Open] = React.useState(false);
  const [options, setOptions] = React.useState([]);
  const [loading,setLoading] = React.useState(true);
  const [subCategory,setSubCategory] = React.useState([])
  const [selectedSubCategory,setSelectedSubCategory] = React.useState([])
  const accessToken = useSelector((state)=>state.auth.accessToken)
  const storeId = useSelector((state)=>state.auth.storeId)
    
  React.useEffect(() => {
  (async()=>{
   try{
    setOptions([])
    setSubCategory([])
    const {categories} = await fetchCategoriesWithStatus({storeId,accessToken,status:true})
    setOptions(categories)
   }catch(error){
    setOptions([])
    setSubCategory([])
    console.log(error);
   }finally{
    setLoading(false)
   }
  })()
  }, [loading,storeId]);

  return (
    <Stack direction={"column"} gap={1}>
    <Autocomplete
      id="category"
      multiple={false}
      disableClearable
      open={open}
      onOpen={() => {
        setOpen(true);
      }}
      onClose={() => {
        setOpen(false);
      }}
      onChange={(e,value)=>{
        if(onSelect)
        onSelect(value)
        setSelectedSubCategory([])
        setSubCategory(value.subCategory)
      }}
      isOptionEqualToValue={(option, value) => option._id === value._id}
      getOptionLabel={(option) => option.name}
      renderOption={(props,option)=>{
        return (
            <li {...props} key={option._id}>
            {option.name}
            </li>
          )
      }}
      options={options}
      loading={loading}
      renderInput={(params) => (
        <TextField
        size='small'
          {...params}
          fullWidth={true}
          label="Category"
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <React.Fragment>
                {loading ? <CircularProgress color="inherit" size={20} /> : null}
                {params.InputProps.endAdornment}
              </React.Fragment>
            ),
          }}
        />
      )}
    />
    {
        subCategory?.length>0?<h1>Sub Category</h1>:<></>
    }{
       subCategory?.length>0? <Autocomplete
       id="subcategory"
       multiple={true}
       value={selectedSubCategory}
       disableClearable
       open={_open}
       onOpen={() => {
         set_Open(true);
       }}
       onClose={() => {
         set_Open(false);
       }}
       onChange={(e,value)=>{
         if(onSelectSubCategory)
         onSelectSubCategory(value)
        setSelectedSubCategory(value)
       }}
       isOptionEqualToValue={(option, value) => option === value}
       getOptionLabel={(option) => option}
       renderOption={(props,option)=>{
         return (
             <li {...props} key={option}>
             {option}
             </li>
           )
       }}
       options={subCategory}
       renderInput={(params) => (
         <TextField
         size='small'
           {...params}
           fullWidth={true}
           label="Sub Category"
           InputProps={{
             ...params.InputProps,
             endAdornment: (
               <React.Fragment>
                 {loading ? <CircularProgress color="inherit" size={20} /> : null}
                 {params.InputProps.endAdornment}
               </React.Fragment>
             ),
           }}
         />
       )}
     />:<></>
    }
    </Stack>
  );
}


