'use client'
import AddIcon from '@mui/icons-material/Add';
import { Button } from '@mui/material';
import CreateStoreDialog from './create-store';
import { useDispatch, useSelector } from 'react-redux';
import { toggler } from '@/app/state/reducer/createStoreSlice';


const StoreMenu = () => {
    const dispatch = useDispatch()
    const isSuperUser = useSelector((state)=>state.auth.isSuperAdmin)
    if(isSuperUser){
        return ( 
            <div>
                <Button variant='outlined' onClick={()=>dispatch(toggler())} title='Create Store' className={`font-medium capitalize float-right `} startIcon={<AddIcon/>}>Create Store</Button>
                <CreateStoreDialog/>
            </div>
    
         );
    }
    return <h1>Merchant View</h1>
}
 
export default StoreMenu;