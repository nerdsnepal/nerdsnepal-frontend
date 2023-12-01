'use client'
import { Button } from "@mui/material";
import Link from "next/link";

const SeriesToolbar = () => {
    return (<div className="flex flex-row justify-between p-2">
        <Link href="/series/add/">
        <Button className="capitalize right-8 absolute" variant="contained"  color="success" autoCapitalize="false" title="Add series"  >
        Add Series
        </Button>
        </Link>

    </div>);
}
 
export default SeriesToolbar;