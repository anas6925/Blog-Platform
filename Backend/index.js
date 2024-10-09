import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import signUpModel from "./routes/signUpRoutes.js";
import postBlogModel from "./routes/postBlogRoutes.js";
// import privateRoutes from "./routes/privateRoutes.js";

import authMiddleware from "./authMiddleware.js";
import cors from "cors";
dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());
mongoose.set("strictQuery", false);
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/blogPost", signUpModel);
app.use("/blogPost", postBlogModel);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
