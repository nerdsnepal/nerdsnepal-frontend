"use client"
import { Icon, Stack, Typography } from "@mui/material";
import MinMaxInput from "./min-max-input";
import RangeSlider from "./range-slider";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPrice } from "@/app/state/reducer/filter";


const PriceFilter = ({data}) => {
    const _price = useSelector((state)=>state.proFilter?.price)
    const [defaultValue,setDefaultValue] = useState([0,100])
    const dispatch = useDispatch()
    const [expand,setExpand] = useState(true)
    const onChangeCommited= (_,value)=>{
        const [min,max]=value 
        const sub = Number(data?.price?.max)-Number(data?.price?.min)
        const price= {
            minimum:parseInt((min/100)*sub)+parseInt(data?.price?.min),
            maximum:parseInt((max/100)*sub)+parseInt(data?.price?.min)
        }
        dispatch(setPrice(price))
    }
   useEffect(()=>{
    const total = Number(data?.price?.max)-Number(data?.price?.min)
    setDefaultValue([Math.abs(((_price?.minimum-data?.price?.min)*100)/total),Math.abs(((_price?.maximum-data?.price?.min)*100)/total)])
   },[_price])
    return (<>
    <Stack direction={'row'} justifyContent={'space-between'}>
    <Typography variant="body1" className="font-bold" >Price</Typography>
    <Icon className="cursor-pointer" onClick={()=>setExpand((prev)=>!prev)}>{ !expand?<ExpandMore/>:<ExpandLess/>}</Icon>
    </Stack>
        {
            expand?<>
            <RangeSlider defaultValue={defaultValue}  min={data?.price?.min} max={data?.price?.max}  onChangeCommited={onChangeCommited}/>
            <MinMaxInput min={_price?.minimum} max={_price?.maximum} />
            </>
            :null
        }

    </>);
}
 
export default PriceFilter;