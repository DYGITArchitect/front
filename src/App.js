import React, { useEffect, useState } from "react";
import "../src/styles/App.css";
import PostFilter from "./components/PostFilter";
import PostForm from "./components/PostForm";
import PostList from "./components/PostList";
import MyButton from "./components/UI/button/MyButton";
import MyModal from "./components/UI/MyModal/MyModal";
import { usePosts } from "./hooks/usePost";
import donenv from "dotenv";
import PostService from "./components/API/PostService";
import Loader from "./components/UI/Loader/Loader";
import { useFatching } from "./hooks/useFatching";
import { getPageCount } from "./utils/pages";
import Pagination from "./components/UI/pagination/Pagination";

function App() {
  donenv.config();

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
  const [totalPages, setTotalPages] = useState(0);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const sortedAndSearchedPosts = usePosts(posts, filter.sort, filter.query);

  const [fetchPosts, isPostsLoading, postErrors] = useFatching(
    async (limit, page) => {
      const response = await PostService.getAll(limit, page);
      setPosts(response.data);
      const totalCount = response.headers["x-total-count"];
      setTotalPages(getPageCount(totalCount, limit));
    }
  );

  useEffect(() => {
    fetchPosts(limit, page);
  }, []); // If array is empty it means that callback will call once

  const createPost = (newPost) => {
    setPosts([...posts, newPost]);
    setModal(false);
  };

  const deletePost = (post) => {
    setPosts(posts.filter((p) => p.id !== post.id));
  };

  const changePage = (page) => {
    setPage(page);
    fetchPosts(limit, page);
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

      {postErrors && <h1>Exception: ${postErrors}</h1>}
      {isPostsLoading ? (
        <div
          style={{ display: "flex", justifyContent: "center", marginTop: 50 }}
        >
          <Loader />
        </div>
      ) : (
        <PostList
          remove={deletePost}
          posts={sortedAndSearchedPosts}
          title={"List of POSTS"}
        />
      )}

      <Pagination page={page} totalPages={totalPages} changePage={changePage} />

      {/* </React.StrictMode> */}
    </div>
  );
}

export default App;
