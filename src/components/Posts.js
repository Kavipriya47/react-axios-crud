import React, { useEffect, useState } from 'react';
import axios from 'axios';

// Mock REST API
const API_URL = process.env.REACT_APP_POSTS_API;

function Posts() {
  // State
  const [posts, setPosts] = useState([]);
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [editId, setEditId] = useState(null);

  // Fetch posts (READ)
  useEffect(() => {
    axios
      .get(API_URL)
      .then(response => {
        setPosts(response.data.slice(0, 5)); // limit to 5 posts
      })
      .catch(error => {
        console.error('Error fetching posts:', error);
      });
  }, []);

  // ADD post (CREATE)
  const addPost = () => {
    if (!title.trim() || !body.trim()) {
      alert('Please enter both title and body.');
      return;
    }

    axios
      .post(API_URL, { title, body })
      .then(() => {
        const newPost = {
          id: posts.length + 1, // mock id
          title,
          body,
        };
        setPosts([...posts, newPost]);
        setTitle('');
        setBody('');
        alert('Post added successfully!');
      })
      .catch(error => {
        console.error('Error adding post:', error);
      });
  };

  // Start edit
  const startEdit = (post) => {
    setEditId(post.id);
    setTitle(post.title);
    setBody(post.body);
  };

  // UPDATE post (PATCH)
  const updatePost = () => {
    if (!title.trim() || !body.trim()) {
      alert('Please enter both title and body.');
      return;
    }

    axios
      .patch(`${API_URL}/${editId}`, {
        title,
        body,
      })
      .then(() => {
        const updatedPosts = posts.map(post =>
          post.id === editId
            ? { ...post, title, body }
            : post
        );

        setPosts(updatedPosts);
        setEditId(null);
        setTitle('');
        setBody('');
        alert('Post updated successfully!');
      })
      .catch(error => {
        console.error('Error updating post:', error);
      });
  };

  // Cancel edit
  const cancelEdit = () => {
    setEditId(null);
    setTitle('');
    setBody('');
  };

  // DELETE post
  const deletePost = (post) => {
    axios
      .delete(`${API_URL}/${post.id}`)
      .then(() => {
        const filteredPosts = posts.filter(p => p.id !== post.id);
        setPosts(filteredPosts);
        alert('Post deleted successfully!');
      })
      .catch(error => {
        console.error('Error deleting post:', error);
      });
  };

  return (
    <div>
      <h3>Post List</h3>

      <table className="table table-bordered">
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Body</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {posts.map(post => (
            <tr key={post.id}>
              <td>{post.id}</td>
              <td>{post.title}</td>
              <td>{post.body}</td>
              <td>
                <button
                  className="btn btn-warning me-2"
                  onClick={() => startEdit(post)}
                >
                  Edit
                </button>
                <button
                  className="btn btn-danger"
                  onClick={() => deletePost(post)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>

        <tfoot>
          <tr>
            <td></td>
            <td>
              <input
                className="form-control"
                type="text"
                placeholder="Enter Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </td>
            <td>
              <input
                className="form-control"
                type="text"
                placeholder="Enter Body"
                value={body}
                onChange={(e) => setBody(e.target.value)}
              />
            </td>
            <td>
              {editId ? (
                <>
                  <button
                    className="btn btn-warning me-2"
                    onClick={updatePost}
                  >
                    Update
                  </button>
                  <button
                    className="btn btn-secondary"
                    onClick={cancelEdit}
                  >
                    Cancel
                  </button>
                </>
              ) : (
                <button
                  className="btn btn-success"
                  onClick={addPost}
                >
                  Add
                </button>
              )}
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
}

export default Posts;
