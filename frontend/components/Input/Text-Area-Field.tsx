interface Prop {
    value: any;
    name: string;
    label?: string;
    required: boolean;
    disabled?: boolean;
    placeholder?: string;
    onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

const TextAreaField = ({ label, value, onChange, required, disabled = false, placeholder, name }: Prop) => {
    return (
        <div className="w-full">
            {label && (
                <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-2">
                    {label}
                </label>
            )}

            <textarea
                id={name}
                name={name}
                value={value}
                onChange={onChange}
                required={required}
                disabled={disabled}
                placeholder={placeholder}
                className="w-full h-32 rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50 disabled:bg-gray-100 disabled:cursor-not-allowed"
            ></textarea>
        </div>
    );
};

export default TextAreaField;
