import axios from "axios";

export const apiStorage = {
  getItem: async (key) => {
    axios
      .get(`http://localhost:5000/api/posts`)
      .then((res) => {
        return res.data;
      })
      .catch((err) => {
        console.log(err);
      });
  },

  setItem: async (key, item) => {
    // axios
    //   .post(`http://localhost:5000/api/addpost`, key)
    //   .then((res) => {
    //     // console.log(res.data);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
  },
  removeItem: (key) => {},
};
