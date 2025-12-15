import React from "react";
import { Link } from "react-router-dom";

type Crumb = { label: string; to?: string };

const Breadcrumbs: React.FC<{ items: Crumb[] }> = ({ items }) => {
  return (
    <nav className="text-xs sm:text-sm text-gray-500 flex items-center flex-wrap gap-1">
      {items.map((item, idx) => (
        <span key={idx} className="flex items-center">
          {item.to ? (
            <Link to={item.to} className="hover:text-gray-700">
              {item.label}
            </Link>
          ) : (
            <span className="text-gray-700">{item.label}</span>
          )}
          {idx < items.length - 1 && <span className="mx-2">/</span>}
        </span>
      ))}
    </nav>
  );
};

export default Breadcrumbs;
