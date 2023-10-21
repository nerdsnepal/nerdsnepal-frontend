import { grey } from "@mui/material/colors"
//export const DOMAIN = 'sichunepal.com'
export const DOMAIN = 'localhost:3000'
export const API_URL =(name)=> `http://localhost:8000/${name}`
export const COOKIE_NAME = 'token'
export const removeQueryPart = (path)=> path.split('?')[0]
export const APPNAME = process.env.NEXT_PUBLIC_APP_NAME||'Sichu'

export const getQueryPart = (path) => path.split('?')[1]
export const emailValidator= (email)=>email.match(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)
export const validateUserName  = (username)=>username.match( /^[a-zA-Z0-9_]{5,29}$/)
export const isEmpty = (value) => value===null||value===""||value===undefined
export const compareDateToC= (date)=>{
    const currentDate = new Date().getTime()
    const compareDate = new Date(date).getTime()
    const res = currentDate>= compareDate
    //console.log(res);
}
export const passwordStrengthChecker = (password)=>{
    const strengthRegex = [/^(?=.*[a-z]).{6,}$/,/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{8,}$/,/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*]).{10,}$/]
    let strength = -1
    for(let index=0;index<strengthRegex.length;index++)
        if(password.match(strengthRegex[index]))++strength
    return strength
}
export const isExpired = ({expires})=>{
    const timestamp =new Date(expires).getTime()
    const currentTimestamp = new Date().getTime()
    if(timestamp<currentTimestamp)return true
    return false;
}
export const getCompareAtPrice = ({compareAt,mrp})=>{
    let compare_at = 0;
    let discountPer = 0;
        try {
            compare_at = Number(compareAt)
            discountPer = (compare_at - Number(mrp))*100/Number(compareAt);
            discountPer = parseInt(discountPer)
        } catch (error) {
            //error
        }
        return {compare_at,discountPer}
}

export const SICHU_API_KEY= {
    'sichu-api-key':process.env.NEXT_PUBLIC_SICHU_API_KEY
}
export const skeletonSX={bgcolor:grey[400]} 
export let currency_code = "NPR."
