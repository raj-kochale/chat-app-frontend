import { ReactElement } from "react";

export function SideBarItem({ text, Icon}: {
    text: string;
    Icon: ReactElement;  
}) {
    return <div className="flex text-gray-700 cursor-pointer hover:bg-gray-200 rounded max-w-52 pl-4 transition-all duration-150">
        <div className="p-2">
            {Icon}
        </div>
        <div className="p-2">
            {text}
        </div>
    </div>
}