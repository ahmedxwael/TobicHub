import React from "react";
import { BiLoader } from "react-icons/bi";

const ComponentLoader = () => {
  return (
    <div className="flex items-center justify-center p-10">
      <span className="animate-spin text-3xl">
        <BiLoader />
      </span>
    </div>
  );
};

export default ComponentLoader;
