interface InputProps {
    placeholder: string;
    ref?: React.RefObject<HTMLInputElement | null>;
    type?: string;
}       
export function Input({placeholder, ref}: InputProps) {                    
    return <div className='flex flex-col gap-2 p-4'>
            <input ref={ref} placeholder={placeholder} type="text" className="border p-2 rounded" />
            
                            
    </div>
}