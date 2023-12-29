import { Suspense } from "react"
import StoreOrderList from "./order.list"


export const metadata = {
    title:"Orders"
}
export default function OrderPage(props) {
    return <>
        <Suspense fallback ={<div>Loading...</div>}>
        <StoreOrderList props={props} />
        </Suspense>
    </>


}