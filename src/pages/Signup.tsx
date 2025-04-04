import { Button } from "../components/button";
import { Input } from "../pages/Input";
import { useRef, useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { useNavigate } from "react-router-dom";

export function Signup() {
    const [isLoading, setIsLoading] = useState(false);
    
    const usernameRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const navigate = useNavigate();

    const handleSignup = async () => {
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
            await axios.post(`${BACKEND_URL}signup`, {
                username,
                password,
            });
            navigate("/signin");
            alert("Signup successful!");
        } catch (error) {
            console.error("Signup failed:", error);
            alert("Signup failed! Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="h-screen w-screen bg-gray-200 flex justify-center items-center">
            <div className="bg-white rounded border w-80 p-8 shadow-lg flex flex-col gap-4">
                <h2 className="text-xl font-bold text-center mb-2">Create Account</h2>
                <Input placeholder="Username" ref={usernameRef} />
                <Input placeholder="Password" type="password" ref={passwordRef} />
                
                <Button 
                    loading={isLoading} 
                    variant="primary" 
                    text="Sign Up" 
                    fullWidth={true} 
                    onClick={handleSignup}
                />
            </div>
        </div>
    );
}
