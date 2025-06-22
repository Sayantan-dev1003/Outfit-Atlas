const mongoose = require('mongoose');

const ItemSchema = new mongoose.Schema({
    itemName: {
        type: String,
        required: [true, 'Item name is required'],
        trim: true,
        maxlength: [100, 'Item name cannot be more than 100 characters']
    },
    itemType: {
        type: String,
        required: [true, 'Item type is required'],
        enum: {
            values: ['T-shirt', 'Shirt', 'Pant', 'Jeans', 'Shoes', 'Sports', 'Watch', 'Accessories'],
            message: 'Invalid item type'
        }
    },
    itemDescription: {
        type: String,
        required: [true, 'Item description is required'],
        maxlength: [500, 'Item description cannot be more than 500 characters']
    },
    itemBrand: {
        type: String,
        required: [true, 'Item brand is required'],
        trim: true,
        maxlength: [50, 'Item brand cannot be more than 50 characters']
    },
    itemCost: {
        type: Number,
        required: [true, 'Item cost is required'],
        min: [0, 'Item cost cannot be negative']
    },
    coverImage: {
        type: String,
        required: [true, 'Cover image is required']
    },
    additionalImages: [{
        type: String
    }],
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

// Pre-save hook to update `updatedAt` field
ItemSchema.pre('save', function(next) {
    this.updatedAt = Date.now();
    next();
});

module.exports = mongoose.model('Item', ItemSchema); 