const API_BASE_URL = 'http://localhost:5000/api'; // Your backend API base URL

// Function to send an enquiry email
export const sendEnquiry = async (itemId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/enquire`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ itemId }), // Send the item ID to the backend
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to send enquiry');
    }
    const data = await response.json();
    return data; // Returns { success: true, message: 'Enquiry sent successfully!' }
  } catch (error) {
    console.error('Error in sendEnquiry:', error);
    throw error;
  }
};