import mongoose from "mongoose";
import Post from "../models/Post.js";
import getDataUri from "../utils/datauri.js";
import cloudinary from "../utils/cloudinary.js";
import { GoogleGenerativeAI } from "@google/generative-ai"

export const createPost = async (req, res) => {

    const { userId, title, content, hashtags, scheduleTime, platforms, aiCaption } = req.body;

    if (!title) {
        return res.status(400).json({
            message: "Title is required",
            success: false
        });
    }

    const hashstagsArray = hashtags.split(',').map(tag => tag.trim()) || [];

    let imageUrl = "";

    if (req.file) {
        const image = req.file
        const fileuri = getDataUri(image)
        const result = await cloudinary.uploader.upload(fileuri.content)
        imageUrl = result.secure_url;
    }

    let status = "pending";
    if (scheduleTime) {
        const scheduledDate = new Date(scheduleTime);

        if (scheduledDate > new Date()) {
            status = "scheduled";

        } else {
            return res.status(400).json({
                message: "Schedule time must be in the future",
                success: false
            });
        }
    }

    let platformsArray = [];

    if (typeof (platforms) === "string") {
        platformsArray = JSON.parse(platforms);
    } else {
        platformsArray = platforms || [];
    }

    if (platformsArray.length >= 1 && scheduleTime === "") {
        return res.status(400).json({
            message: "Please provide schedule time for selected platforms",
            success: false
        });

    }

    if (platformsArray.length === 0 && scheduleTime !== "") {
        return res.status(400).json({
            message: "Please select at least one platform for scheduled post",
            success: false
        });
    }


    try {

        const post = await Post.create({
            userId,
            title,
            content,
            status,
            imageUrl: imageUrl || "",
            hashtags: hashstagsArray,
            scheduleTime,
            platforms: platformsArray,
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
        const posts = await Post.find().sort({ createdAt: -1 });;
        if (posts.length === 0) {
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

    if (!mongoose.Types.ObjectId.isValid(postId)) {
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



export const statusHandler = async (req, res) => {
    try {

        const { postId } = req.params;

        if (!mongoose.Types.ObjectId.isValid(postId)) {
            return res.status(400).json({
                message: "Invalid post ID",
                success: false
            });
        }

        const { status } = req.body


        const statusvalue = status ? "posted" : "failed";

        const response = await Post.findByIdAndUpdate(postId, {
            status: statusvalue
        }, { new: true })

        return res.status(200).json({
            success: true,
            message: "status updated"
        })

    } catch (error) {
        console.error("Error in statusHandler handler:", error);
        return res.status(500).json({ message: "Internal server error" });

    }
}

export const captiongenerator = async (req, res) => {
    try {

        const { title, content } = req.body

        if (!content || !title) {
            return res.status(400).json({
                success: false,
                message: 'Title and content are required.'
            });
        }
        const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
        const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

        const prompt = `

        Act as a professional social media copywriter. Your single task is to write one compelling caption based on the provided Title and Content.

        ---
        INSTRUCTIONS:
        - The tone must be: ${"Engaging and Conversational"}
        - The length should be approximately: ${"2 to 3 short sentences (approximately 150 characters)"}
        - Use the Title as the main subject and the Content for details.
        - CRITICAL: Do NOT include hashtags.
        - CRITICAL: Do NOT include emojis.
        - CRITICAL: Do NOT include any text other than the caption itself.
        ---

        PROVIDED DETAILS:
        - Title: "${title}"
        - Content: "${content}"`;


        const result = await model.generateContent(prompt);
        const response = await result.response;
        const aiCaption = response.text();

        // 4. Send the result from Gemini back to your React frontend

        return res.status(200).json({
            success: true,
            caption: aiCaption
        });

    } catch (error) {
        console.error("Error in Gemini API for caption generation", error);
        res.status(500).json({ error: 'Failed to generate AI caption.' });
    }
}


export const hashtagsgenerator = async (req, res) => {
    try {
        const { title, content } = req.body;

        if (!title || !content) {
            return res.status(400).json({
                success: false,
                message: 'Title and content are required.'
            });
        }

        const prompt = `
      Act as a social media expert specializing in content reach. Your only task is to generate the most relevant hashtags based on the provided Title and Content.
        ---
        CRITICAL RULES:
        1.  **Generate exactly 4 to 5 of the most relevant hashtags.**
        2.  The output MUST be a string of words separated ONLY by commas.
        3.  DO NOT use spaces after the commas.
        4.  DO NOT use the '#' symbol.
        5.  DO NOT add any explanations, labels, or any text other than the comma-separated hashtags.

        EXAMPLE OUTPUT: hashtagone,hashtagtwo,hashtagthree
        ---
      PROVIDED TEXT:
      - Title: "${title}"
      - Content: "${content}"
    `;

        const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
        const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
        const result = await model.generateContent(prompt);
        const responseText = result.response.text().trim();



        return res.status(200).json({
            success: true,
            hashtags: responseText
        });

    } catch (error) {
        console.error("Error in Gemini API for hashtags generation:", error);
        res.status(500).json({ error: 'Failed to generate hashtags.' });
    }

}


export const sentimentanalyzer = async (req, res) => {

    try {

        const { textToAnalyze } = req.body;

        if (!textToAnalyze) {
            return res.status(400).json({ error: 'Text to analyze is required.' });
        }

        // The prompt we designed above
        const prompt = `
            Act as an expert sentiment analysis AI. Your single task is to analyze the tone of the provided text.

            ---
            INSTRUCTIONS:
            1.  Determine the dominant sentiment from one of the following categories: "Positive", "Negative", "Neutral", or "Mixed".
            2.  Provide a brief, one-sentence explanation for your choice.
            3.  Your response MUST be a single, minified JSON object with two keys: "sentiment" and "explanation".
            4.  Do NOT include any text or formatting before or after the JSON object.

            EXAMPLE JSON OUTPUT:
            {"sentiment":"Positive","explanation":"The text uses uplifting words and expresses excitement."}
            ---

            TEXT TO ANALYZE:
            "${textToAnalyze}"
        `;

        const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
        const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
        const result = await model.generateContent(prompt);
        const responseText = result.response.text();

        // Safely parse the JSON response from the AI
        const parsedResponse = JSON.parse(responseText);

        return res.status(200).json({
            success: true,
            result: parsedResponse
        });


    } catch (error) {
        console.error("Error in Gemini API for analyzing sentiment:", error);
        res.status(500).json({ error: 'Failed to analyze sentiment.' });
    }
}