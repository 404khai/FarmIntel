import React from 'react';
import logo from '../assets/logo.png';

type FooterProps = {
  /** optional override for the logo import */
  logoSrc?: string;
};

const Footer: React.FC<FooterProps> = ({ logoSrc = logo }) => {
  return (
    <footer className="w-full mt-10 h-[500px] md:h-[350px] relative overflow-hidden border-t border-white/20 bg-transparent bottom-0">
      {/* Top body: logo + link columns */}
      <div
        className="
          w-full h-[60%] flex items-center justify-around px-6
          max-md:flex-col max-md:justify-center max-md:gap-6
        "
      >
        {/* Logo + tagline */}
        <div
          className="
            w-1/5 h-full flex flex-col items-center justify-center gap-2
            max-md:w-full max-md:h-auto
          "
        >
          <div className="w-full h-20 flex items-center justify-start gap-3 max-md:justify-center">
            <img
              src={logoSrc}
              alt="VetLink logo"
              className="w-[60px] h-[80%] object-contain"
            />
            <h2 className="text-black text-2xl font-semibold">FarmIntel</h2>
          </div>
          <p className="text-black/70 text-sm ">
            Your Pet, Your Vet, One Platform
          </p>
        </div>

        {/* Product Links */}
        <nav
          aria-label="Footer product links"
          className="
            w-1/5 h-full flex flex-col items-start justify-center gap-2
            max-md:w-full max-md:h-auto max-md:items-center
          "
        >
          <h3 className="text-black text-lg font-semibold">Farmers</h3>
          <ul className="space-y-1 ">
            <li>
              <a
                className="text-black/60 hover:text-black transition-colors"
                href="#"
              >
                Co-operatives
              </a>
            </li>
            <li>
              <a
                className="text-black/60 hover:text-black transition-colors"
                href="#"
              >
                Teams
              </a>
            </li>
          </ul>
        </nav>

        {/* Community Links */}
        <div
          className="
            w-1/5 h-full flex flex-col items-start justify-center gap-2
            max-md:w-full max-md:h-auto max-md:items-center
          "
        >
          <h3 className="text-black text-lg font-semibold">Community</h3>
          <ul className="space-y-1">
            <li>
              <a
                className="text-black/60 hover:text-black transition-colors"
                href="#"
              >
                X
              </a>
            </li>
            <li>
              <a
                className="text-black/60 hover:text-black transition-colors"
                href="#"
              >
                GitHub
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Large faded background title */}
      <div className="w-full h-[40%] flex items-end justify-center relative">
        <h1
          className="
            absolute left-1/2 -bottom-[50px] -translate-x-1/2
            text-[200px] leading-[0.8] text-black/25
            pointer-events-none select-none m-0
            max-md:text-[80px] max-md:-bottom-[20px]
          "
        >
          FarmIntel
        </h1>
      </div>
    </footer>
  );
};

export default Footer;
