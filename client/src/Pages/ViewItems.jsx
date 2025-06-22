import React, { useState, useEffect } from 'react';
import Navbar from '../Components/Navbar.jsx';
import FilterBar from '../Components/FilterBar.jsx';
import ItemCard from '../Components/ItemCard.jsx';
import ItemModal from '../Components/ItemModal.jsx';
import { getAllItems } from '../services/itemService.js';
import { sendEnquiry } from '../services/enquiryService.js';
import { toast } from 'react-toastify';

const ViewItems = () => {
  const staticItems = [
    {
      _id: '1',
      itemName: 'Basic Cotton Tee',
      brand: 'H&M',
      itemType: 'T-shirt',
      itemCost: 8,
      coverImage: 'tshirt1.webp',
      additionalImages: ['tshirt1a.webp', 'tshirt1b.jpg'],
      itemDescription: 'A comfortable and versatile basic cotton T-shirt, perfect for everyday wear. Available in various colors.'
    },
    {
      _id: '2',
      itemName: 'Graphic Print Tee',
      brand: 'Zara',
      itemType: 'T-shirt',
      itemCost: 15,
      coverImage: 'tshirt2.webp',
      additionalImages: ['tshirt2a.webp'],
      itemDescription: 'Trendy T-shirt with a unique graphic print, made from soft, breathable fabric. Stand out from the crowd.'
    },
    // Shirt Category
    {
      _id: '3',
      itemName: 'Classic Oxford Shirt',
      brand: 'Gap',
      itemType: 'Shirt',
      itemCost: 35,
      coverImage: 'shirt1.webp',
      additionalImages: ['shirt1a.webp'],
      itemDescription: 'A timeless Oxford button-down shirt, ideal for smart-casual occasions. Durable and comfortable.'
    },
    {
      _id: '4',
      itemName: 'Linen Blend Shirt',
      brand: 'Uniqlo',
      itemType: 'Shirt',
      itemCost: 28,
      coverImage: 'shirt2.webp',
      additionalImages: [],
      itemDescription: 'Lightweight linen blend shirt, perfect for summer. Breathable and stylish.'
    },
    // Pant Category
    {
      _id: '5',
      itemName: 'Slim Fit Chinos',
      brand: 'Dockers',
      itemType: 'Pant',
      itemCost: 45,
      coverImage: 'pant1.webp',
      additionalImages: ['pant1a.webp'],
      itemDescription: 'Comfortable slim fit chinos, versatile for work or leisure. Wrinkle-resistant fabric.'
    },
    {
      _id: '6',
      itemName: 'Jogger Pants',
      brand: 'Nike',
      itemType: 'Pant',
      itemCost: 55,
      coverImage: 'pant2.webp',
      additionalImages: ['pant2a.webp'],
      itemDescription: 'Sporty and comfortable jogger pants, ideal for active lifestyles or relaxed days.'
    },
    // Jeans Category
    {
      _id: '7',
      itemName: 'Distressed Skinny Jeans',
      brand: 'Levi\'s',
      itemType: 'Jeans',
      itemCost: 60,
      coverImage: 'jeans1.jpeg',
      additionalImages: ['jeans1a.jpeg'],
      itemDescription: 'Fashion-forward distressed skinny jeans, offering a modern and edgy look.'
    },
    {
      _id: '8',
      itemName: 'Classic Blue Jeans',
      brand: 'Topshop',
      itemType: 'Jeans',
      itemCost: 50,
      coverImage: 'jeans2.webp',
      additionalImages: [],
      itemDescription: 'The iconic 501 jeans, a wardrobe staple known for its durability and timeless style.'
    },
    // Shoes Category
    {
      _id: '9',
      itemName: 'White Sneakers',
      brand: 'Adidas',
      itemType: 'Shoes',
      itemCost: 70,
      coverImage: 'shoes1.jpg',
      additionalImages: ['shoes1a.jpeg'],
      itemDescription: 'Classic white sneakers, comfortable and versatile for casual wear. A must-have in every closet.'
    },
    {
      _id: '10',
      itemName: 'Leather Loafers',
      brand: 'Cole Haan',
      itemType: 'Shoes',
      itemCost: 90,
      coverImage: 'shoes2.jpg',
      additionalImages: [],
      itemDescription: 'Premium leather loafers, perfect for adding a touch of sophistication to your business casual attire.'
    },
    // Sports Category
    {
      _id: '11',
      itemName: 'Running Jacket',
      brand: 'Nike',
      itemType: 'Sports',
      itemCost: 65,
      coverImage: 'sports1.jpeg',
      additionalImages: ['sports1a.webp'],
      itemDescription: 'Lightweight and wind-resistant running jacket, ideal for outdoor workouts.'
    },
    {
      _id: '12',
      itemName: 'Yoga Leggings',
      brand: 'Lululemon',
      itemType: 'Sports',
      itemCost: 80,
      coverImage: 'sports2.jpeg',
      additionalImages: [],
      itemDescription: 'High-waisted yoga leggings, designed for maximum comfort and flexibility during your practice.'
    },
    // Watch Category
    {
      _id: '13',
      itemName: 'Minimalist Watch',
      brand: 'Daniel Wellington',
      itemType: 'Watch',
      itemCost: 120,
      coverImage: 'watch1.webp',
      additionalImages: [],
      itemDescription: 'Elegant minimalist watch with a leather strap, suitable for both formal and casual wear.'
    },
    {
      _id: '14',
      itemName: 'Smartwatch',
      brand: 'Apple',
      itemType: 'Watch',
      itemCost: 350,
      coverImage: 'watch2.jpeg',
      additionalImages: ['watch2a.jpeg'],
      itemDescription: 'Advanced smartwatch with health tracking and connectivity features. Stay connected on the go.'
    },
    // Accessories Category
    {
      _id: '15',
      itemName: 'Aviator Sunglasses',
      brand: 'Ray-Ban',
      itemType: 'Accessories',
      itemCost: 150,
      coverImage: 'accessory1.webp',
      additionalImages: ['accessory1a.webp'],
      itemDescription: 'Iconic aviator sunglasses, offering classic style and 100% UV protection.'
    },
    {
      _id: '16',
      itemName: 'Leather Belt',
      brand: 'Fossil',
      itemType: 'Accessories',
      itemCost: 40,
      coverImage: 'accessory2.jpeg',
      additionalImages: ['accessory2a.jpeg'],
      itemDescription: 'High-quality genuine leather belt, a versatile addition to any outfit.'
    },
  ];

  const [items, setItems] = useState(staticItems);
  const [filteredItems, setFilteredItems] = useState(staticItems);
  const [activeCategory, setActiveCategory] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Effect to fetch items from backend and combine with static data
  useEffect(() => {
    const fetchAndCombineItems = async () => {
      try {
        setLoading(true);
        setError(null);
        const fetchedData = await getAllItems();

        if (fetchedData && fetchedData.length > 0) {
          const combined = [...staticItems, ...fetchedData];
          const uniqueItems = Array.from(new Map(combined.map(item => [item._id, item])).values());
          
          setItems(uniqueItems);
        } else {
          setItems(staticItems);
        }
      } catch (err) {
        setError('Failed to fetch items from backend. Displaying only static data.');
        console.error('Error fetching items from backend:', err);
        setItems(staticItems);
      } finally {
        setLoading(false);
      }
    };
    fetchAndCombineItems();
  }, []);

  // Effect to filter items based on activeCategory
  useEffect(() => {
    let currentFiltered = items;
    if (activeCategory && activeCategory !== 'All Items') {
      currentFiltered = currentFiltered.filter(item => item.itemType === activeCategory);
    }
    setFilteredItems(currentFiltered);
  }, [items, activeCategory]); // Re-filter whenever items or activeCategory changes


  const handleItemClick = (item) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedItem(null);
  };

  const handleEnquire = async () => {
    if (!selectedItem) return;

    try {
      // Use the actual sendEnquiry service for backend interaction
      await sendEnquiry(selectedItem._id);
      toast.success(`Enquiry sent successfully for: ${selectedItem.itemName}`);
      handleCloseModal();
    } catch (err) {
      console.error('Error sending enquiry:', err);
      toast.error(`Failed to send enquiry: ${err.message || 'Please try again.'}`);
    }
  };

  const handleSelectCategory = (category) => {
    setActiveCategory(category);
  };

  return (
    <div className="w-full min-h-screen bg-gray-100 openSans pt-24 px-6 mobile:px-4">
      <Navbar />
      <div>
        <FilterBar
          onSelectCategory={handleSelectCategory}
        />
        <main className="p-4 pt-0 mobile:px-0">
          <h2 className="text-3xl mobile:text-2xl font-bold text-gray-800 mb-6 mt-4 capitalize montserrat">
            {activeCategory ? activeCategory : 'All Items'}
          </h2>
          
          <div className="grid mobile:grid-cols-2 tablet:grid-cols-2 grid-cols-3 gap-6 mobile:gap-4">
            {filteredItems.map((item) => (
              <ItemCard key={item._id} item={item} onClick={handleItemClick} />
            ))}
          </div>
        </main>
      </div>

      {isModalOpen && selectedItem && (
        <ItemModal item={selectedItem} onClose={handleCloseModal} onEnquire={handleEnquire} />
      )}
    </div>
  );
};

export default ViewItems;