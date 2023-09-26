import { APPNAME } from "@/app/lib/utils/utils";
import Register from "./register";

export const metadata= {
    title:APPNAME+'- register',
    description:APPNAME+" register page.",
    keywords:`${APPNAME},Register`,
}

const RegisterPage = () => {

    return (<div className="flex justify-center items-center h-screen">
        <Register/>
    </div>);
}
 
export default RegisterPage;