import React, { useState } from "react";

const BlogCard = ({ title, content, author, onEdit, onDelete }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const CONTENT_LIMIT = 100;

  const toggleExpand = () => {
    setIsExpanded((prevState) => !prevState);
  };

  const isContentTooLong = content && content.length > CONTENT_LIMIT;

  return (
    <div
      className="blog-card"
      style={{
        border: "1px solid #ccc",
        padding: "15px",
        borderRadius: "8px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        backgroundColor: "#fff",
        marginBottom: "20px",
      }}
    >
      <h2 className="blog-title" style={{ marginBottom: "10px" }}>
        Title: {title}
      </h2>
      <p
        className="blog-content"
        style={{ color: "#555", marginBottom: "10px" }}
      >
        Content:{" "}
        {isExpanded ? content : content.slice(0, CONTENT_LIMIT) + "..."}
        {isContentTooLong && (
          <span
            className="see-more"
            onClick={toggleExpand}
            style={{
              color: "#007BFF",
              cursor: "pointer",
              marginLeft: "5px",
              fontWeight: "bold",
            }}
          >
            {isExpanded ? "See Less" : "See More"}
          </span>
        )}
      </p>
      <div
        className="blog-author"
        style={{ marginBottom: "10px", fontStyle: "italic" }}
      >
        Author: <strong>{author?.username}</strong>
      </div>
      <div className="action-buttons">
        <button
          className="action-button edit"
          onClick={onEdit}
          style={{
            padding: "8px 12px",
            marginRight: "10px",
            backgroundColor: "#28a745",
            color: "#fff",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Edit
        </button>
        <button
          className="action-button delete"
          onClick={onDelete}
          style={{
            padding: "8px 12px",
            backgroundColor: "#dc3545",
            color: "#fff",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default BlogCard;
