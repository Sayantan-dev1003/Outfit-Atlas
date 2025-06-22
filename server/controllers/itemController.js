const Item = require('../models/Item');
const path = require('path');

// @desc    Get all items
// @route   GET /api/items
// @access  Public
exports.getAllItems = async (req, res) => {
  try {
    const query = {};
    if (req.query.itemType && req.query.itemType !== 'All Items') {
      query.itemType = req.query.itemType;
    }

    const items = await Item.find(query).sort({ createdAt: -1 });
    res.status(200).json({ success: true, count: items.length, data: items });
  } catch (error) {
    console.error('Error fetching items:', error);
    res.status(500).json({ success: false, error: 'Server Error' });
  }
};

// @desc    Create a new item
// @route   POST /api/items
// @access  Public
exports.createItem = async (req, res) => {
  try {
    const { itemName, itemType, itemDescription, itemBrand, itemCost } = req.body;

    if (!req.files || !req.files['coverImage'] || req.files['coverImage'].length === 0) {
      return res.status(400).json({ success: false, error: 'Cover image is required' });
    }

    const coverImagePath = `${req.files['coverImage'][0].filename}`;
    const additionalImagePaths = req.files['additionalImages']
      ? req.files['additionalImages'].map(file => `${file.filename}`)
      : [];

    const newItem = await Item.create({
      itemName,
      itemType,
      itemDescription,
      itemBrand,
      itemCost,
      coverImage: coverImagePath,
      additionalImages: additionalImagePaths,
    });

    res.status(201).json({ success: true, data: newItem });
  } catch (error) {
    console.error('Error creating item:', error);
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(val => val.message);
      return res.status(400).json({ success: false, error: messages });
    }
    res.status(500).json({ success: false, error: 'Server Error' });
  }
};

// @desc    Get single item by ID
// @route   GET /api/items/:id
// @access  Public
exports.getItemById = async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);
    if (!item) {
      return res.status(404).json({ success: false, error: 'Item not found' });
    }
    res.status(200).json({ success: true, data: item });
  } catch (error) {
    console.error('Error fetching single item:', error);
    res.status(500).json({ success: false, error: 'Server Error' });
  }
};