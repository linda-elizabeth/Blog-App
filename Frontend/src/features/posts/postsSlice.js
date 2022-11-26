import { createSlice } from "@reduxjs/toolkit";
import { nanoid } from "@reduxjs/toolkit";
import { sub } from "date-fns";
import axios from "axios";

const initialState = [
  {
    _id: "",
    title: "",
    content: "",
    authorID: "",
    date: sub(new Date(), { minutes: 10 }).toISOString(),
    reactions: {
      thumbsup: 0,
      wow: 0,
      heart: 0,
      rocket: 0,
      coffee: 0,
    },
  },
];
const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    updatePostList: {
      reducer(state, action) {
        action.payload.forEach((post) => {
          state.push(post);
        });
      },
    },
    postAdded: {
      reducer(state, action) {
        const postdata = JSON.stringify(action.payload);
        axios
          .post(`http://localhost:5000/api/addpost`, postdata, {
            headers: {
              "Content-Type": "application/json; charset=UTF-8",
              "Access-Control-Allow-Origin": "*",
            },
          })
          .then((res) => {
            // state.push(action.payload);
            window.alert(res.data);
          });
      },
      prepare(title, content, userid) {
        return {
          payload: {
            _id: nanoid(),
            title,
            content,
            date: new Date().toISOString(),
            userid,
            reactions: {
              thumbsup: 0,
              wow: 0,
              heart: 0,
              rocket: 0,
              coffee: 0,
            },
          },
        };
      },
    },
    reactionAdded(state, action) {
      const { postid, reaction } = action.payload;
      const existingPost = state.find((post) => post._id === postid);
      if (existingPost) {
        axios
          .post(
            `http://localhost:5000/api/addreaction`,
            { postid, reaction },
            {
              headers: {
                "Content-Type": "application/json; charset=UTF-8",
                "Access-Control-Allow-Origin": "*",
              },
            }
          )
          .then((res) => {
            // existingPost.reactions[reaction]++;
            console.log(res.data);
          })
          .catch((err) => console.log(err));
      }
    },
  },
});

export const selectAllPosts = (state) => state.posts;
export const { updatePostList, postAdded, reactionAdded } = postsSlice.actions;
export default postsSlice.reducer;
