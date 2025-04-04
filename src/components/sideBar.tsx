// import { BrainIcon } from "../Icons/brainIcon";
import { DocumentIcon } from "../Icons/documentIcon";
import { TwitterIcon } from "../Icons/twitterIcon";
import { YoutubeIcon } from "../Icons/youtubeIcon";
import { SideBarItem } from "./SideBaritem";
import { LinkIcon } from "../Icons/linkIcon";
import { HashIcon } from "../Icons/hashIcon";
import { BrainIcon } from "../Icons/brainIcon";

export function SideBar() {
    return <div className="h-screen bg-white border-r w-72 fixed left-0 top-0">
        <div className="flex p-4 text-2xl font-bold text-gray-800 border-b items-center cursor-pointer hover:bg-gray-200 transition-all duration-150">
            <BrainIcon />
            Brainly
        </div>
        
        <div className="">
            <SideBarItem text="Twitter" Icon={<TwitterIcon />} />
            <SideBarItem text="Videos" Icon={<YoutubeIcon />} />
            <SideBarItem text="Documents" Icon={<DocumentIcon />} />
            <SideBarItem text="Link" Icon={<LinkIcon />} />
            <SideBarItem text="Tags" Icon={<HashIcon />} />
        </div>
    </div>
}