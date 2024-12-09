
import React from 'react';
interface InputFieldProps {
  label: string;
  type: string;
  placeholder?: string;
  required?: boolean;
  name: string;
  value?: string | number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?:string;
}

const InputField: React.FC<InputFieldProps> = ({
  label,
  type,
  placeholder,
  required,
  name,
  value,
  className,
  onChange,
}) => {
  return (
    <div className={`mb-2 ${className}`}>
      <label className={` text-sm font-medium text-gray-700  ${className}`}>
        {label}{required && <span className={` text-red-500 ${className}`}>*</span>}
      </label>
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        required={required}
        value={value}
        onChange={onChange
        }
        className={` ${className} block w-full mt-2 px-3 py-4  h-[63px]
          border-gray-100 border-2 rounded-xl  shadow-sm focus:outline-none
          focus:ring-blue-500 focus:border-blue-500 sm:text-base text-black `}
      />
    </div>
  );
};

export default InputField;
