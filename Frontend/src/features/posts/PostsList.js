// component
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { selectAllPosts } from "./postsSlice";
import PostAuthor from "./PostAuthor";
import TimeAgo from "./TimeAgo";
import ReactionButtons from "./ReactionButtons";

const PostsList = () => {
  const posts = useSelector(selectAllPosts);
  const orderedPosts = posts
    .slice()
    .sort((a, b) => b.date.localeCompare(a.date));

  const renderedPosts = orderedPosts.map((post) => (
    <article key={post.id}>
      <h3>{post.title}</h3>
      <p>{post.content.substring(0, 100)}</p>
      <p className="postCredit">
        <PostAuthor userid={post.userid}></PostAuthor>
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
