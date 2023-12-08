import {  DoneRounded } from "@mui/icons-material";
import {  Box, Stack, Typography } from "@mui/material";

const LabelAddress = ({label="Home",onChange}) => {
    const labels = ["Home","Office"];
        const handleClick=(value)=>{
            if(onChange)
            onChange(value)
        }

    const LabelBox = ({value}) => {
        return (
            <div className="w-[96px] h-[54px] select-none cursor-pointer" onClick={()=>handleClick(value)}>
                <div className="w-[98px] h-[54px] top-0 left-0">
                    <div className={`relative w-[96px] h-[54px] bg-gray-100 rounded-[4px] border border-solid ${label===value?'border-green-400':'border-grey-50'} `}>
                        <div className="absolute top-[18px] left-[29px]  tracking-[0] leading-[16px] whitespace-nowrap">
                            {value}
                        </div>
                       {
                        label===value?<div className="relative p-1">
                        <DoneRounded style={{ fontSize: '12px' }}  className=" bg-green-500 text-white rounded-lg absolute right-[10px]" />
                        </div>:<></>
                       }
                    </div>
                </div>
            </div>
        );
    };
    
    return (<>
    <Typography>Select label for your address</Typography>
    <Stack direction={'row'} className="relative" gap={2}>
        {
            labels.map((_label,index)=>{
                return <LabelBox key={index} value={_label}/>
            })
        }
    </Stack>
    </>);
}
export const LabelBox = ({value})=>{
    return <Box className="bg-[#99F6E4] w-fit p-2 pl-4 pr-4 rounded-md">
        <Typography color={'#0D6376'}>{value}</Typography>
    </Box>
   }
 
export default LabelAddress;