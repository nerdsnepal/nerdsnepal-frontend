
import { APPNAME } from "@/app/lib/utils/utils";
import Login from "./login";
import { getServerSession } from "next-auth";


export const metadata = {
    title:APPNAME+'- login',
    description:APPNAME+" login page"
}


const LoginPage =(props) => {
    //console.log(props);
    return (<div className="flex justify-center items-center h-[80vh]">
          <Login props={props}/>
    </div>);
}
 
export default LoginPage;