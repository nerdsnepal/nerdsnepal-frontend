import { API_URL, SICHU_API_KEY } from '@/app/lib/utils/utils';
import axios from 'axios';
import NextAuth from 'next-auth'
import CredentialsProvider from "next-auth/providers/credentials";


export const authOptions = {
        session: {
            strategy: "jwt",
            maxAge: 30 * 24 * 60 * 60, // 30 days
          },
      providers: [ 
        CredentialsProvider({
            name: "Credentials",
            credentials: {
              username: { label: "Username", type: "text"},
              password: { label: "Password", type: "password"},
             email:{label:"email",type:"text"}
            },
            async authorize(credentials, req) {
                const {username,password,isEmail} = credentials 
                let current_credentails = {}
                if(isEmail==='false') current_credentails={username,password}
                else current_credentails = {email:username,password}
                const {data} = await axios.post(API_URL('auth/email-login'),current_credentails,
               {
                headers:{
                    ...SICHU_API_KEY
                }
               })
                if(data.success){
                    const {user} =data; 
                    const accessToken = data.token;
                    return {...user,accessToken} 
                }else{ 
                   throw new Error(JSON.stringify(data))
                }
            },
          })
      ],
      callbacks: {
        
        async session({ session, token }) {
            const user = token
          return {...session,user}
        },
        async jwt({ token, user, account, profile }) {
            if(user){
                const role = user.role 
                const _id = user._id 
                const isVerified = user.isVerified
                const profile = user.profile
                const username = user.username 
                const accessToken = user.accessToken
                const fullName = `${user.firstname} ${user.middlename} ${user.lastname}`
                const email = user.email
                user = {fullName,role,_id,isVerified,accessToken,email,profile,username}
               return {...token,...user}
            }
          return token
        }
    }
}
const handler =   NextAuth(authOptions)

export {handler as GET,handler as POST};