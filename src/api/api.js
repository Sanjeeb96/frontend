import axios from "axios";

const BASE_URL = "https://backend-46xi.onrender.com/api";

export const fetchBalance = async () => {
  try {
    const { data } = await axios.get(`${BASE_URL}/getBalance`);
    return data;
  } catch (error) {
    console.error(
      "Error fetching balance:",
      error.response?.data || error.message
    );
    throw error;
  }
};

export const addEntry = async (entry) => {
  try {
    await axios.post(`${BASE_URL}/addEntry`, entry);
  } catch (error) {
    console.error("Error adding entry:", error.response?.data || error.message);
    throw error;
  }
};

export const deleteEntry = async (id) => {
  try {
    await axios.delete(`${BASE_URL}/deleteEntry/${id}`);
  } catch (error) {
    console.error(
      "Error deleting entry:",
      error.response?.data || error.message
    );
    throw error;
  }
};
