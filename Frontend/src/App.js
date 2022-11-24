import PostsList from "./features/posts/PostsList";
import AddPostForm from "./features/posts/AddPostForm";

function App() {
  return (
    <main className="App">
      <AddPostForm></AddPostForm>
      <PostsList></PostsList>
    </main>
  );
}

export default App;
