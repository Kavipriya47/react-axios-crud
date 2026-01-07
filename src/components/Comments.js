import React, { useEffect, useState } from 'react';
import axios from 'axios';

const API_URL = process.env.REACT_APP_COMMENTS_API;

function Comments() {
  const [comments, setComments] = useState([]);
//  UseEffect to fetch comments (READ) after component mounts
  useEffect(() => {
    axios
      .get(API_URL)
      .then(response => {
        setComments(response.data.slice(0, 5));
      })
      .catch(error => {
        console.error('Error fetching comments:', error);
      });
  }, []);

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
          </tr>
        </thead>

        <tbody>
          {comments.map(comment => (
            <tr key={comment.id}>
              <td>{comment.id}</td>
              <td>{comment.name}</td>
              <td>{comment.email}</td>
              <td>{comment.body}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Comments;
