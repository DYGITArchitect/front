import React, { useState } from "react";
import "../src/styles/App.css";
import PostFilter from "./components/PostFilter";
import PostForm from "./components/PostForm";
import PostList from "./components/PostList";
import MyButton from "./components/UI/button/MyButton";
import MyModal from "./components/UI/MyModal/MyModal";
import { usePosts } from "./hooks/usePost";

function App() {
  const [posts, setPosts] = useState([
    // {
    //   id: 1,
    //   title: "Title of the post",
    //   body: "Description of the post",
    // },
    // {
    //   id: 2,
    //   title: "Title of the post 2",
    //   body: "Description of the post",
    // },
    // {
    //   id: 3,
    //   title: "Title of the post 3",
    //   body: "Description of the post",
    // },
  ]);

  const [filter, setFilter] = useState({ sort: "", query: "" });
  const [modal, setModal] = useState(false);

  const sortedAndSearchedPosts = usePosts(posts, filter.sort, filter.query);

  const createPost = (newPost) => {
    setPosts([...posts, newPost]);
    setModal(false);
  };

  const deletePost = (post) => {
    setPosts(posts.filter((p) => p.id !== post.id));
  };

  return (
    <div className="App">
      {/* <React.StrictMode> */}
      <MyButton style={{ marginTop: 30 }} onClick={() => setModal(true)}>
        Add post
      </MyButton>
      <MyModal visible={modal} setVisible={setModal}>
        <PostForm create={createPost} />
      </MyModal>

      <hr style={{ margin: "15px 0" }} />
      <PostFilter filter={filter} setFilter={setFilter} />

      <PostList
        remove={deletePost}
        posts={sortedAndSearchedPosts}
        title={"List of POSTS"}
      />

      {/* </React.StrictMode> */}
    </div>
  );
}

export default App;
