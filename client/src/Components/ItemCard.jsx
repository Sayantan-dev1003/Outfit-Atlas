import React from 'react';

const ItemCard = ({ item, onClick }) => {
  const cardColors = ['bg-pink-100', 'bg-blue-100', 'bg-yellow-100', 'bg-purple-100', 'bg-green-100', 'bg-red-100'];
  const cardColorClass = cardColors[item.id % cardColors.length];

  return (
    <div
      className={`relative flex mobile:flex-col-reverse mobile:gap-4 items-center p-4 rounded-3xl shadow-lg cursor-pointer transition-transform duration-200 hover:scale-105 transform ${cardColorClass} openSans`}
      onClick={() => onClick(item)}
    >
      {/* Left Section: Details */}
      <div className="flex-1">
        <p className="text-sm mobile:text-[0.7rem] text-gray-600 mb-1 montserrat">{item.itemBrand}</p>
        <h3 className="text-xl mobile:text-base font-bold text-gray-800 mb-2 montserrat">{item.itemName}</h3>
        <p className="text-sm mobile:text-xs font-semibold text-gray-600 mb-4 mobile:mb-0">Price: ${item.itemCost}</p>
      </div>

      {/* Right Section: Image */}
      <div className="flex-shrink-0 w-24 h-auto mobile:w-32 mobile:h-auto ml-auto">
        <img
          src={`/images/${item.coverImage}`}
          alt={item.itemName}
          className="w-full h-auto object-cover rounded-2xl shadow-md transform -rotate-6 transition-transform duration-300"
          onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/128x128/e0e0e0/ffffff?text=No+Image"; }}
        />
      </div>
    </div>
  );
};

export default ItemCard;