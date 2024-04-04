interface Prop {
    value: any;
    name: string;
    type: string;
    label?: string;
    required: boolean;
    disabled?: boolean;
    placeholder?: string;
    onInput?: (e: React.FormEvent<HTMLInputElement>) => void;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputField = ({ label, value, onChange, type, required, disabled = false, placeholder, name, onInput }: Prop) => {
    return (
        <div className="w-full">
            {label && (
                <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-2">
                    {label}
                </label>
            )}

            <input
                id={name}
                name={name}
                type={type}
                value={value}
                onInput={onInput}
                onChange={onChange}
                required={required}
                disabled={disabled}
                placeholder={placeholder}
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50 disabled:bg-gray-100 disabled:cursor-not-allowed"
            />
        </div>
    );
};

export default InputField;
