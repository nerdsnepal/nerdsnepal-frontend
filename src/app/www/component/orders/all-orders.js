
import { fetchSichu } from "../../actions/action";
import * as React from 'react';
import OrderList from "./order-list";

const AllOrders =async ({accessToken}) => {
    let data;
    try {
        data = await fetchSichu({accessToken,endPoint:"order/",revalidate:5})
        data = data.data;
    } catch (error) {
        //
    }

    if(!data)return null;
    const columns = [
        { field: '_id', headerName: 'Order #',width:"100px" },
        { field: 'mediaUrls', headerName: 'Items', width: "90px"},
        { field: 'name', headerName: 'Product Name', width: "225px"},
        { field: 'date', headerName: 'Placed on', width: "100px"},
        { field: 'price', headerName: 'Total', width: "100px"},
        { field: 'status', headerName: 'Status', width: "100px"},
        { field: 'manage', headerName: 'Action', width: "70px"},
      ];
      const rows = [];
      let index=0;
      for(let item of data){
        for(const product of item.products){
            index++;
            const _id = parseInt(item._id, 8);
            const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
            rows.push({
                index:index,
                ...product,
                price:`NRS.${product.price}`,
                _id,
                orginalId:item._id,
                status:item.status,
                date:new Date(item.createdAt).toLocaleDateString("en-US",options)
            })
        }
      }
     console.log(rows); 
      
    return (<>
        <OrderList hideStyle={true} title="" columns={columns} rows={rows} />
    </>);
}




 


 
export default AllOrders;