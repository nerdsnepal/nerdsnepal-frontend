import { fetchSichu } from "@/app/www/actions/action";
import { authOptions } from "@/app/www/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import OrderDetail from "./detail";


const OderDetails = async(props) => {
    const session = await getServerSession(authOptions)
    if(!session){
        return <>Something went wrong</>
    }
    const {accessToken} = session.user;
    const {orderId} = props.searchParams;
    const data = await fetchSichu({accessToken,endPoint:`order/orderdetails?orderId=${orderId}`})
   
    return (  <>
        <OrderDetail data={data.data} />
    </>);
}
 
export default OderDetails;