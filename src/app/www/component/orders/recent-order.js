
import { fetchSichu } from "../../actions/action";
import * as React from 'react';
import OrderList from "./order-list";

const RecentOrder =async ({accessToken}) => {
    let data;
    try {
        data = await fetchSichu({accessToken,endPoint:"order/recent",revalidate:0})
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
        { field: 'manage', headerName: '', width: "70px"},
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
                date:new Date(item.createdAt).toLocaleDateString("en-US",options)
            })
        }
      }
      
      
    return (<>
        <OrderList columns={columns} rows={rows} />
    </>);
}




 


 
export default RecentOrder;