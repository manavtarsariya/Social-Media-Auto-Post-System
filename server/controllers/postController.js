import Post from "../models/Post.js";

export const createPost = async (req, res) => {

    const { userId, title, content, imageUrl, hashtags, scheduleTime, aiCaption } = req.body;

    if (!title) {
        return res.status(400).json({
            message: "Title is required",
            success: false
        });
    }

    try {

        const post = await Post.create({
            userId,
            title,
            content,
            imageUrl,
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
        if(!posts){
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