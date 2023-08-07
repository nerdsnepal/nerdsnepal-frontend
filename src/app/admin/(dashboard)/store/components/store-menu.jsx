'use client'
import AddIcon from '@mui/icons-material/Add';
import { Button } from '@mui/material';
import CreateStoreDialog from './create-store';
import { useDispatch, useSelector } from 'react-redux';
import { toggler } from '@/app/state/reducer/createStoreSlice';
import { useSession } from 'next-auth/react';
import { useEffect } from 'react';

const StoreMenu = () => {
    const dispatch = useDispatch()
    const isSuperUser = useSelector((state)=>state.auth.isSuperAdmin)
    if(!isSuperUser){
        return <h1>Merchant View</h1>
    }
    return ( 
        <div>
            <Button variant='outlined' onClick={()=>dispatch(toggler())} title='Create Store' className='font-medium capitalize float-right' startIcon={<AddIcon/>}>Create Store</Button>
            <CreateStoreDialog/>
        </div>

     );
}
 
export default StoreMenu;