import { useQuery } from "react-query";
import { getPosts, Post } from "./api/post";
import { usePagination } from "./hooks/usePagination";

import { Posts } from "./components/Posts";
import { Pagination } from "./components/Pagination";

function App() {
  const {
    data: posts,
    isLoading,
    isError,
    error,
  } = useQuery<Post[], Error>("posts", getPosts);
  const { currentItems, itemsPerPage, paginate } = usePagination<Post[]>(
    posts ?? []
  );

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError || !posts) {
    return <div>{error?.message}</div>;
  }

  return (
    <div className="App">
      <Posts posts={currentItems} />
      <Pagination
        postsPerPage={itemsPerPage}
        totalPosts={posts.length}
        paginate={paginate}
      />
    </div>
  );
}

export default App;
