// Utility functions for managing form data using localStorage

export const saveManagerFormData = async (key: string, val: boolean | object | string) => {
    try {
        localStorage.setItem(key, JSON.stringify(val));

    } catch (error) {
      console.error(`Error saving data to localStorage for key ${key}:`, error);
    }
  };
  
  export const loadManagerFormData = async (key: string) => {
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
  
  export const appendManagerFormData = async (key: string, val: object) => {
    try {
      const existingFormData = (await loadManagerFormData(key)) || {}; // Load existing data or initialize an empty object
      const updatedFormData = { ...existingFormData, ...val }; // Merge existing data with new data
      await saveManagerFormData(key, updatedFormData);
      return updatedFormData;
    } catch (error) {
      console.error(`Error appending data to localStorage for key ${key}:`, error);
      return null;
    }
  };
  
  export const deleteManagerFormData = async (key: string) => {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error(`Error deleting data from localStorage for key ${key}:`, error);
    }
  };
  
  /**
   *  Remove all keys except needed ones
   * */
  export const clearLocalStorage = async () => {
    const keepKeys = ['onBoarded'];
    try {
      const allKeys = Object.keys(localStorage);
      const keysToDelete = allKeys.filter(key => !keepKeys.includes(key));
      keysToDelete.forEach(key => localStorage.removeItem(key));
    } catch (error) {
      console.error("Error clearing localStorage:", error);
    }
  };
  
