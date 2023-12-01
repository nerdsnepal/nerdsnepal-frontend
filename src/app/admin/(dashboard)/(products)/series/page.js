'use client'
import UploadMedia from "@/app/lib/components/UploadMedia";
import SeriesToolbar from "./components/toolbar";
import { Suspense, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Loading from "@/app/loading";
import SeriesList from "./components/series-list";
import { fetchCategories } from "./actions/action";
import StoreLoadingSkeleton from "../../store/components/store-loading-skeleton";
import { fetchSichu } from "@/app/www/actions/action";
const SeriesPage = () => {
    const storeId = useSelector((state)=>state.auth.storeId)
    const accessToken = useSelector((state)=>state.auth.accessToken)
    const [isLoading,setLoading]= useState(true)
    const [series, setSeries] = useState(null)
    useEffect(()=>{
            (async()=>{
                try {
                    const {data} = await  fetchSichu({accessToken,endPoint:`admin/series?storeId=${storeId}`,revalidate:0})
                    setSeries(data)
                  } catch (error) {
                    setSeries(null)
                    console.log(error);
                  }finally{
                      setLoading(false)
                  }
            })()
    },[storeId])
    const handleDeleteSeries = (_series)=>{
        let newSeries = series.filter((__series)=>_series!==__series)
        setSeries(newSeries)
    }
    return (<div className="m-2">
          <SeriesToolbar/>
           {
            isLoading?<StoreLoadingSkeleton/>: <SeriesList onDelete={handleDeleteSeries} accessToken={accessToken} series={series}/>
           }
    </div>);
}
 
export default SeriesPage;