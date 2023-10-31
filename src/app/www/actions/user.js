'use server'
const { API_URL, SICHU_API_KEY } = require("@/app/lib/utils/utils")


export const resetPassword = ({email})=>{
   return new Promise((resolve,reject)=>{
    fetch(API_URL(`account/send-reset-link?email=${email}`),{
        method:'GET',
        headers:{
            ...SICHU_API_KEY
        }
    }).then(async(response)=>{
       resolve(await response.json())
    }).catch((err)=>{
        reject(err)
    })
   });
}
const  getRequest = ({apiUrl,cache="no-cache",headers={}})=>{
    return new Promise((resolve,reject)=>{
        fetch(API_URL(apiUrl),{
            method:"GET",
            cache:cache,
            credentials:"include",
            headers:{
                ...SICHU_API_KEY,
                ...headers
            }
        }).then(async(response)=>{
           resolve(await response.json())
        }).catch((err)=>{
            reject(err)
        })
       });
}
export const verifyResetToken = ({token})=>{
    return getRequest({apiUrl:`account/verify-code?token=${token}`})
}

const postRequest = ({data,headers,apiTrigger,method="POST",cache="default"})=>{
    return new Promise((resolve,reject)=>{
        fetch(API_URL(`account/${apiTrigger}`),{
            method:method,
            body:JSON.stringify(data),
            cache:cache,
            credentials:"include",
            headers:{
                ...SICHU_API_KEY,
                ...headers
            }
        }).then(async(response)=>{
           resolve(await response.json())
        }).catch((err)=>{
            reject(err)
        })
       });
}
export const sendEmailVerificationCode = (body)=>{
    return postRequest({data:body,headers:{'Content-Type':'application/json'},apiTrigger:'send-verification-code',method:"POST",cache:"no-store"})
}
//verify/email-code
export const verifyEmailVerificationCode = (body)=>{
    return postRequest({data:body,headers:{'Content-Type':'application/json'},apiTrigger:'verify/email-code',method:"POST",cache:"no-store"})
}
export const changeForgotPassword = (body)=>{
    return postRequest({data:body,headers:{'Content-Type':'application/json'},apiTrigger:'reset-password/change',method:"PATCH"})
}

export const createUser = (body)=>{
    return postRequest({data:body,headers:{'Content-Type':'application/json'},apiTrigger:'create-user'})
 }