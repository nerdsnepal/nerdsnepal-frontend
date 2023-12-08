import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Image from 'next/image';

export default function CountrySelect({countryName="Nepal",onChange}) {
    const handleCountryChange = (event, newValue) => {
     onChange(newValue);
    };
  return (
    <Autocomplete
      id="country-select"
      sx={{ width: 300 }}
      options={countries}
      defaultValue={countries.filter(({label})=>label===countryName)[0]}
      onChange={handleCountryChange} 
      autoHighlight
      getOptionLabel={(option) => option.label}
      renderOption={(props, option) => (
        <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
          <Image
            loading="lazy"
            width={20}
            height={20}
            srcSet={`https://flagcdn.com/w40/${option.code.toLowerCase()}.png 2x`}
            src={`https://flagcdn.com/w20/${option.code.toLowerCase()}.png`}
            alt=""
          />
          {option.label} ({option.code}) +{option.phone}
        </Box>
      )}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Choose a country"
          inputProps={{
            ...params.inputProps,
          }}
        />
      )}
    />
  );
}

// From https://bitbucket.org/atlassian/atlaskit-mk-2/raw/4ad0e56649c3e6c973e226b7efaeb28cb240ccb0/packages/core/select/src/data/countries.js
const countries = [

  { code: 'NP', label: 'Nepal', phone: '977' },

];

//state_with_districts.json
export  function SelectState({data,state="Bagmati",onChange}) {
    let states = [];
    for (let value in data){
        states.push(value);
    } 
    const handleStateChange = (event, newValue) => {
     onChange(newValue);
    };
  return (
    <Autocomplete
      id="country-state"
      sx={{ width: 300 }}
      options={states}
      defaultValue={state}
      onChange={handleStateChange} 
      autoHighlight
      getOptionLabel={(option) => option}
      renderOption={(props, option) => (
        <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
          {option}
        </Box>
      )}
      renderInput={(params) => (
        <TextField
          {...params}
          label="State"
          inputProps={{
            ...params.inputProps,
          }}
        />
      )}
    />
  );
}
//state_with_districts.json
export  function SelectCity({data,city="Kathmandu",onChange,state="Bagmati"}) {
    let cities = [];
    if(!data){
        return;
    }
    for(const value in data[state]){
        //console.log();
        cities.push(value)
    }
    
    const handleCountryChange = (event, newValue) => {
        onChange(newValue);
      };
  return (
    <Autocomplete
      id="country-state"
    fullWidth
      options={cities}
      defaultValue={city}
      onChange={handleCountryChange} 
      autoHighlight
      getOptionLabel={(option) => option}
      renderOption={(props, option) => (
        <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
          {option}
        </Box>
      )}
      renderInput={(params) => (
        <TextField
          {...params}
          label="City"
          inputProps={{
            ...params.inputProps,
          }}
        />
      )}
    />
  );
}



export  function CountryCodeSelect({countryCode="977",onChange}) {
    const handleCountryChange = (event, newValue) => {
     onChange(newValue);
    };
  return (
    <Autocomplete
    key={"country-code"}
      id="country-code"
      sx={{ width: 100 }}
      options={countries}
      defaultValue={countries.filter(({phone})=>phone===countryCode)[0]}
      onChange={handleCountryChange} 
      autoHighlight
      getOptionLabel={(option) => option.phone}
      renderOption={(props, option) => (
        <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
          {option.label} +{option.phone}
        </Box>
      )}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Country Code"
          inputProps={{
            ...params.inputProps,
          }}
        />
      )}
    />
  );
}

export const CountryCode = (name)=>{
   return  countries.filter(({label})=>label===name)[0].phone;
}