import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "UserSignupModel",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
  comments: [
    {
      commentText: { type: String, required: true },
      commentAuthor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "UserSignupModel",
      },
      createdAt: { type: Date, default: Date.now },
    },
  ],
});

const PostBlogModel = mongoose.model("Post", postSchema);

export default PostBlogModel;
