import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import url from "../../config/serverUrl";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
const AllBlogs = ({ setIsAuthenticated }) => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [newComment, setNewComment] = useState("");
  const [commentingBlogId, setCommentingBlogId] = useState(null);
  const [currentUserId, setCurrentUserId] = useState(null);

  useEffect(() => {
    fetchBlogs();
  }, []);
  const navigate = useNavigate();

  const getCurrentUserId = () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setIsAuthenticated(false);
      navigate("/login");
    }

    const tokenParts = token.split(".");
    if (tokenParts.length !== 3) {
      console.error("Invalid token format");
      return null;
    }

    const payload = atob(tokenParts[1]);
    const parsedPayload = JSON.parse(payload);
    const userId = parsedPayload.id;
    return userId;
  };

  // Now you can use this function to set the current userId
  useEffect(() => {
    const userId = getCurrentUserId();
    setCurrentUserId(userId);
  }, []);

  const fetchBlogs = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${url}getAllBlogs`);
      setBlogs(response.data.data.blogs);
    } catch (error) {
      console.error("Error fetching blogs:", error);
    } finally {
      setLoading(false);
    }
  };

  // Handle new comment submission
  const handleCommentSubmit = async (blogId) => {
    if (!newComment) return;
    try {
      const token = localStorage.getItem("token");
      const headers = { Authorization: `Bearer ${token}` };

      const submitComment = await axios.post(
        `${url}addComment/${blogId}`,
        { content: newComment },
        { headers }
      );
      if (submitComment.data.status === "Success") {
        toast.success(submitComment.data.message);
        setNewComment("");
        fetchBlogs();
        setCommentingBlogId(null);
      }
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };

  const handleDeleteComment = async (blogId, commentId) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setIsAuthenticated(false);
        navigate("/login");
      }
      const headers = { Authorization: `Bearer ${token}` };

      const response = await axios.delete(
        `${url}deleteComment/${blogId}/${commentId}`,
        { headers }
      );
      if (response.data.status === "Success") {
        toast.success(response.data.message);
        fetchBlogs();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error("Error deleting comment:", error);
      toast.error("Failed to delete comment");
    }
  };

  return (
    <div
      className="blog-manager mt-5"
      style={{ width: "100%", padding: "20px" }}
    >
      <h1 style={{ textAlign: "center", marginBottom: "30px" }}>
        Blog Manager
      </h1>

      {loading ? (
        <p className="loading-indicator" style={{ textAlign: "center" }}>
          Loading blogs...
        </p>
      ) : blogs.length === 0 ? (
        <p style={{ textAlign: "center", color: "#777" }}>
          No Blogs To Display
        </p>
      ) : (
        <div className="blog-cards-container" style={{ width: "100%" }}>
          {blogs.map((blog) => (
            <div
              key={blog._id}
              className="blog-card"
              style={{
                marginBottom: "20px",
                border: "1px solid #ccc",
                padding: "15px",
                borderRadius: "8px",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                backgroundColor: "#fff",
              }}
            >
              <h2
                style={{ margin: "0 0 10px", fontSize: "1.5em", color: "#333" }}
              >
                Title: {blog.title}
              </h2>
              <p style={{ fontSize: "1em", color: "#555" }}>
                Content: {blog.content}
              </p>
              <p style={{ fontStyle: "italic", color: "#777" }}>
                <strong>Author:</strong> {blog?.author?.username}
              </p>

              <h4 style={{ margin: "10px 0", color: "#333" }}>Comments:</h4>
              <ul style={{ listStyleType: "none", padding: "0" }}>
                {blog.comments.map((comment) => (
                  <li
                    key={comment._id}
                    style={{
                      marginBottom: "5px",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <strong style={{ color: "#007BFF" }}>
                      {comment?.commentAuthor?.username}:
                    </strong>
                    <span style={{ color: "#555", marginLeft: "5px" }}>
                      {comment?.commentText}
                    </span>
                    {/* Conditionally render delete button if current user is the comment author */}
                    {comment?.commentAuthor?._id === currentUserId && (
                      <button
                        onClick={() =>
                          handleDeleteComment(blog._id, comment._id)
                        }
                        style={{
                          marginLeft: "10px",
                          background: "none",
                          border: "none",
                          cursor: "pointer",
                          color: "red",
                        }}
                      >
                        <FontAwesomeIcon icon={faTrash} />
                      </button>
                    )}
                  </li>
                ))}
              </ul>

              {/* Button to toggle comment input */}
              <button
                onClick={() =>
                  setCommentingBlogId(
                    commentingBlogId === blog._id ? null : blog._id
                  )
                }
                style={{
                  padding: "10px 15px",
                  marginTop: "10px",
                  backgroundColor: "#007BFF",
                  color: "#fff",
                  border: "none",
                  borderRadius: "5px",
                  cursor: "pointer",
                  transition: "background-color 0.3s",
                }}
                onMouseOver={(e) =>
                  (e.currentTarget.style.backgroundColor = "#0056b3")
                }
                onMouseOut={(e) =>
                  (e.currentTarget.style.backgroundColor = "#007BFF")
                }
              >
                {commentingBlogId === blog._id ? "Cancel Comment" : "Comment"}
              </button>

              {commentingBlogId === blog._id && (
                <div
                  style={{
                    marginTop: "10px",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <input
                    type="text"
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="Add a comment..."
                    style={{
                      padding: "10px",
                      width: "calc(100% - 22px)",
                      border: "1px solid #ccc",
                      borderRadius: "5px",
                      marginBottom: "10px",
                    }}
                  />
                  <button
                    onClick={() => handleCommentSubmit(blog._id)}
                    style={{
                      padding: "10px 15px",
                      backgroundColor: "#28a745",
                      color: "#fff",
                      border: "none",
                      borderRadius: "5px",
                      cursor: "pointer",
                      transition: "background-color 0.3s",
                      width: "100%",
                      maxWidth: "200px",
                    }}
                    onMouseOver={(e) =>
                      (e.currentTarget.style.backgroundColor = "#218838")
                    }
                    onMouseOut={(e) =>
                      (e.currentTarget.style.backgroundColor = "#28a745")
                    }
                  >
                    Submit Comment
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AllBlogs;
