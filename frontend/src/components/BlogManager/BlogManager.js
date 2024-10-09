import React, { useState, useEffect } from "react";
import axios from "axios";
import BlogCard from "./BlogCard";
import "./BlogManager.css";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import url from "../../config/serverUrl";
const BlogManager = ({ setIsAuthenticated }) => {
  const initialFormFields = {
    title: "",
    content: "",
  };
  const navigate = useNavigate();
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [formFields, setFormFields] = useState(initialFormFields);

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setIsAuthenticated(false);
        navigate("/login");
      }
      const headers = {
        Authorization: `Bearer ${token}`,
      };

      const response = await axios.get(`${url}getBlogsAgainstUser`, {
        headers,
      });

      if (response.data.status === "Success" && response.data.data.posts) {
        setBlogs(response.data.data.posts);
      } else {
        console.log("No blogs found. Setting blogs to empty.");
        setBlogs([]);
      }
    } catch (error) {
      console.error("Error fetching blogs:", error);
      setBlogs([]);
    } finally {
      setLoading(false);
    }
  };

  const createBlog = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("User is not authenticated!");
        setIsAuthenticated(false);
        navigate("/login");
      }

      const response = await axios.post(
        `${url}createBlog`,
        { title: formFields.title, content: formFields.content },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.data.status === "Success") {
        setFormFields(initialFormFields);
        fetchBlogs();
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error("Error creating blog:", error);
      alert("Error creating blog");
    }
  };

  const updateBlog = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("User is not authenticated!");
        setIsAuthenticated(false);
        navigate("/login");
        return;
      }

      const response = await axios.put(
        `${url}updateBlog/${formFields.editingId}`,
        { title: formFields.title, content: formFields.content },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.data.status === "Success") {
        setFormFields(initialFormFields); // Reset form fields
        fetchBlogs();
        toast.success(response.data.message);
      } else {
        toast.error(response.data.status);
      }
    } catch (error) {
      console.error("Error updating blog:", error);
      alert("Error updating blog");
    }
  };

  const deleteBlog = async (id) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("User is not authenticated!");
        setIsAuthenticated(false);
        navigate("/login");
      }

      const response = await axios.delete(`${url}deleteBlog/${id}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.data.status === "Success") {
        fetchBlogs();
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error("Error deleting blog:", error);
      alert("Error deleting blog");
    }
  };

  const editBlog = (blog) => {
    setFormFields({
      title: blog.title,
      content: blog.content,
      editingId: blog._id,
    });
  };

  const handleSubmit = () => {
    if (formFields.editingId) {
      updateBlog();
    } else {
      createBlog();
    }
  };

  return (
    <>
      <div className="blog-manager mt-5">
        <h1>Blog Manager</h1>

        <div className="blog-form">
          <input
            type="text"
            placeholder="Title"
            value={formFields.title} // Bind formFields.title
            onChange={(e) =>
              setFormFields({ ...formFields, title: e.target.value })
            }
          />
          <textarea
            placeholder="Content"
            value={formFields.content} // Bind formFields.content
            onChange={(e) =>
              setFormFields({ ...formFields, content: e.target.value })
            }
          />
          <button onClick={handleSubmit}>
            {formFields.editingId ? "Update Blog" : "Create Blog"}
          </button>
        </div>
      </div>

      <div className="container">
        {loading ? (
          <p className="loading-indicator">Loading blogs...</p>
        ) : (
          <div className="row">
            {blogs.map((blog) => (
              <div key={blog._id} className="col-md-6 mb-4">
                <BlogCard
                  title={blog.title}
                  content={blog.content}
                  author={blog.author}
                  onEdit={() => editBlog(blog)}
                  onDelete={() => deleteBlog(blog._id)}
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default BlogManager;
