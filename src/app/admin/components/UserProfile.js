import Image from "next/image";
const UserProfile = ({profileUrl,name}) => {
    return (<div className="flex flex-row relative h-full justify-center gap-4 items-center ">
        <span className="shrink-0"> <Image  width={100} height={100} placeholder="empty" src={profileUrl} draggable={false} alt={name}  className="rounded-full w-10 h-10 mobile:w-15 mobile:h-15" /></span>
        <h3 className="hidden overflow-ellipsis mobile:block">{name}</h3> 
    </div>);
}
 
export default UserProfile;