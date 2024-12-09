import React from "react";
import { CiSearch } from "react-icons/ci";

interface SearchInputProps {
  placeholder: string;
  containerClass?: string;
}

const SearchInput = ({ placeholder, containerClass }: SearchInputProps) => {
  return (
    <div
      className={`relative flex items-center border-2 rounded-xl hover:border hover:border-blue-500 max-w-[330px] flex-grow ${containerClass}`}
    >
      <span className="ml-2 text-black text-3xl">
        <CiSearch />
      </span>
      <input
        type="text"
        placeholder={placeholder}
        className="p-1 w-full focus:outline-none"
      />
    </div>
  );
};

export default SearchInput;
