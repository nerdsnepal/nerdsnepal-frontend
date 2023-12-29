'use client'
import { Button } from "@mui/material";
import Link from "next/link";

const CategoryToolbar = () => {
    return (<div className="flex flex-row justify-between p-2">
        <Link className="text-white" href="/category/add/">
        <Button className="capitalize bg-blue-500 right-8 absolute" variant="contained"  color="success" autoCapitalize="false" title="Create Category"  >
        Add Category
        </Button>
        </Link>

    </div>);
}
 
export default CategoryToolbar;