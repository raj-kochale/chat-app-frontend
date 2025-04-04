import { ReactElement } from "react";

interface ButtonProps {
    variant: 'primary' | 'secondary';
    text: string;
    startIcon?: ReactElement;
    onClick?: () => void;
    fullWidth?: boolean;
    loading?: boolean;
}

const variantClasses = {
    "primary": "bg-purple-600 text-white",
    "secondary": "bg-purple-200 text-purple-600",
};

const defaultStyles = "px-4 py-2 rounded-md font-normal flex justify-center items-center gap-2";

export function Button({variant, text, startIcon, onClick, fullWidth, loading}: ButtonProps) {
    // Combine classes using template literals for clarity and proper spacing
    const buttonClasses = `${variantClasses[variant]} ${defaultStyles} ${fullWidth ? "w-full" : ""} ${loading ? "opacity-50" : ""}`;
    
    return (
        <button 
            onClick={onClick} 
            className={buttonClasses} 
            disabled={loading}
        >
            {startIcon}
            {text}
        </button>
    );
}


// light blue: #e0e6fe
// dark blue: #5046e4
// sidebar color: #fefffe
// sidebar text color: #6f7076
// main component color: #f8fafc