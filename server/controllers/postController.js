import mongoose from "mongoose";
import Post from "../models/Post.js";
import getDataUri from "../utils/datauri.js";
import cloudinary from "../utils/cloudinary.js";
import { GoogleGenerativeAI } from "@google/generative-ai"
import Joi from "joi"

const createPostSchema = Joi.object({
    title: Joi.string().required().messages({
        'string.empty': 'Title is required',
    }),
    content: Joi.string().required().messages({
        'string.empty': 'Content is required',
    }),
    hashtags: Joi.string().allow('').optional(),
    scheduleTime: Joi.string().allow(""),
    platforms: Joi.alternatives().try(
        Joi.array().items(Joi.string().valid('twitter', 'linkedin', 'facebook')),
        Joi.string().allow('')
    ).optional(),
    aiCaption: Joi.string().allow('').optional()
});

export const createPost = async (req, res) => {

    const { error } = createPostSchema.validate(req.body);
    if (error) {
        return res.status(400).json({
            message: error.details[0].message,
            success: false
        });
    }



    const { title, content, hashtags, scheduleTime, platforms, aiCaption } = req.body;

    const userId = req.id
    // console.log(userId)

    if (userId && !mongoose.Types.ObjectId.isValid(userId)) {
        return res.status(400).json({
            message: "please provide valid User ID",
            success: false
        });
    }

    if (!title.trim()) {
        return res.status(400).json({
            message: "Title cannot be empty or consist only of spaces",
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

    if (!aiCaption) {
        status = "failed";
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
        const userId = req.id

        const posts = await Post.find({ userId: userId }).sort({ createdAt: -1 });;
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

    if (postId && !mongoose.Types.ObjectId.isValid(postId)) {
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
    const { postId } = req.params;
    const { status } = req.body;

    // --- Joi schema for validation ---
    const schema = Joi.object({
        postId: Joi.string().required().custom((value, helpers) => {
            if (!mongoose.Types.ObjectId.isValid(value)) {
                return helpers.message("Invalid Post ID");
            }
            return value;
        }),
        status: Joi.boolean().required().messages({
            "any.required": "Status is required",
            "boolean.base": "Status must be a boolean value"
        })
    });

    // --- Validate params + body ---
    const { error } = schema.validate({ postId, status });
    if (error) {
        return res.status(400).json({
            success: false,
            message: error.details[0].message
        });
    }

    // --- Update logic ---
    const statusValue = status ? "posted" : "failed";

    const response = await Post.findByIdAndUpdate(
        postId,
        { status: statusValue },
        { new: true }
    );

    if (!response) {
        return res.status(404).json({
            success: false,
            message: "Post not found"
        });
    }

    return res.status(200).json({
        success: true,
        message: "Post status updated successfully",
        post: response
    });
}

export const captiongenerator = async (req, res) => {
    try {
        // const { title, content } = req.body;

        // --- Joi validation schema ---
        const schema = Joi.object({
            title: Joi.string()
                .trim()
                .min(1)
                // .required()
                .messages({
                    "string.empty": "Title is required and cannot be empty",
                    "any.required": "Title is required",
                }),
            content: Joi.string()
                .trim()
                .min(1)
                // .required()
                .messages({
                    "string.empty": "Content is required and cannot be empty",
                    "any.required": "Content is required",
                }),
        });

        // --- Validate request body ---
        // const { error } = schema.validate({ title, content });
        // if (error) {
        //     return res.status(400).json({
        //         success: false,
        //         message: error.details[0].message,
        //     });
        // }

        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: "No image file provided for hashtag generation.",
            });
        }

        let imageUrl = "";

        if (req.file) {
            const image = req.file
            const fileuri = getDataUri(image)
            const result = await cloudinary.uploader.upload(fileuri.content)
            imageUrl = result.secure_url;
        }

        // --- AI caption generation ---
        const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
        const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

        // const prompt = `
        // Act as a professional social media copywriter. Your single task is to write one compelling caption based on the provided Title and Content.

        // ---
        // INSTRUCTIONS:
        // - The tone must be: Engaging and Conversational
        // - The length should be approximately: 2 to 3 short sentences (around 150 characters)
        // - Use the Title as the main subject and the Content for details.
        // - CRITICAL: Do NOT include hashtags.
        // - CRITICAL: Do NOT include emojis.
        // - CRITICAL: Do NOT include any text other than the caption itself.
        // ---
        // PROVIDED DETAILS:
        // - Title: "${title}"
        // - Content: "${content}"
        // `;

        const captionPrompt = `
        Act as a professional social media copywriter. Your single task is to write one compelling caption based ONLY on the visual content of the provided image.

        ---
        INSTRUCTIONS:
        - The tone must be: Engaging and Conversational
        - The length should be approximately: 2 to 3 short sentences (around 150 characters)
        - CRITICAL: Do NOT include hashtags.
        - CRITICAL: Do NOT include emojis.
        - CRITICAL: Do NOT include any text other than the caption itself.
        ---
        `;

        // const imagePart = PartMaker.fromUri(imageUrl, image.mimetype)
        const contents = [
            {
                // This is the structure PartMaker.fromUri would generate:
                fileData: {
                    mimeType: req.file.mimetype, // from req.file.mimetype
                    fileUri: imageUrl,        // the Cloudinary URL
                },
            },
            { text: captionPrompt },
        ];

        const result = await model.generateContent({ contents });
        const response = await result.response;
        const aiCaption = response.text();

        return res.status(200).json({
            success: true,
            caption: aiCaption,
        });
    } catch (error) {
        console.error("Error in Gemini API for caption generation:", error);
        return res.status(500).json({
            success: false,
            error: "Failed to generate AI caption.",
        });
    }
}


export const hashtagsgenerator = async (req, res) => {
    try {
        const { title, content } = req.body;

        // --- Joi Validation Schema ---
        const schema = Joi.object({
            title: Joi.string()
                .trim()
                .min(1)
                .required()
                .messages({
                    "string.empty": "Title is required and cannot be empty",
                    "any.required": "Title is required",
                }),
            content: Joi.string()
                .trim()
                .min(1)
                .required()
                .messages({
                    "string.empty": "Content is required and cannot be empty",
                    "any.required": "Content is required",
                }),
        });

        // --- Validate the input ---
        const { error } = schema.validate({ title, content });
        if (error) {
            return res.status(400).json({
                success: false,
                message: error.details[0].message,
            });
        }

        // --- Gemini AI logic ---
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
            hashtags: responseText,
        });

    } catch (error) {
        console.error("Error in Gemini API for hashtags generation:", error);
        return res.status(500).json({
            success: false,
            error: "Failed to generate hashtags.",
        });
    }

}


export const sentimentanalyzer = async (req, res) => {

    try {
        const { textToAnalyze } = req.body;

        // --- Joi Validation Schema ---
        const schema = Joi.object({
            textToAnalyze: Joi.string()
                .trim()
                .min(1)
                .required()
                .messages({
                    "string.base": "Text to analyze must be a string.",
                    "string.empty": "Text to analyze is required and cannot be empty.",
                    "any.required": "Text to analyze is required.",
                }),
        });

        // --- Validate input ---
        const { error } = schema.validate({ textToAnalyze });
        if (error) {
            return res.status(400).json({
                success: false,
                message: error.details[0].message,
            });
        }

        // --- Gemini AI Prompt ---
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

        // --- Generate Response ---
        const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
        const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
        const result = await model.generateContent(prompt);
        const responseText = result.response.text();

        const parsedResponse = JSON.parse(responseText);

        return res.status(200).json({
            success: true,
            result: parsedResponse,
        });

    } catch (error) {
        console.error("Error in Gemini API for analyzing sentiment:", error);
        return res.status(500).json({
            success: false,
            error: "Failed to analyze sentiment.",
        });
    }
}