// component
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { selectAllPosts, updatePostList } from "./postsSlice";
import PostAuthor from "./PostAuthor";
import TimeAgo from "./TimeAgo";
import ReactionButtons from "./ReactionButtons";
import { apiStorage } from "../../store/apiStorage";

const PostsList = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    apiStorage
      .getItem()
      .then((res) => {
        dispatch(updatePostList(res));
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const posts = useSelector(selectAllPosts);
  const orderedPosts = posts
    .slice()
    .sort((a, b) => b.date.localeCompare(a.date));

  const renderedPosts = orderedPosts
    .filter(function (post) {
      if (post._id == "") {
        return false;
      }
      return true;
    })
    .map((post) => (
      <article key={post._id}>
        <h3>{post.title}</h3>
        <p>{post.content}</p>
        <p className="postCredit">
          <PostAuthor userid={post.authorID}></PostAuthor>
          <TimeAgo timestamp={post.date}></TimeAgo>
        </p>
        <ReactionButtons post={post}></ReactionButtons>
      </article>
    ));
  return (
    <section>
      <h2>{renderedPosts}</h2>
    </section>
  );
};

export default PostsList;
