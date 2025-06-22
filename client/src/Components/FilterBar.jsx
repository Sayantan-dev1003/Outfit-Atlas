import React from 'react';
// Import necessary icons from react-icons
import { PiShirtFolded, PiWatch } from "react-icons/pi";
import { GiRunningShoe } from "react-icons/gi";
import { TbShirtSport } from "react-icons/tb";
import { IoShirtOutline } from "react-icons/io5";
import { BsSunglasses } from "react-icons/bs";
import { GiTrousers } from "react-icons/gi";

const FilterBar = ({ onSelectCategory }) => {
  const categories = [
    { name: 'T-shirt', icon: <IoShirtOutline className="h-7 w-7" />, type: 'T-shirt' },
    { name: 'Shirt', icon: <PiShirtFolded className="h-7 w-7" />, type: 'Shirt' },
    { name: 'Pant', icon: <GiTrousers className="h-7 w-7" />, type: 'Pant' },
    { name: 'Jeans', icon: <GiTrousers className="h-7 w-7" />, type: 'Jeans' },
    { name: 'Shoes', icon: <GiRunningShoe className="h-7 w-7" />, type: 'Shoes' },
    { name: 'Sports', icon: <TbShirtSport className="h-7 w-7" />, type: 'Sports' },
    { name: 'Watch', icon: <PiWatch className="h-7 w-7" />, type: 'Watch' },
    { name: 'Accessories', icon: <BsSunglasses className="h-7 w-7" />, type: 'Accessories' },
  ];

  const categoryColors = {
    'Shirt': 'bg-red-100 text-red-800',
    'Pant': 'bg-green-100 text-green-800',
    'Shoes': 'bg-pink-100 text-pink-800',
    'Sports': 'bg-indigo-100 text-indigo-800',
    'Watch': 'bg-green-100 text-green-800',
    'Accessories': 'bg-yellow-100 text-yellow-800',
    'Jeans': 'bg-orange-100 text-orange-800',
    'T-shirt': 'bg-cyan-100 text-cyan-800',
  };

  return (
    <div className="w-full flex flex-col items-center">
      <div className="flex px-4 py-3 tablet:py-4 mobile:px-0 rounded-3xl justify-center items-center bg-white gap-4 mobile:gap-2.5 tablet:gap-7 mobile:flex-wrap tablet:flex-wrap">
        {categories.map((category) => (
          <div
            key={category.name}
            className={`w-28 h-auto mobile:w-24 flex flex-col items-center justify-center p-4 rounded-3xl shadow-md cursor-pointer transition-transform duration-200 hover:scale-105 ${categoryColors[category.name] || 'bg-gray-100 text-gray-800'}`}
            onClick={() => onSelectCategory(category.type)}
          >
            <div className="mb-2">
              {category.icon}
            </div>
            <span className="font-semibold text-base mobile:text-xs text-center">{category.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FilterBar;