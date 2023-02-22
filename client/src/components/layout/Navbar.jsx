import React from "react";
import { Link } from "react-router-dom";
import { logo } from "../../../public/assets";

const Navbar = () => {
  return (
    <div className="bg-white flex justify-between items-center h-[10vh] p-5 px-10">
      <Link to="/" className="w-[140px]">
        <img src={logo} alt="" />
      </Link>
      <div>
        <Link
          to="/createPost"
          className="text-white text-lg font-semibold bg-[#6968FF] p-2 px-5 rounded-lg"
        >
          Create
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
