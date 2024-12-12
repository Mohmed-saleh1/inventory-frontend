import React, { ReactNode } from "react";

// Define the props for the CustomButton component
interface CustomButtonProps {
  title: string;
  rightIcon?: ReactNode;
  leftIcon?: ReactNode;
  containerClass?: string;
  titleClass?: string;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  type?: "submit" | "reset" | "button";
}

const CustomButton = ({
  title,
  rightIcon,
  leftIcon,
  containerClass = "",
  onClick,
  type,
}: CustomButtonProps) => {
  return (
    <button
      // Apply base styles for the button
      className={`group w-fit cursor-pointer overflow-hidden rounded-[10px] px-7 py-3  text-black ${containerClass}`}
      onClick={onClick}
      type={type}
    >

      {leftIcon}  {/* Render left icon if provided */}
      <span className="relative inline-flex overflow-hidden font-light font-lexend ">
        <div>{title}</div>  {/* Render the button title */}

      </span>
      {rightIcon} {/* Render right icon if provided */}
    </button>
  );
};

export default CustomButton;
