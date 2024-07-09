// Utility functions for managing form data using localStorage

export const saveFormData = async (key: string, val: boolean | object | string) => {
    try {
        localStorage.setItem(key, JSON.stringify(val));

    } catch (error) {
      console.error(`Error saving data to localStorage for key ${key}:`, error);
    }
  };
  
  export const loadFormData = async (key: string) => {
    try {
      const storedFormData = localStorage.getItem(key);
      if (storedFormData !== null) {
        const parsedFormData = JSON.parse(storedFormData);
        return parsedFormData;
      }
      return null;
    } catch (error) {
      console.error(`Error loading data from localStorage for key ${key}:`, error);
      return null;
    }
  };
  
  export const appendFormData = async (key: string, val: object) => {
    try {
      const existingFormData = (await loadFormData(key)) || {}; // Load existing data or initialize an empty object
      const updatedFormData = { ...existingFormData, ...val }; // Merge existing data with new data
      await saveFormData(key, updatedFormData);
      return updatedFormData;
    } catch (error) {
      console.error(`Error appending data to localStorage for key ${key}:`, error);
      return null;
    }
  };
  
  export const deleteFormData = async (key: string) => {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error(`Error deleting data from localStorage for key ${key}:`, error);
    }
  };
  
  /**
   *  Remove all keys except needed ones
   * */
 // utils/localStorage.js
export const clearAllLocalStorage = async() => {
  try {
    localStorage.clear();
    console.log('logout succesfully');
  } catch (error) {
    console.error("Error clearing localStorage:", error);
  }
};

