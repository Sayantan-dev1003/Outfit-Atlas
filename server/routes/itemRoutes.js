const express = require('express');
const router = express.Router();
const itemController = require('../controllers/itemController');
const upload = require('../middleware/upload'); // Multer middleware

// GET all items (with optional filtering by itemType)
router.get('/', itemController.getAllItems);

// POST a new item (with image uploads)
router.post('/', upload, itemController.createItem);

// GET a single item by ID
router.get('/:id', itemController.getItemById);

module.exports = router;