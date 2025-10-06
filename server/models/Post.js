import mongoose from "mongoose";

const PostSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    title: {
        type: String,
        required: true
    },
    content: {
        type: String
    },
    imageUrl: {
        type: String
    },

    hashtags: [String],

    scheduleTime: {
        type: Date
    },  // when to auto-post

    status: {
        type: String,
        enum: ["pending", "scheduled", "posted", "failed"],
        default: "pending"
    },
    
    platforms: [{
        type: String,
        enum: ["twitter", "linkedin", "facebook"],
    }], 
    aiCaption: {
        type: String
    }, 

},{timestamps: true});


export const Post = mongoose.model("Post", PostSchema);      
export default Post;
