import React, { useState } from "react";
import Post from "./Post";
import "./App.css";
import { useQuery } from "react-query";
import queryClient from "./react-query-client";

const fetcher = (url) => fetch(url).then((res) => res.json());

function App() {
  const [postID, setPostID] = useState(null);

  const { isLoading, data: posts } = useQuery(["posts"], () =>
    fetcher("https://jsonplaceholder.typicode.com/posts")
  );

  if (isLoading) return <h1>Loading...</h1>;

  if (postID !== null) {
    return <Post postID={postID} goBack={() => setPostID(null)} />;
  }

  function mutateTitle(id) {
    queryClient.setQueryData(["post", id], (oldData) => {
      if (oldData) {
        return {
          ...oldData,
          title: "boom boom mutated",
        };
      }
    });
  }

  return (
    <div className="App">
      {posts.map((post) => {
        const cachedPost = queryClient.getQueryData(["post", post.id]);
        return (
          <p key={post.id}>
            <a onClick={() => setPostID(post.id)} href="#">
              {post.id} - {post.title} {cachedPost ? "(visited)" : ""}
            </a>
            <button onClick={() => mutateTitle(post.id)}>
              Mutate the title
            </button>
          </p>
        );
      })}
    </div>
  );
}

export default App;
