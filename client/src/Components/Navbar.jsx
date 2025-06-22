import React from 'react';
import { HiOutlineShoppingBag } from "react-icons/hi";
import { FaPlus, FaRegBell } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <nav className="w-full flex items-center justify-between mobile:px-4 px-10 py-4 bg-white rounded-b-3xl shadow-md fixed top-0 left-0 z-10 montserrat">
      <h1 onClick={() => navigate("/")} className='mobile:text-lg text-2xl font-bold text-pink-700 cursor-pointer'><span className='text-purple-700'>Outfit </span>Atlas</h1>

      <div className='flex items-center gap-4 mobile:gap-1.5'>
        <div onClick={() => navigate("/")} className='p-2 mobile:text-xs rounded-xl bg-pink-200 text-pink-700 hover:bg-pink-300 transition-colors font-medium cursor-pointer'>
          Home
        </div>

        <div className="p-3 mobile:text-xs text-lg rounded-xl bg-yellow-100 text-yellow-700 cursor-pointer shadow-sm hover:bg-yellow-200 transition-colors">
          <FaRegBell />
        </div>

        <div onClick={() => navigate('/add')} className="p-3 mobile:text-xs text-lg rounded-xl bg-blue-200 text-blue-700 cursor-pointer shadow-sm hover:bg-blue-300 transition-colors">
          <FaPlus />
        </div>

        <div className="p-2 mobile:text-lg text-2xl rounded-xl bg-purple-200 text-purple-700 cursor-pointer shadow-sm hover:bg-purple-300 transition-colors">
          <HiOutlineShoppingBag />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;