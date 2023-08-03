import AddIcon from '@mui/icons-material/Add';
import { Button } from '@mui/material';
import CreateStoreDialog from './create-store';
import { useDispatch } from 'react-redux';
import { toggler } from '@/app/state/reducer/createStoreSlice';

const StoreMenu = () => {
    const dispatch = useDispatch()

    return ( 
        <div>
            <Button variant='outlined' onClick={()=>dispatch(toggler())} title='Create Store' className='font-medium capitalize float-right' startIcon={<AddIcon/>}>Create Store</Button>
            <CreateStoreDialog/>
        </div>

     );
}
 
export default StoreMenu;