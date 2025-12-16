import React from "react";
import { Link } from "react-router-dom";
import { LuArrowLeft } from "react-icons/lu";

type Props = {
  to: string;
  label?: string;
  className?: string;
};

const BackToDashboardPill: React.FC<Props> = ({ to, label = "Back to Dashboard", className }) => {
  return (
    <Link
      to={to}
      className={`inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gray-100 text-gray-700 text-sm hover:bg-gray-200 ${className || ""}`}
    >
      <LuArrowLeft size={16} />
      {label}
    </Link>
  );
};

export default BackToDashboardPill;
