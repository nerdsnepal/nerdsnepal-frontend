
import { Button } from "@mui/material";

export const metadata= {
    title:"Create your own store"
}

const UserInformationPage = () => {
   
    return <>
    <main className=" w-full h-full">
         <div className="flex flex-col gap-9 justify-center items-center m-12">
         <h1 className="text-4xl">Request for store </h1>
         <Button type="button"variant="contained">Get Strated</Button>
         </div>
    </main>    
    </>
}
 
export default UserInformationPage;