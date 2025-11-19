import React from "react";

type CapsuleProps = {
  title: string;
  Icon?: React.ComponentType<React.SVGProps<SVGSVGElement>>;
};

const Capsule: React.FC<CapsuleProps> = ({ title, Icon }) => {
  return (
    <button
      className="
        flex h-[38px] w-fit items-center justify-center gap-1 
        rounded-full border border-white/50 
        bg-[#222222] 
        bg-gradient-to-b from-[#222222] to-[#3C3C3C] 
        px-[21px] py-2 
        text-[#E2E2E2]
      "
    >
      {Icon && <Icon className="h-6 w-6" />} {/* Icon size = 24px */}
      <span className="text-[16px]">{title}</span>
    </button>
  );
};

export default Capsule;
