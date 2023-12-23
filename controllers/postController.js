import Post from "../models/Post.js";

// Controller function to get all posts
export const getAllPosts = async (req, res) => {
  try {
    // Fetching all posts and populating the 'author' field with the 'username'
    const posts = await Post.find().populate("author", "username");
    // Sending the fetched posts as a JSON response
    res.json(posts);
  } catch (error) {
    // Handling internal server errors
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Controller function to create a new post
export const createPost = async (req, res) => {
  try {
    // Extracting title and content from the request body
    const { title, content } = req.body;
    // Creating a new post with the provided title, content, and author (user ID)
    const post = new Post({ title, content, author: req.userId });
    // Saving the new post to the database
    await post.save();
    // Sending a JSON response indicating successful post creation
    res.json({ ...post._doc, message: "Post created successfully" });
  } catch (error) {
    // Handling internal server errors
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Controller function to update an existing post
export const updatePost = async (req, res) => {
  try {
    // Extracting title and content from the request body
    const { title, content } = req.body;
    // Finding the post by ID
    const post = await Post.findById(req.params.id);

    // Checking if the user making the request is the author of the post
    if (!post || post.author.toString() !== req.userId) {
      return res
        .status(403)
        .json({ error: "You are not authorized to edit this post." });
    }

    // Updating the post with the new title and content
    await Post.findByIdAndUpdate(req.params.id, { title, content });
    // Sending a JSON response indicating successful post update
    res.json({ message: "Post updated successfully" });
  } catch (error) {
    // Handling internal server errors
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Controller function to delete an existing post
export const deletePost = async (req, res) => {
  try {
    // Finding the post by ID
    const post = await Post.findById(req.params.id);

    // Checking if the user making the request is the author of the post
    if (!post || post.author.toString() !== req.userId) {
      return res
        .status(403)
        .json({ error: "You are not authorized to delete this post." });
    }

    // Deleting the post from the database
    await Post.findByIdAndDelete(req.params.id);
    // Sending a JSON response indicating successful post deletion
    res.json({ ...post._doc, message: "Post deleted successfully" });
  } catch (error) {
    // Handling internal server errors
    res.status(500).json({ error: "Internal Server Error" });
  }
};
