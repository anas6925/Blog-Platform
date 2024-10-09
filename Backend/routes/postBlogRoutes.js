import express from "express";
import {
  createBlog,
  getBlogsAgainstUser,
  getOneBlog,
  updateBlog,
  deleteBlog,
  getAllBlogs,
  addComment,
  deleteComment,
} from "../controllers/postBlogController.js";
import authMiddleware from "../authMiddleware.js";

const router = express.Router();

router.get("/getAllBlogs", getAllBlogs);
router.get("/getBlogsAgainstUser", authMiddleware, getBlogsAgainstUser);
router.get("/getOneBlog/:id", getOneBlog);
router.post("/addComment/:blogId", authMiddleware, addComment);
router.delete(
  "/deleteComment/:blogId/:commentId",
  authMiddleware,
  deleteComment
);
router.post("/createBlog", authMiddleware, createBlog);
router.put("/updateBlog/:id", authMiddleware, updateBlog);
router.delete("/deleteBlog/:id", authMiddleware, deleteBlog);

export default router;
