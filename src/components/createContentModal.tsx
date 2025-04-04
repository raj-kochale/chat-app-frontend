// createContentModal.tsx
import { BACKEND_URL } from "../config";
import { CrossIcon } from "../Icons/crossIcon";
import { Button } from "./button";
import { useRef, forwardRef, useState } from "react";
import axios from "axios";

enum ContentType {
    Youtube = "youtube",
    Twitter = "twitter",
}

export function CreateContentModal({ open, onClose }: { open: boolean, onClose: () => void }) {

    const titleRef = useRef<HTMLInputElement>(null);
    const linkRef = useRef<HTMLInputElement>(null);
    const [type, setType] = useState<ContentType>(ContentType.Youtube);

    async function addContent() {
        const title = titleRef.current?.value;
        const link = linkRef.current?.value;
    
        if (!title || !link) {
            alert("Please fill in all fields.");
            return;
        }
    
        const token = localStorage.getItem("token");
        if (!token) {
            alert("Session expired. Please log in again.");
            return;
        }
    
        try {
            // Decode token
            const token = localStorage.getItem("token");
            if (!token) {
                alert("Session expired. Please log in again.");
                return;
            }
            
            const decodedToken = JSON.parse(atob(token.split(".")[1]));
            console.log("Decoded Token:", decodedToken); // Check if "id" exists
            
            const userId = decodedToken.id; // Use "id" instead of "userId"
            
            await axios.post(`${BACKEND_URL}content`, {
                title,
                link,
                type,
                userId, // Send "id" as "userId"
            }, {
                headers: { Authorization: `Bearer ${token}` },
            });
            
            console.log("Adding content:", { title, link });
            onClose();
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            console.error("Error adding content:", error.response?.data || error.message);
        }
    }
    

    return (
        <div>
            {open && (
                <div className="w-screen h-screen fixed top-0 left-0 bg-gray-300 bg-opacity-50 z-10 flex justify-center items-center">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-96 z-20">
                        <div className="flex justify-end">
                            <div onClick={onClose} className="cursor-pointer">
                                <CrossIcon />
                            </div>
                        </div>
                        <div>
                            <Input ref={titleRef} onchange={() => { }} placeholder="Title" />
                            <Input ref={linkRef} onchange={() => { }} placeholder="Enter the link" />

                            <div className="gap-3">
                                <h1>Type</h1>
                                <div className="flex justify-start gap-2 p-4">
                                    <Button text="Youtube" variant={type === ContentType.Youtube ? "primary" : "secondary"} onClick={() => setType(ContentType.Youtube)} />
                                    <Button text="Twitter" variant={type === ContentType.Twitter ? "primary" : "secondary"} onClick={() => setType(ContentType.Twitter)} />
                                </div>
                            </div>

                            <div className="flex justify-center gap-4 pt-4">
                                <Button onClick={() => {
                                    addContent();
                                    console.log("Submit button clicked!");
                                }} variant="primary" text="Submit" />
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

const Input = forwardRef<HTMLInputElement, { onchange: () => void, placeholder: string }>(
    ({ onchange, placeholder }, ref) => {
        return <input ref={ref} type="text" placeholder={placeholder} className="border-2 border-gray-300 rounded-md p-2 w-full mb-4" onChange={onchange} />
    }
);
