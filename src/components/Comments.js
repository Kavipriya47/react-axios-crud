import React, { useEffect, useState } from 'react';
import axios from 'axios';

// Mock REST API
const API_URL = process.env.REACT_APP_COMMENTS_API;

function Comments() {
  // State
  const [comments, setComments] = useState([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [body, setBody] = useState('');
  const [editId, setEditId] = useState(null);

  // READ comments
  useEffect(() => {
    axios
      .get(API_URL)
      .then(response => {
        setComments(response.data.slice(0, 5)); // limit to 5
      })
      .catch(error => {
        console.error('Error fetching comments:', error);
      });
  }, []);

  // CREATE comment
  const addComment = () => {
    if (!name.trim() || !email.trim() || !body.trim()) {
      alert('Please fill all fields');
      return;
    }

    axios
      .post(API_URL, { name, email, body })
      .then(() => {
        const newComment = {
          id: comments.length + 1, // mock id
          name,
          email,
          body,
        };
        setComments([...comments, newComment]);
        setName('');
        setEmail('');
        setBody('');
        alert('Comment added successfully!');
      })
      .catch(error => {
        console.error('Error adding comment:', error);
      });
  };

  // Start edit
  const startEdit = (comment) => {
    setEditId(comment.id);
    setName(comment.name);
    setEmail(comment.email);
    setBody(comment.body);
  };

  // UPDATE comment
  const updateComment = () => {
    if (!name.trim() || !email.trim() || !body.trim()) {
      alert('Please fill all fields');
      return;
    }

    axios
      .patch(`${API_URL}/${editId}`, {
        name,
        email,
        body,
      })
      .then(() => {
        const updatedComments = comments.map(comment =>
          comment.id === editId
            ? { ...comment, name, email, body }
            : comment
        );

        setComments(updatedComments);
        setEditId(null);
        setName('');
        setEmail('');
        setBody('');
        alert('Comment updated successfully!');
      })
      .catch(error => {
        console.error('Error updating comment:', error);
      });
  };

  // Cancel edit
  const cancelEdit = () => {
    setEditId(null);
    setName('');
    setEmail('');
    setBody('');
  };

  // DELETE comment
  const deleteComment = (comment) => {
    axios
      .delete(`${API_URL}/${comment.id}`)
      .then(() => {
        const filteredComments = comments.filter(c => c.id !== comment.id);
        setComments(filteredComments);
        alert('Comment deleted successfully!');
      })
      .catch(error => {
        console.error('Error deleting comment:', error);
      });
  };

  return (
    <div>
      <h3>Comments List</h3>

      <table className="table table-bordered">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Body</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {comments.map(comment => (
            <tr key={comment.id}>
              <td>{comment.id}</td>
              <td>{comment.name}</td>
              <td>{comment.email}</td>
              <td>{comment.body}</td>
              <td>
                <button
                  className="btn btn-warning me-2"
                  onClick={() => startEdit(comment)}
                >
                  Edit
                </button>
                <button
                  className="btn btn-danger"
                  onClick={() => deleteComment(comment)}
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
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </td>
            <td>
              <input
                className="form-control"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </td>
            <td>
              <input
                className="form-control"
                placeholder="Comment"
                value={body}
                onChange={(e) => setBody(e.target.value)}
              />
            </td>
            <td>
              {editId ? (
                <>
                  <button className="btn btn-warning me-2" onClick={updateComment}>
                    Update
                  </button>
                  <button className="btn btn-secondary" onClick={cancelEdit}>
                    Cancel
                  </button>
                </>
              ) : (
                <button className="btn btn-success" onClick={addComment}>
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

export default Comments;
