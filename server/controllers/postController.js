import mongoose from "mongoose";
import Post from "../models/Post.js";
import getDataUri from "../utils/datauri.js";
import cloudinary from "../utils/cloudinary.js";

export const createPost = async (req, res) => {

    const { userId, title, content, hashtags, scheduleTime, aiCaption } = req.body;

    if (!title) {
        return res.status(400).json({
            message: "Title is required",
            success: false
        });
    }

    let imageUrl = "";

    if(req.file){
        const image = req.file
        const fileuri = getDataUri(image)
        const result = await cloudinary.uploader.upload(fileuri.content)
        console.log("cloudinary",result);
        imageUrl = result.secure_url;
    }

    try {

        const post = await Post.create({
            userId,
            title,
            content,
            imageUrl : imageUrl || "",
            hashtags,
            scheduleTime,
            aiCaption,
        });

        return res.status(201).json({
            message: "Post created successfully",
            success: true,
            post,
        });

    } catch (error) {
        console.error("Error creating post:", error);

        return res.status(500).json({
            message: "Failed to create post",
            success: false
        });

    }


}


export const getallPosts = async (req, res) => {
    try {
        const posts = await Post.find().populate('userId', 'username email');
        if(posts.length === 0){
            return res.status(404).json({
                message: "No posts found",
                success: false
            });
        }
        
        return res.status(200).json({
            message: "Posts fetched successfully",
            success: true,
            posts
        });
    } catch (error) {
        console.error("Error fetching posts:", error);
        return res.status(500).json({   
            message: "Failed to fetch posts",
            success: false
        });
    }
}

export const deletePost = async (req, res) => {
    const { postId } = req.params;  
    // console.log("Deleting post with ID:", postId);

    if( !mongoose.Types.ObjectId.isValid(postId)){
        return res.status(400).json({
            message: "Invalid post ID", 
            success: false
        });
    }

    try {
        const deletedPost = await Post.findByIdAndDelete(postId);
        if (!deletedPost) {
            return res.status(404).json({
                message: "Post not found",
                success: false
            });
        }
        return res.status(200).json({
            message: "Post deleted successfully",
            success: true
        });
    } catch (error) {
        console.error("Error deleting post:", error);
        return res.status(500).json({
            message: "Failed to delete post",
            success: false
        });
    }   
}