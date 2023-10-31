import React, { useState } from "react";
import Post from "./Post";
import "./App.css";
import { useQuery } from "react-query";

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

  return (
    <div className="App">
      {posts.map((post) => {
        return (
          <p key={post.id}>
            <a onClick={() => setPostID(post.id)} href="#">
              {post.id} - {post.title}
            </a>
          </p>
        );
      })}
    </div>
  );
}

export default App;
