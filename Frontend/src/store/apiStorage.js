import axios from "axios";

export const apiStorage = {
  getItem: async () => {
    const res = await axios.get(`http://localhost:5000/api/posts`);
    return res.data;
  },

  setItem: async (key, item) => {},
  removeItem: (key) => {},
};
