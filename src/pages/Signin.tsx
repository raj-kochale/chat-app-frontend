import { Button } from "../components/button";
import { Input } from "../pages/Input";
import { useState } from "react";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BACKEND_URL } from "../config";

export function Signin() {
    const [isLoading, setIsLoading] = useState(false);
    
    const usernameRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const navigate = useNavigate();

    const handleSignin = async () => {
        setIsLoading(true);
        
        const username = usernameRef.current?.value;
        const password = passwordRef.current?.value;

        console.log("Username:", username);
        console.log("Password:", password);

        if (!username || !password ) {
            alert("All fields are required!");
            setIsLoading(false);
            return;
        }


        try {
            const response = await axios.post(`${BACKEND_URL}signin`, {
                username,
                password,
            });
            const jwt = response.data.token;
            localStorage.setItem("Authorization", jwt);
            console.log("JWT:", jwt);
            console.log("Token from API:", response.data.token);
            console.log("User ID from API:", response.data.userId); // Check if userId is present
            navigate("/dashboard");

            alert("Signin successful!");
        } catch (error) {
            console.error("Signin failed:", error);
            alert("Signin failed! Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="h-screen w-screen bg-gray-200 flex justify-center items-center">
            <div className="bg-white rounded border w-80 p-8 shadow-lg flex flex-col gap-4">
                <h2 className="text-xl font-bold text-center mb-2">Account Details</h2>
                <Input placeholder="Username" ref={usernameRef} />
                <Input placeholder="Password" type="password" ref={passwordRef} />
                
                <Button 
                    loading={isLoading} 
                    variant="primary" 
                    text="Sign In" 
                    fullWidth={true} 
                    onClick={handleSignin}
                />
            </div>
        </div>
    );
}
