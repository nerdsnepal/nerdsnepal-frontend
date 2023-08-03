import { API_URL } from "@/app/lib/utils/utils";
import { Avatar } from "@mui/material";

const SelectedUser = ({user}) => {
    return(
    <div key={user._id} className="flex flex-row p-1 border w-full rounded-sm justify-start items-center gap-2">
    <Avatar src={API_URL(user.profile)} alt={user.username} />
    <div className="flex flex-col gap-[2px] justify-center items-center">
    <h2 className="font-bold">{user.username}</h2>
    <h2 className="font-semibold">{`${user.firstname} ${user.lastname}`}</h2>
    </div>
    </div>
    );
}
 
export default SelectedUser;