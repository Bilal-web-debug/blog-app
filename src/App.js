import React, { useState } from 'react';
import PostList from './PostList';
import './styles.css';

function App() {
  const [posts, setPosts] = useState([]);
  const [newTitle, setNewTitle] = useState('');
  const [newContent, setNewContent] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 5; // Define how many posts per page

  // Function to add a new post
  const addPost = () => {
    if (newTitle && newContent) {
      const newPost = {
        id: Date.now(),
        title: newTitle,
        content: newContent,
        createdAt: new Date().toLocaleString(), // Current date and time
      };
      setPosts([...posts, newPost]);
      setNewTitle('');
      setNewContent('');
    } else {
      alert("Both title and content are required.");
    }
  };
  

  // Function to edit a post
  const editPost = (id, updatedTitle, updatedContent) => {
    const updatedPosts = posts.map((post) =>
      post.id === id ? { ...post, title: updatedTitle, content: updatedContent } : post
    );
    setPosts(updatedPosts);
  };

  // Function to delete a post
  const deletePost = (id) => {
    const updatedPosts = posts.filter((post) => post.id !== id);
    setPosts(updatedPosts);
  };

  // Get the current posts to display based on pagination
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  // Handle page change
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="App">
      <h1>My Blogging App</h1>

      {/* Form to Add New Post */}
      <div className="add-post-form">
        <input
          type="text"
          placeholder="Title"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
        />
        <textarea
          placeholder="Content"
          value={newContent}
          onChange={(e) => setNewContent(e.target.value)}
        ></textarea>
        <button onClick={addPost}>Add Post</button>
      </div>

      {/* Display Posts */}
      <PostList posts={currentPosts} editPost={editPost} deletePost={deletePost} />

      {/* Pagination */}
      <div className="pagination">
        {[...Array(Math.ceil(posts.length / postsPerPage))].map((_, index) => (
          <button key={index + 1} onClick={() => paginate(index + 1)}>
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
}

export default App;
