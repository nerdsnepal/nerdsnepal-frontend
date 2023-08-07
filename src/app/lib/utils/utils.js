export const API_URL =(name)=> `http://localhost:8000/${name}`
export const ADMIN_URL = 'http://admin.localhost:3000'
export const COOKIE_NAME = 'token'
export const removeQueryPart = (path)=> path.split('?')[0]

export const getQueryPart = (path) => path.split('?')[1]
export const emailValidator= (email)=>email.match(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)
export const validateUserName  = (username)=>username.match( /^[a-zA-Z0-9_]{5,29}$/)
export const isEmpty = (value) => value===""||value===""||value===undefined
export const compareDateToC= (date)=>{
    const currentDate = new Date().getTime()
    const compareDate = new Date(date).getTime()
    const res = currentDate>= compareDate
    //console.log(res);
}