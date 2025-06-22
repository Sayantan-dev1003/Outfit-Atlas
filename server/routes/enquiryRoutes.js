const express = require('express');
const router = express.Router();
const enquiryController = require('../controllers/enquiryController');

// POST request to send an enquiry email
router.post('/', enquiryController.sendEnquiryMail);

module.exports = router;