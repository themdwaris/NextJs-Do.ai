import { PricingTable } from "@clerk/nextjs";
import React from "react";

const PricePlan = () => {
  return (
    <div className="max-w-3xl mx-auto px-5 z-30 py-16 md:py-24">
      <h1 className="text-4xl text-center font-bold text-gray-800">
        Choose Your Plan
      </h1>
      <p className="max-w-md mx-auto mt-3 text-gray-600 text-center">
        Start for free and scale up as you grow. Find the perfect plan for your
        content creation needs.
      </p>

      <div className="mt-8">
        <PricingTable/>
      </div>
    </div>
  );
};

export default PricePlan;
