import React, { useEffect, useState } from "react";
import './Feed.css'
import Post from "./Post/Post";
import TweetBox from './TweetBox/TweetBox'

const Feed = () => {

  const [posts, setPosts] = useState([]);

  useEffect(() => {

    fetch('http://localhost:5000/post')
      .then(res => res.json())
      .then(data => {
        setPosts(data);
      })
  }, [posts])


  return (
    <div className="feed">
      <div className="feed__header">
        <h2>Home</h2>
      </div>
      <TweetBox />
      {
        posts.map(p => <Post key={p._id} p={p} />)
      }
    </div>
  )
}

export default Feed
