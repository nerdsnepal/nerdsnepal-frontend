'use client'
import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import CircularProgress from '@mui/material/CircularProgress';
import { useSelector } from 'react-redux';
import { Stack } from '@mui/material';
import { fetchSichu } from '@/app/www/actions/action';


export default function SeriesForProduct({onSelect,value}) {
  const [open, setOpen] = React.useState(false);
  const [series, setSeries] = React.useState([]);
  const [loading,setLoading] = React.useState(true);
  const accessToken = useSelector((state)=>state.auth.accessToken)
  const storeId = useSelector((state)=>state.auth.storeId)
    
  React.useEffect(() => {
  (async()=>{
   try{
    setSeries([])
    const {data} = await fetchSichu({accessToken,endPoint:`admin/series?storeId=${storeId}`,revalidate:10})
    setSeries(data)
   }catch(error){
    setSeries([])
   }finally{
    setLoading(false)
   }
  })()
  }, [loading,storeId,accessToken]);

  React.useEffect(()=>{
    if(value){
        setSeries([])
    }
  },[value])
  return (
    <Stack direction={"column"} gap={1}>
    <Autocomplete
      id="series"
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
      options={series}
      loading={loading}
      renderInput={(params) => (
        <TextField
        size='small'
          {...params}
          fullWidth={true}
          label="Series"
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
   
    </Stack>
  );
}


