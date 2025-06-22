import React, { useState } from 'react';
import Navbar from '../components/Navbar.jsx';
import { createItem } from '../services/itemService.js';
import { toast } from 'react-toastify';

const AddItem = () => {
  const [itemName, setItemName] = useState('');
  const [itemType, setItemType] = useState('');
  const [itemDescription, setItemDescription] = useState('');
  const [itemBrand, setItemBrand] = useState('');
  const [itemCost, setItemCost] = useState('');
  const [coverImage, setCoverImage] = useState(null);
  const [additionalImages, setAdditionalImages] = useState([]);
  const [uploading, setUploading] = useState(false);

  const itemTypes = ['T-shirt', 'Shirt', 'Pant', 'Jeans', 'Shoes', 'Sports', 'Watch', 'Accessories'];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUploading(true);

    try {
      // Prepare item data for the service function
      const itemData = {
        itemName,
        itemType,
        itemDescription,
        itemBrand,
        itemCost,
        coverImage,
        additionalImages,
      };

      const newItem = await createItem(itemData); // Call the service function
      toast.success('Item successfully added!');
      // Reset form fields
      setItemName('');
      setItemType('');
      setItemDescription('');
      setItemBrand('');
      setItemCost('');
      setCoverImage(null);
      setAdditionalImages([]);
      // Note: File input clear can be tricky in React. You might need to reset the key of the input or use refs.
      // For simplicity, we just clear state here.
    } catch (error) {
      toast.error(error.message || 'Failed to add item. Please try again.');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 openSans">
      <Navbar />
      <div className="pt-24 p-6 max-w-2xl mx-auto">

        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-3xl shadow-xl">
          <h1 className="text-3xl mobile:text-xl montserrat font-bold text-gray-800 mb-6 text-center">Add New Item</h1>

          {/* Item Name & Item Brand in one row for tablet/laptop, stacked for mobile */}
          <div className="flex flex-col md:flex-row md:space-x-4 mb-4">
            <div className="flex-1 mb-6 md:mb-0">
              <label htmlFor="itemName" className="block text-gray-700 text-lg mobile:text-sm font-medium mb-2 montserrat">
                Item Name
              </label>
              <input
                type="text"
                id="itemName"
                className="w-full p-4 mobile:py-2 border border-gray-300 rounded-xl bg-gray-100 focus:outline-none focus:ring-2 focus:ring-purple-300 shadow-inner text-gray-800"
                placeholder="e.g., Summer Dress"
                value={itemName}
                onChange={(e) => setItemName(e.target.value)}
                required
              />
            </div>
            <div className="flex-1">
              <label htmlFor="itemBrand" className="block text-gray-700 text-lg mobile:text-sm font-medium mb-2 montserrat">
                Item Brand
              </label>
              <input
                type="text"
                id="itemBrand"
                className="w-full p-4 mobile:py-2 border border-gray-300 rounded-xl bg-gray-100 focus:outline-none focus:ring-2 focus:ring-purple-300 shadow-inner text-gray-800"
                placeholder="e.g., Nike, Zara"
                value={itemBrand}
                onChange={(e) => setItemBrand(e.target.value)}
                required
              />
            </div>
          </div>

          {/* Item Type & Item Cost in one row for tablet/laptop, stacked for mobile */}
          <div className="flex flex-col md:flex-row md:space-x-4 mb-4">
            <div className="flex-1 mb-6 md:mb-0">
              <label htmlFor="itemType" className="block text-gray-700 text-lg mobile:text-sm font-medium mb-2 montserrat">
                Item Type
              </label>
              <select
                id="itemType"
                className="w-full p-4 mobile:py-2 border border-gray-300 rounded-xl bg-gray-100 focus:outline-none focus:ring-2 focus:ring-purple-300 shadow-inner text-gray-800 appearance-none"
                value={itemType}
                onChange={(e) => setItemType(e.target.value)}
                required
              >
                <option value="">Select Item Type</option>
                {itemTypes.map((type) => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>
            <div className="flex-1">
              <label htmlFor="itemCost" className="block text-gray-700 text-lg mobile:text-sm font-medium mb-2 montserrat">
                Item Cost ($)
              </label>
              <input
                type="number"
                id="itemCost"
                className="w-full p-4 mobile:py-2 border border-gray-300 rounded-xl bg-gray-100 focus:outline-none focus:ring-2 focus:ring-purple-300 shadow-inner text-gray-800"
                placeholder="e.g., 29.99"
                value={itemCost}
                onChange={(e) => setItemCost(e.target.value)}
                step="0.01"
                min="0"
                required
              />
            </div>
          </div>

          {/* Item Description in a single row */}
          <div className="mb-4">
            <label htmlFor="itemDescription" className="block text-gray-700 text-lg mobile:text-sm font-medium mb-2 montserrat">
              Item Description
            </label>
            <textarea
              id="itemDescription"
              rows="4"
              className="w-full p-4 mobile:py-2 border border-gray-300 rounded-xl bg-gray-100 focus:outline-none focus:ring-2 focus:ring-purple-300 shadow-inner text-gray-800"
              placeholder="Provide a detailed description of the item..."
              value={itemDescription}
              onChange={(e) => setItemDescription(e.target.value)}
              required
            ></textarea>
          </div>

          {/* Item Cover Image & Item Additional Images in one row for tablet/laptop, stacked for mobile */}
          <div className="flex flex-col md:flex-row md:space-x-4 mb-4">
            <div className="flex-1 mb-6 md:mb-0">
              <label htmlFor="coverImage" className="block text-gray-700 text-lg mobile:text-sm font-medium mb-2 montserrat">
                Item Cover Image
              </label>
              <input
                type="file"
                id="coverImage"
                accept="image/*"
                className="w-full mobile:text-sm text-gray-800 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-sm file:font-semibold file:bg-purple-50 file:text-purple-700 hover:file:bg-purple-100 cursor-pointer"
                onChange={(e) => setCoverImage(e.target.files[0])}
                required
              />
            </div>
            <div className="flex-1">
              <label htmlFor="additionalImages" className="block text-gray-700 text-lg mobile:text-sm font-medium mb-2 montserrat">
                Item Additional Images
              </label>
              <input
                type="file"
                id="additionalImages"
                accept="image/*"
                multiple
                className="w-full mobile:text-sm text-gray-800 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-sm file:font-semibold file:bg-purple-50 file:text-purple-700 hover:file:bg-purple-100 cursor-pointer"
                onChange={(e) => setAdditionalImages(Array.from(e.target.files))}
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-4 mobile:py-3 bg-purple-600 text-white font-bold rounded-2xl shadow-lg hover:bg-purple-700 transition-colors transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={uploading}
          >
            {uploading ? 'Adding Item...' : 'Add Item'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddItem;