import React from "react";
import { motion } from "framer-motion";
import farmBg from "../assets/farmBg.jpg";  
import { ArrowRight02Icon } from "hugeicons-react";
import PricingCard from "../components/PricingCard";

const Home: React.FC = () => {
  return (
    <div className="relative h-screen w-full overflow-hidden bg-black">
      {/* Background Image */}
      <img
        src={farmBg} // replace with your image path
        alt="Farm background"
        className="absolute inset-0 w-full h-full object-cover opacity-80"
      />

      {/* Overlay Gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent"></div>

      {/* Navbar */}

      {/* Hero Section */}
      <div className="absolute top-20 z-10 flex flex-col justify-center h-full px-10 md:px-20 max-w-3xl text-white">
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-lime-400/15  px-4 py-1 w-fit rounded-full text-sm mb-4"
        >
          Sustainable Farming Tech
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-4xl md:text-4xl font-bold leading-tight mb-6"
        >
          Bringing Innovation to Your <br /> Farming Journey.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="text-gray-200 text-lg mb-8"
        >
          From precision agriculture to sustainable practices, FarmIntel helps
          farmers grow more efficiently and profitably. Join us in transforming
          the way you farm.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          <button className="bg-lime-400 text-black font-semibold px-2 py-2 rounded-full hover:bg-lime-300 flex items-center gap-2">
            Get Started
            
            <ArrowRight02Icon size={34} className="text-white bg-emerald-950 p-2 rounded-full"/>
          </button>
        </motion.div>
      </div>

      {/* Mission Card */}
      <div className="absolute bottom-12 right-10 bg-white/10 backdrop-blur-md p-6 rounded-2xl text-white max-w-xs z-10">
        <h3 className="font-semibold text-lg mb-2">Our Mission</h3>
        <p className="text-sm text-gray-200">
          To empower farmers with innovative tools and technology that elevate
          productivity, sustainability, and efficiency—shaping the future of farming.
        </p>
        <button className="mt-3 text-lime-400 hover:underline text-sm">
          Learn More →
        </button>
      </div>

      <div className="w-[90%] h-auto flex gap-8">
        <PricingCard
          title="Starter"
          subtitle="Perfect for early-stage founders"
          price="Free"
          features={[
            'Up to 100 notes/tasks/month',
            'Basic AI suggestions',
            'Daily summary',
            '1 workspace'
          ]}
          buttonText="Get started"
          buttonColor="rgba(31, 31, 31, 1)"
          buttonTextColor="#ffffff"
        />
            
      </div>
    </div>
  );
};

export default Home;
