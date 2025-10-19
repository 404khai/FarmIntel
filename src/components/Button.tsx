import React from "react";
import { cn } from "../utils/cn"; // optional utility for merging classNames

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  title: string;
  Icon?: React.ElementType;
  width?: string | number;
  height?: string | number;
}

const Button: React.FC<ButtonProps> = ({
  title,
  Icon,
  width,
  height,
  className,
  ...props
}) => {
  return (
    <button
      style={{ width, height }}
      className={cn(
        "relative inline-flex items-center justify-center gap-2 px-10 py-5 text-gray-50 rounded-full cursor-pointer overflow-hidden transition-all duration-300 ease-in-out",
        "bg-[#f57d38] border border-[rgba(255,255,255,0.1)]",
        "backdrop-blur-md",

        // Top highlight gradient
        "before:content-[''] before:absolute before:top-0 before:left-0 before:right-0 before:h-[1px]",
        "before:bg-[linear-gradient(90deg,transparent_0%,rgba(245,125,56,0.8)_20%,rgba(245,125,56,1)_50%,rgba(245,125,56,0.8)_80%,transparent_100%)]",
        "before:shadow-[0_0_20px_rgba(245,125,56,0.5)]",

        // Subtle reflection line
        "after:content-[''] after:absolute after:top-[1px] after:left-[10%] after:right-[10%] after:h-[1px]",
        "after:bg-[linear-gradient(90deg,transparent_0%,rgba(255,255,255,0.3)_50%,transparent_100%)]",

        // Hover effects with orange glow
        "hover:bg-[#845940] hover:border-[#f57d38] hover:-translate-y-[2px]",
        "hover:shadow-[0_12px_40px_rgba(0,0,0,0.4),0_0_30px_rgba(245,125,56,0.4),inset_0_1px_0_rgba(255,255,255,0.15)]",
        "hover:before:bg-[linear-gradient(90deg,transparent_0%,rgba(245,125,56,1)_20%,rgba(245,125,56,1)_50%,rgba(245,125,56,1)_80%,transparent_100%)]",
        "hover:before:shadow-[0_0_30px_rgba(245,125,56,0.8)]",

        // Active & disabled states
        "active:translate-y-0 active:shadow-[0_4px_16px_rgba(0,0,0,0.3),inset_0_1px_0_rgba(255,255,255,0.1)]",
        "disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none",
        "disabled:hover:bg-[rgba(255,255,255,0.05)] disabled:hover:border-[rgba(255,255,255,0.1)]",
        "disabled:hover:shadow-[0_8px_32px_rgba(0,0,0,0.3),inset_0_1px_0_rgba(255,255,255,0.1)]",

        className
      )}
      {...props}
    >
      <span>{title}</span>
      {Icon && (
        <Icon className="text-sm transition-transform duration-300 ease-in-out group-hover:translate-x-1" />
      )}
    </button>
  );
};

export default Button;
