import React, { useState } from 'react';
import './styles.css'; // Importing the CSS file

const PostList = ({ posts, editPost, deletePost }) => {
  const [isEditing, setIsEditing] = useState(null);
  const [newTitle, setNewTitle] = useState('');
  const [newContent, setNewContent] = useState('');

  const handleEdit = (post) => {
    setIsEditing(post.id);
    setNewTitle(post.title);
    setNewContent(post.content);
  };

  const handleSave = (id) => {
    if (newTitle && newContent) {
      editPost(id, newTitle, newContent);
      setIsEditing(null); // Close editing mode
      setNewTitle('');
      setNewContent('');
    } else {
      alert("Both title and content are required.");
    }
  };

  return (
    <div className="post-list">
      {posts.map((post) => (
        <div key={post.id} className="post">
          {isEditing === post.id ? (
            <div className="edit-mode">
              <input
                type="text"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                className="edit-input"
              />
              <textarea
                value={newContent}
                onChange={(e) => setNewContent(e.target.value)}
                className="edit-textarea"
              ></textarea>
              <button className="save-btn" onClick={() => handleSave(post.id)}>Save</button>
              <button className="cancel-btn" onClick={() => setIsEditing(null)}>Cancel</button>
            </div>
          ) : (
            <div className="view-mode">
              <h2>{post.title}</h2>
              <p>{post.content}</p>
              <p className="date">Posted on: {post.createdAt}</p>
              <button className="edit-btn" onClick={() => handleEdit(post)}>Edit</button>
              <button className="delete-btn" onClick={() => deletePost(post.id)}>Delete</button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default PostList;
