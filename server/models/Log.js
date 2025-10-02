import mongoose from "mongoose";

const LogSchema = new mongoose.Schema({
    postId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post",
        required: true
    },
    platform: {
        type: String,
        enum: ["twitter", "linkedin", "facebook"],
        required: true
    }, // mock APIs
    status: {
        type: String,
        enum: ["success", "failure"],
        required: true
    },
    response: { type: String }, // store API response or error

},{ timestamps: true });

export const Log =  mongoose.model("Log", LogSchema);
export default Log;