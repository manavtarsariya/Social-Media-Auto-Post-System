import mongoose from "mongoose";

const LogSchema = new mongoose.Schema({
    postId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post",
        required: true
    },
    platform: [{
        type: String,
    }], // mock APIs
    status: {
        type: String,
        enum: ["true", "false"],
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    finaleresponse: { type: String }, // store API response or error

}, { timestamps: true });

export const Log = mongoose.model("Log", LogSchema);
export default Log;