import { Stack } from "@mui/material";
import Image from "next/image";
import EmailVerificationForm from "./email-verification";
import { notFound } from "next/navigation";
import { fetchSichu } from "../../actions/action";
import { isEmpty } from "@/app/lib/utils/utils";

export const metadata={
    title:"Email Verification",
    description:""
}

const EmailValidatorPage = async(props) => {
    const {email,_sichu} = props.searchParams;
     //verify email address  belogs to the register or not
   try {
    const data =await fetchSichu({endPoint:`account/user-email?email=${email}`,revalidate:2});
    console.log(data);
    if(!data || isEmpty(_sichu)){
       throw new Error("Not found");
    }
   } catch (error) {
        notFound();
   }

    return (<>
        <Stack direction={{xs:'column',md:'row'}} justifyContent={'center'} alignItems={'center'} gap={2}>
        <Image src={'/gojo-email-verification.png'} alt="gojo-email-verification.png" height={431} width={431}/>
        <EmailVerificationForm email={email}  />
        </Stack>
    
    </>);
}
 
export default EmailValidatorPage;