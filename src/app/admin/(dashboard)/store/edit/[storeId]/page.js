import StoreInformationEditPage from "./store-info-edit";

export const metadata = {
    title:"Store"
}


const Page = ({params}) => {
    const storeId = params.storeId 
    return <StoreInformationEditPage storeId={storeId} />;
}
 
export default Page;