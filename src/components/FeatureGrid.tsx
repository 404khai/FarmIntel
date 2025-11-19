import React from "react";
import Capsule from "./Capsule";
import { ParagraphBulletsPoint01Icon } from "hugeicons-react";

// IMPORT YOUR IMAGES HERE
import grid5 from "../assets/grid5.png";

type FeatureBoxProps = {
  title: string;
  image: string; // Imported image resolves to string in CRA/Vite
  widthClass: string;
};

const FeatureBox: React.FC<FeatureBoxProps> = ({ title, image, widthClass }) => {
  return (
    <div
      className={`
        relative h-[250px] rounded-2xl overflow-hidden 
        bg-cover bg-center bg-no-repeat group cursor-pointer
        ${widthClass}
      `}
      style={{ backgroundImage: `url(${image})` }}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/40 group-hover:bg-black/60 transition-all duration-300"></div>

      {/* Hover Text */}
      <div
        className="
        absolute inset-0 flex items-center justify-center 
        opacity-0 group-hover:opacity-100 
        transition-all duration-300 
        text-xl font-semibold text-white
      "
      >
        {title}
      </div>
    </div>
  );
};

const FeatureGrid = () => {
  return (
    <section className="w-[90%] mx-auto my-20 flex flex-col items-center gap-10">
      {/* Capsule */}
      <Capsule title="Features" Icon={ParagraphBulletsPoint01Icon} />

      {/* Grid Container */}
      <div className="w-full flex flex-col gap-6">
        {/* Row 1 */}
        <div className="flex flex-col md:flex-row w-full gap-6">
          <FeatureBox title="AI Pest Detection" image={grid5} widthClass="md:w-[60%] w-full" />
          <FeatureBox title="Crop Monitoring" image={grid5} widthClass="md:w-[40%] w-full" />
        </div>

        {/* Row 2 */}
        <div className="flex flex-col md:flex-row w-full gap-6">
          <FeatureBox title="Satellite Imaging" image={grid5} widthClass="md:w-[45%] w-full" />
          <FeatureBox title="Soil Analysis" image={grid5} widthClass="md:w-[55%] w-full" />
        </div>

        {/* Row 3 */}
        <FeatureBox title="Full Farm Intelligence" image={grid5} widthClass="w-full" />
      </div>
    </section>
  );
};

export default FeatureGrid;
