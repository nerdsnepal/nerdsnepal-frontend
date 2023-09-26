import { Visibility, VisibilityOff } from "@mui/icons-material";
import {    IconButton, InputAdornment,TextField } from "@mui/material";
import { useState } from "react";
export const PasswordField = ({label,placeholder,name,onChange,value,id='pswd'})=>{

    const [showPassword, setShowPassword] = useState(false);
    const handleClickShowPassword = () => setShowPassword(!showPassword);
    const handleMouseDownPassword = () => setShowPassword(!showPassword);
    return <TextField onChange={onChange} type={showPassword ? "text" : "password"} 
        name={name}
        id={id}
        variant="outlined"
        value={value}
        InputProps={{ 
        endAdornment: (
        <InputAdornment position="end">
         <IconButton
        aria-label="toggle password visibility"
        onClick={handleClickShowPassword}
        onMouseDown={handleMouseDownPassword}>
        {showPassword ? <Visibility /> : <VisibilityOff />}
        </IconButton>
    </InputAdornment>
    )}} autoComplete="on" fullWidth label={label} placeholder={placeholder} required />

}