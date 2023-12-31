import { grey } from "@mui/material/colors"
export const DOMAIN = 'localhost'
// export const DOMAIN = 'localhost:3001'
export const API_URL =(name)=> `https://api.sichunepal.com/${name}`
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
    const strengthRegex = [
        /^(?=.*[a-z]).{4,}$/,  
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/, 
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}$/ 
    ];
    let strength = 0
    for(let index=0;index<strengthRegex.length;index++)
        if(password.match(strengthRegex[index]))++strength
    console.log(strength);
    return strength
}
export const isExpired = ({expires})=>{
    const timestamp =new Date(expires).getTime()
    const currentTimestamp = new Date().getTime()
    if(timestamp<currentTimestamp)return true
    return false;
}

export function isDateTimeExpired(timestamp, expirationDuration) {
    const createdDate = new Date(timestamp);
    const currentTime = new Date();
  
    const differenceInMilliseconds = currentTime - createdDate;
  
    return differenceInMilliseconds > expirationDuration;
  }
  
 export const getDefaultAddress = ({address})=>{
    const defaultAddress = address.filter((_address)=>_address.default===true);
    return defaultAddress;
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
 export const processCart = (items)=>{
    let totalQuantity=0;
    let totalPrice= 0;
    try {
        items.map(({quantity,price})=>{
            totalQuantity += Number(quantity)
         totalPrice += Number(quantity)*Number(price.mrp)

        });
        return {totalPrice,totalQuantity}
    } catch (error) {
        return {totalPrice,totalQuantity}
    }
}
export function jsonToQueryString(json) {
    return Object.keys(json).map(function(key) {
        return encodeURIComponent(key) + '=' + encodeURIComponent(json[key]);
    }).join('&');
}

export function formatDate(date = new Date()) {
    const year = date.toLocaleString('en', {year: 'numeric'});
    const month = date.toLocaleString('en', {
      month: '2-digit',
    });
    const day = date.toLocaleString('en', {day: '2-digit'});
    console.log(year,month,day);
    return [year, month, day].join('/');
  }
export const equalAddress=(delivery,billing)=>{
    return delivery.country+delivery.address1+delivery.state+delivery.phoneNumber+delivery.city === billing.country+billing.address1+billing.state+billing.phoneNumber+billing.city;
   }
export const SICHU_API_KEY= {
    'sichu-api-key':process.env.NEXT_PUBLIC_SICHU_API_KEY
}
export const orderStatusOptions = ['Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'];
 
export const orderStatusStyle = (value)=>{
    let style = 'p-2 rounded-md  select-none cursor-pointer';
    switch(value){
        case orderStatusOptions[0]:
            style += ' bg-blue-300 text-blue-800';
            break;
        case orderStatusOptions[1]:
            style += ' bg-green-300 text-green-800';
            break;
        case orderStatusOptions[2]:
            style += ' bg-yellow-300 text-yellow-800';
            break;
        case orderStatusOptions[3]:
            style += ' bg-orange-300 text-orange-800';
            break;
        case orderStatusOptions[4]:
            style += ' bg-red-300 text-red-800';
            break;
    }
    return style;
}
export const paymentStatusOptions = ['Pending', 'Completed', 'Failed'];
export const paymentStatusStyle = (value)=>{
    let style = 'p-2 rounded-md  select-none cursor-pointer';
    switch(value){
        case paymentStatusOptions[0]:
            style += ' bg-blue-300 text-blue-800';
            break;
        case paymentStatusOptions[1]:
            style += ' bg-green-300 text-green-800';
            break;
        case paymentStatusOptions[2]:
            style += ' bg-yellow-300 text-yellow-800';
            break;
    }
    return style;
}
export const skeletonSX={bgcolor:grey[400]} 
export let currency_code = "NPR."
