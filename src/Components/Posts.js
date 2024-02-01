import React, { useEffect, useState } from 'react';
import '../App.css';

const PostGrid = ({ userId }) => {

  const [posts, setPosts] = useState([]);

  useEffect(() => {

    const fetchData = async () => {
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts');
        const data = await response.json();
        setPosts(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);
  
  const userPosts = posts.filter(post => post.userId == userId);
  console.log('userId',userPosts);

  return (
    <div className="posts-list-wrapper">
      {userPosts.map((post, index) => (
        <div key={index} className='post-lists'>
          <div>
            <h2>{post.title}</h2>
            <p>{post.body}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PostGrid;