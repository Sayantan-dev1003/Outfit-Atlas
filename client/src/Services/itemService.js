const API_BASE_URL = 'http://localhost:5000/api'; // Your backend API base URL

// Function to fetch all items, optionally filtered by category
export const getAllItems = async (itemType = '') => {
  try {
    const url = itemType ? `${API_BASE_URL}/items?itemType=${itemType}` : `${API_BASE_URL}/items`;
    const response = await fetch(url);
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to fetch items');
    }
    const data = await response.json();
    return data.data; // Assuming your backend returns { success: true, data: [...] }
  } catch (error) {
    console.error('Error in getAllItems:', error);
    throw error; // Re-throw to be handled by the component
  }
};

// Function to add a new item
export const createItem = async (itemData) => {
  try {
    const formData = new FormData();
    // Append text fields
    for (const key in itemData) {
      if (key !== 'coverImage' && key !== 'additionalImages') {
        formData.append(key, itemData[key]);
      }
    }
    // Append files
    if (itemData.coverImage) {
      formData.append('coverImage', itemData.coverImage);
    }
    if (itemData.additionalImages && itemData.additionalImages.length > 0) {
      itemData.additionalImages.forEach((file) => {
        formData.append('additionalImages', file);
      });
    }

    const response = await fetch(`${API_BASE_URL}/items`, {
      method: 'POST',
      // No 'Content-Type' header needed for FormData; browser sets it automatically
      body: formData,
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to add item');
    }
    const data = await response.json();
    return data.data; // Return the newly created item data
  } catch (error) {
    console.error('Error in createItem:', error);
    throw error;
  }
};

// You can add more functions here for getting a single item, updating, deleting, etc.
export const getItemById = async (id) => {
  try {
    const response = await fetch(`${API_BASE_URL}/items/${id}`);
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to fetch item');
    }
    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error('Error in getItemById:', error);
    throw error;
  }
};