import React from "react";

interface SelectFieldProps {
  label: string;
  name: string;
  required?: boolean;
  value?: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: { value: string; label: string }[];
  className?: string;
}

const SelectField: React.FC<SelectFieldProps> = ({
  label,
  name,
  required,
  value,
  onChange,
  options,
  className,
}) => {
  return (
    <div className={`mb-2 ${className}`}>
      <label className={`text-sm font-medium text-gray-700 ${className}`}>
        {label}
        {required && <span className={`text-red-500 ${className}`}>*</span>}
      </label>
      <select
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        className={`block w-full mt-2 px-3 py-4 h-[63px]
          border-gray-100 border-2 rounded-xl shadow-sm focus:outline-none
          focus:ring-blue-500 focus:border-blue-500 sm:text-base text-black ${className}`}
      >
        <option value="" disabled>
          Select a product
        </option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectField;
