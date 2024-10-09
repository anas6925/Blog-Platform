import PostBlogModel from "../models/postBlogModel.js";

// Create a new post
export const createBlog = async (req, res) => {
  const { title, content } = req.body;
  try {
    const newPost = new PostBlogModel({
      title,
      content,
      author: req.user._id,
    });

    const saveBlog = await newPost.save();
    if (saveBlog) {
      return res.status(200).json({
        status: "Success",
        message: "Blog Created Successfully",
        code: 200,
      });
    } else {
      return res.status(400).json({
        status: "Failure",
        message: "Error Creating Blog",
        code: 400,
      });
    }
  } catch (error) {
    res.status(500).json({ error: "Error Creating Blog" });
  }
};

// Read all posts
export const getBlogsAgainstUser = async (req, res) => {
  try {
    // Use the user's ID from req.user (assumes you're using authMiddleware)
    const authorId = req.user._id;
    // Find posts where the author matches the authenticated user's ID
    const posts = await PostBlogModel.find({ author: authorId }).populate(
      "author",
      "username email"
    );

    if (posts.length > 0) {
      return res.status(200).json({
        status: "Success",
        message: "Blogs Found Successfully",
        code: 200,
        data: { posts },
      });
    } else {
      return res.status(404).json({
        status: "Failure",
        message: "No Blogs Found for This User",
        code: 404,
        data: [],
      });
    }
  } catch (error) {
    console.log("error", error);
    res.status(500).json({ error: "Error fetching posts" });
  }
};

// Read a single post by ID
export const getOneBlog = async (req, res) => {
  const { id } = req.params;

  try {
    const getSingleBlog = await PostBlogModel.findById(id).populate(
      "author",
      "username email"
    );
    if (getSingleBlog) {
      return res.status(200).json({
        status: "Success",
        message: "Blog Found Successfully",
        code: 200,
        data: { getSingleBlog },
      });
    } else {
      return res.status(400).json({
        status: "Failure",
        message: "No Blogs Found Against This Id",
        code: 400,
        data: [],
      });
    }
  } catch (error) {
    res.status(500).json({ error: "Error fetching post" });
  }
};

// Update a post by ID
export const updateBlog = async (req, res) => {
  const { id } = req.params;
  const { title, content } = req.body;

  try {
    let post = await PostBlogModel.findById(id);

    if (!post) {
      return res.status(400).json({
        status: "Failure",
        message: "Blog Not Found",
        code: 400,
        data: [],
      });
    }

    // Check if the current user is the author of the post
    if (post.author.toString() !== req.user.id) {
      return res.status(403).json({ error: "Unauthorized" });
    }

    // Update post details
    post.title = title || post.title;
    post.content = content || post.content;
    post.updatedAt = Date.now();

    const updateBlog = await post.save();
    if (updateBlog) {
      return res.status(200).json({
        status: "Success",
        message: "Blog Updated Successfully",
        code: 200,
      });
    } else {
      return res.status(400).json({
        status: "Failure",
        message: "Error Updating Blog",
        code: 400,
        data: [],
      });
    }
  } catch (error) {
    console.log("error", error);
    res.status(500).json({ error: "Error updating post" });
  }
};

// Delete a post by ID
export const deleteBlog = async (req, res) => {
  const { id } = req.params;

  try {
    const post = await PostBlogModel.findById(id);

    if (!post) {
      return res.status(404).json({
        message: "Blog Not Found",
        code: 400,
      });
    }

    // Check if the current user is the author of the post
    if (post.author.toString() !== req.user.id) {
      return res.status(403).json({ error: "Unauthorized" });
    }

    // Use deleteOne() instead of remove()
    const deleteBlog = await PostBlogModel.deleteOne({ _id: id });

    if (deleteBlog.deletedCount > 0) {
      return res.status(200).json({
        status: "Success",
        message: "Blog Deleted Successfully",
        code: 200,
      });
    } else {
      return res.status(400).json({
        status: "Failure",
        message: "Error Deleting Blog",
        code: 400,
        data: [],
      });
    }
  } catch (error) {
    console.log("error", error);
    res.status(500).json({ error: "Error Deleting Post" });
  }
};

// Get all blogs (independent of author)
export const getAllBlogs = async (req, res) => {
  try {
    const blogs = await PostBlogModel.find()
      .populate("author", "username email")
      .populate({
        path: "comments.commentAuthor",
        select: "username email",
      });

    if (blogs.length > 0) {
      return res.status(200).json({
        status: "Success",
        message: "Blogs Retrieved Successfully",
        code: 200,
        data: { blogs },
      });
    } else {
      return res.status(404).json({
        status: "Failure",
        message: "No Blogs Found",
        code: 404,
        data: [],
      });
    }
  } catch (error) {
    console.log("error", error);
    console.error("Error fetching blogs:", error);
    res.status(500).json({ error: "Error fetching blogs" });
  }
};

// Add Comments For Blog
export const addComment = async (req, res) => {
  const { blogId } = req.params;
  const { content } = req.body;
  const userId = req.user.id;

  try {
    // Find the blog post by ID
    const blogPost = await PostBlogModel.findById(blogId);
    if (!blogPost) {
      return res.status(400).json({
        status: "Failure",
        message: "Blog Post Not Found",
        code: 400,
      });
    }

    // Create a new comment object
    const newComment = {
      commentText: content,
      commentAuthor: userId,
      createdAt: new Date(),
    };
    blogPost.comments.push(newComment);
    const saveComment = await blogPost.save();
    if (saveComment) {
      return res.status(200).json({
        status: "Success",
        message: "Comment added successfully",
        code: 200,
      });
    } else {
      return res.status(400).json({
        status: "Failure",
        message: "Error Adding Comment",
        code: 400,
      });
    }
  } catch (error) {
    console.error("Error adding comment:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Delete Comments For Blog
export const deleteComment = async (req, res) => {
  const { blogId, commentId } = req.params;
  const userId = req.user._id;
  try {
    // Find the blog post by ID
    const blogPost = await PostBlogModel.findById(blogId);

    if (!blogPost) {
      return res.status(400).json({
        status: "Failure",
        message: "Blog Post Not Found",
        code: 400,
      });
    }

    // Find the comment by ID
    const comment = blogPost.comments.id(commentId);
    if (!comment) {
      return res.status(400).json({
        status: "Failure",
        message: "Comment Not Found",
        code: 400,
      });
    }

    // Check if the user is the author of the comment
    if (comment.commentAuthor.toString() !== userId.toString()) {
      return res.status(403).json({
        status: "Failure",
        message: "You are not authorized to delete this comment",
        code: 403,
      });
    }

    // Remove the comment using pull
    blogPost.comments.pull(commentId); // This removes the comment from the array

    // Save the updated blog post
    const DeleteComment = await blogPost.save();
    if (DeleteComment) {
      return res.status(200).json({
        status: "Success",
        message: "Comment deleted successfully",
        code: 200,
      });
    } else {
      return res.status(400).json({
        status: "Failure",
        message: "Error In Deleting The Comment",
        code: 400,
      });
    }
  } catch (error) {
    console.error("Error deleting comment:", error);
    res.status(500).json({ message: "Server error" });
  }
};
