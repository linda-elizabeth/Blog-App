import { createSlice } from "@reduxjs/toolkit";
import { nanoid } from "@reduxjs/toolkit";
import { sub } from "date-fns";
import axios from "axios";

// const initialState = store.getState();
const initialState = [
  {
    id: nanoid(),
    title: "learning redux",
    content: "learning redux is fun",
    date: sub(new Date(), { minutes: 10 }).toISOString(),
    reactions: {
      thumbsUp: 0,
      wow: 0,
      heart: 0,
      rocket: 0,
      coffee: 0,
    },
  },
  {
    id: nanoid(),
    title: "learning redux2",
    content: "learning redux is long",
    date: sub(new Date(), { minutes: 10 }).toISOString(),
    reactions: {
      thumbsUp: 0,
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
            console.log(res.data);
          });
      },
      prepare(title, content, userid) {
        return {
          payload: {
            id: nanoid(),
            title,
            content,
            date: new Date().toISOString(),
            userid,
            reactions: {
              thumbsUp: 0,
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
      const existingPost = state.find((post) => post.id === postid);
      if (existingPost) {
        existingPost.reactions[reaction]++;
      }
    },
  },
});

export const selectAllPosts = (state) => state.posts;
export const { postAdded, reactionAdded } = postsSlice.actions;
export default postsSlice.reducer;
