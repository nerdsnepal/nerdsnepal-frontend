import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import CircularProgress from '@mui/material/CircularProgress';
import searchUser from '../action/searchuser';
import { useDispatch, useSelector } from 'react-redux';
import { addUser, removeUser } from '@/app/state/reducer/userSelectSlice';



export default function InputUserSearch({multiple=false}) {
  const [open, setOpen] = React.useState(false);
  const [options, setOptions] = React.useState([]);
  const loading = open && options.length === 0;
  const dispatch = useDispatch()
  React.useEffect(() => {
    let active = true;

    if (!loading) {
      return undefined;
    }

    (async () => {
      const {users}=  await searchUser({searchValue:"all"})
      if (active) {
        setOptions([...users]);
      }
    })();

    return () => {
      active = false;
    };
  }, [loading]);

  React.useEffect(() => {
    if (!open) {
      setOptions([]);
    }
  }, [open]);
  const handleOnChange = (_,value,reason)=>{
      if(reason==="selectOption"){
        dispatch(addUser(value))
      }
      if(reason==="removeOption"){
        dispatch(removeUser(value))
      }
  }

  return (
        <Autocomplete
      id="search-user"
      multiple={multiple}
      disableClearable
      onChange={handleOnChange}
      className="border w-[70vw] mobile:w-[80%] rounded-sm"
      open={open}
      onOpen={() => {
        setOpen(true);
      }}
      onClose={() => {
        setOpen(false);
      }}
      autoComplete
      isOptionEqualToValue={(option, value) => option.username === value.username}
      getOptionLabel={(option) => option.username}
      options={options}
      loading={loading}
      renderInput={(params) => (
        <TextField
          {...params}
          fullWidth={true}
          label="User"
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
  );
}

