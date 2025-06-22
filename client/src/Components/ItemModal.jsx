import React, { useState } from 'react';
import { RiArrowLeftSLine, RiArrowRightSLine } from "react-icons/ri";
import { HiOutlineShoppingBag } from "react-icons/hi";
import { IoHeart } from "react-icons/io5";

const ItemModal = ({ item, onClose, onEnquire }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Combine cover image and additional images for carousel
  const allImages = [item.coverImage, ...(item.additionalImages || [])];

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % allImages.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? allImages.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-20 openSans animate-fade-in">
      <div className="bg-white rounded-3xl shadow-2xl p-6 mobile:p-4 w-full max-w-md overflow-y-auto relative transform scale-95 animate-scale-in">
        <div className="flex justify-between items-center mb-4">
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-2xl mobile:text-lg bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors shadow-sm"
          >
            <RiArrowLeftSLine />
          </button>
          <div className="p-2 mobile:text-lg text-2xl rounded-xl bg-purple-200 text-purple-700 cursor-pointer shadow-sm hover:bg-purple-300 transition-colors">
            <HiOutlineShoppingBag />
          </div>
        </div>

        <div className="relative w-full h-64 bg-gray-100 rounded-2xl overflow-hidden mb-4 mobile:mb-3 shadow-inner">
          <img
            src={`../../public/images/${allImages[currentImageIndex]}`}
            alt={item.itemName}
            className="w-full h-full object-contain"
            onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/400x256/e0e0e0/ffffff?text=No+Image"; }}
          />
          {allImages.length > 1 && (
            <>
              <button
                onClick={prevImage}
                className="absolute left-2 top-1/2 -translate-y-1/2 p-2 bg-black bg-opacity-30 text-white rounded-full hover:bg-opacity-50 transition-colors"
              >
                <RiArrowLeftSLine />
              </button>
              <button
                onClick={nextImage}
                className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-black bg-opacity-30 text-white rounded-full hover:bg-opacity-50 transition-colors"
              >
                <RiArrowRightSLine />
              </button>
            </>
          )}
          <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-1">
            {allImages.map((_, index) => (
              <span
                key={index}
                className={`block w-2 h-2 rounded-full ${index === currentImageIndex ? 'bg-purple-600' : 'bg-gray-400'
                  }`}
              ></span>
            ))}
          </div>
        </div>

        {/* Item Details */}
        <div className="mb-6 mobile:mb-4 montserrat">
          <div className="flex justify-between items-center mb-2">
            <h4 className="text-gray-600 text-base mobile:text-sm">{item.itemBrand}</h4>
            <span className="text-xl mobile:text-lg font-bold text-gray-800">${item.itemCost}</span>
          </div>
          <h2 className="text-3xl mobile:text-2xl font-bold text-gray-900 mb-2">{item.itemName}</h2>
          <p className="text-gray-700 text-sm mobile:text-xs leading-relaxed openSans">{item.itemDescription}</p>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-between items-center">
          <button className="p-3 rounded-2xl bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors shadow-md mr-4">
            <IoHeart />
          </button>
          <button
            onClick={onEnquire}
            className="flex-1 py-4 mobile:py-3 px-6 mobile:px-4 bg-purple-600 text-white font-bold rounded-2xl shadow-lg hover:bg-purple-700 transition-colors transform hover:scale-105"
          >
            Enquire Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default ItemModal;