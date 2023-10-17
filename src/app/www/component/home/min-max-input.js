import { Stack, TextField, Typography } from "@mui/material";

const MinMaxInput = ({min,max}) => {
    return (<Stack className="relative py-4 w-full" direction={'row'} gap={2} >
    <TextField inputProps={{style: {fontSize: 12}}} className="px-0 w-full"  size="small"  value={`NPR.${min}`} fullWidth disabled />
    <Typography className="capitilized">to</Typography>
    <TextField  inputProps={{style: {fontSize: 12}}}  className="px-0 w-full dark:text-white" size="small" value={`NPR.${max}`} fullWidth disabled/>
    </Stack>);
}
 
export default MinMaxInput;