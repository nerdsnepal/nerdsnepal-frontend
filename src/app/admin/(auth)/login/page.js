'use-client'
import Image from "next/image";
export const metadata = {
    title:"Admin login page",
    description:"Login Page for the admin"
}
const LoginPage = () => {
    return <div  className="w-screen h-screen mobile:grid justify-center items-center mobile_tablet:grid-cols-1 tablet_laptop:grid-cols-2 above_laptop:grid-cols-3">
      <div className="h-[50%]  w-full hidden mobile:block tablet_md:h-[25%] mobile_tablet:hidden">
      <h1 className="text-center text-3xl">Manage your business from anywhere, at any time(Slogan Here)</h1>
      </div>
    
    <div className="flex flex-col mobile:shadow-2xl mobile_tablet:justify-self-center mobile:bg-white tablet_laptop:justify-items-start mobile:justify-self-end mobile:border border-solid border-gray-300 rounded-xl h-fit w-auto mobile:w-fit justify-center items-center p-[25px]">
        <h1 className="p-8 font-bold dark:text-black text-2xl">Admin Portal </h1>
    <Image src={"/next.svg"} className="bg-white break-all p-[10px] mb-[11px]" draggable={false} width={100} height={100} alt="logo"/>
        <form method="POST" action="/login" className="basis-full flex flex-col m-8 gap-3 w-full mobile:w-fit dark:text-black">
        <input type="text"  className="p-2 outline-none border border-gray-500 rounded-sm" inputMode="text" placeholder="Username or email" id="username_or_email" required name="username_or_email" />
        <input type="password" className="p-2 outline-none border border-gray-500 rounded-sm" placeholder="Password" id="password" name="password" required/>
        <p className="text-red-500 text-xs">Please enter a valid credentails</p>
        <input type="submit"  value={"Login"} className="outline-1 bg-blue-500 p-2  px-4 cursor-pointer text-white font-semibold" />

        </form> 
    </div>
    </div>;
    
}
 
export default LoginPage;