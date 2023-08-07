import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import Link from "next/link";

const AddCategoryToolbar = () => {
    return (
        <div className="flex gap-4 mobile:ml-[35%]">
           <Link href='/category'> <ArrowBackIosIcon className="text-center hover:text-gray-400 hover:rounded-ful" /></Link> <h1 className="font-bold text-lg">Add Category</h1>
        </div>

    );
}
 
export default AddCategoryToolbar;