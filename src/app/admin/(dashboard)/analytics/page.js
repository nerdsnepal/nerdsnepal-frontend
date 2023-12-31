import { Box } from "@mui/material/index"
import AdminAnalytics from "./analytics"


export const metadata = {
    title:"Analytics"
}

export default function AnalyticsPage() {
    return <Box className="w-[100%] h-screen m-1 p-4" overflow={'auto'}>
        <AdminAnalytics/>
    </Box>


}