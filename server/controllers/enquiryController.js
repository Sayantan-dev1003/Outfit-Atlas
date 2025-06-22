const nodemailer = require('nodemailer');
const Item = require('../models/Item'); // To fetch item details if needed

// @desc    Send enquiry email
// @route   POST /api/enquire
// @access  Public
exports.sendEnquiryMail = async (req, res) => {
  const { itemId } = req.body; // Assuming the frontend sends itemId

  try {
    // Fetch item details from DB to include in the email
    const item = await Item.findById(itemId);

    if (!item) {
      return res.status(404).json({ success: false, error: 'Item not found for enquiry' });
    }

    // Create a Nodemailer transporter using SMTP (e.g., Gmail)
    const transporter = nodemailer.createTransport({
      service: 'gmail', // You can change this to 'smtp.sendgrid.net', 'smtp.mailgun.org', etc.
      auth: {
        user: process.env.EMAIL_USER, // Your email address from .env
        pass: process.env.EMAIL_PASS  // Your email password or app password from .env
      }
    });

    // Email content
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.ENQUIRY_RECEIVER_EMAIL, // Static receiver email from .env
      subject: `New Enquiry for Item: ${item.itemName}`,
      html: `
        <p>Dear Admin,</p>
        <p>A new enquiry has been received for the following item:</p>
        <ul>
          <li><strong>Item Name:</strong> ${item.itemName}</li>
          <li><strong>Item Type:</strong> ${item.itemType}</li>
          <li><strong>Item Brand:</strong> ${item.itemBrand}</li>
          <li><strong>Item Cost:</strong> $${item.itemCost}</li>
          <li><strong>Description:</strong> ${item.itemDescription}</li>
          <li><strong>Item ID:</strong> ${item._id}</li>
        </ul>
        <p>Please contact the enquirer for more details (if you implemented a way to capture their contact info).</p>
        <p>Regards,</p>
        <p>Outfit Atlas System</p>
      `
    };

    // Send email
    await transporter.sendMail(mailOptions);
    res.status(200).json({ success: true, message: 'Enquiry sent successfully!' });

  } catch (error) {
    console.error('Error sending enquiry email:', error);
    // Specific error handling for Nodemailer could be added here
    res.status(500).json({ success: false, error: 'Failed to send enquiry email. Check server logs.' });
  }
};