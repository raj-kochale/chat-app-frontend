import { useEffect } from "react";
import { DeleteIcon } from "../Icons/deleteIcon";
import { ShareIcon } from "../Icons/shareIcon";
import { FileIcon } from "../Icons/fileIcon";

declare global {
    interface Window {
        twttr: {
            widgets: {
                load: () => void;
            };
        };
    }
}

interface CardProps {
    title: string;
    link: string;
    type: "twitter" | "youtube";
}

const formatYouTubeUrl = (url: string) => {
    const match = url.match(/(?:\/|v=|youtu\.be\/)([a-zA-Z0-9_-]{11})/);
    return match ? `https://www.youtube.com/embed/${match[1]}` : url;
};

export function Card({title, link, type}: CardProps) {

    useEffect(() => {
        if (type === "twitter" && window.twttr) {
            window.twttr.widgets.load();
        }
    }, [type, link]);

    return (
        <div className="p-8 bg-white shadow-md rounded-md border-slate-200 max-w-72 border  items-center">
            <div className="flex justify-between">
                <div className="flex items-center text-md">
                    <div className="text-gray-500 pr-2">
                        <FileIcon />
                    </div>
                        {title}
                </div>
                <div className="flex">
                    <div className="pr-2 text-gray-500">
                        <a href={link} target="_blank"></a>
                        <ShareIcon />
                    </div>
                    <div className="pr-2 text-gray-500">
                        <DeleteIcon />
                    </div>
                </div>
            </div>
           
            <div className="pt-4">
                {type === "youtube" && <iframe className="w-full" src={formatYouTubeUrl(link)} title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>}
                
                {type === "twitter" && (
                    <blockquote className="twitter-tweet">
                        <a href={link.replace("x.com", "twitter.com")}></a>
                    </blockquote>
                )}
                
            </div>
            
        </div>
    );
}