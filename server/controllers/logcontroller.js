import Log from "../models/Log.js"

import Joi from "joi";

const logValidationSchema = Joi.object({
    postId: Joi.string().required().messages({
        "string.empty": "Post ID is required.",
    }),
    platform: Joi.array()
        .items(Joi.string().trim().required())
        .min(1)
        .required()
        .messages({
            "array.base": "Platform must be an array.",
            "array.min": "At least one platform is required.",
            "string.empty": "Platform value cannot be empty.",
        }),
    status: Joi.string().valid("true", "false").required().messages({
        "any.only": "Status must be 'true' or 'false'.",
    }),
    finaleresponse: Joi.string().trim().required().messages({
        "string.empty": "Final response cannot be empty.",
    }),
});


const statuHandlerApiCall = async (postId, statusvalue) => {

    try {

        const response = await fetch(`http://localhost:8000/api/posts/updatestatus/${postId}`, {
            method: "PUT",
            headers: {

                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                status: statusvalue
            })
        })
        const jsonresponse = await response.json()

    } catch (error) {
        console.log("statuHandler Api Call Error", error)

    }

}


export const logpostdetails = async (req, res) => {

    try {

        const { error, value } = logValidationSchema.validate(req.body);
        if (error) {
            return res.status(400).json({
                success: false,
                message: error.details[0].message,
            });
        }

        const { postId, status, platform, finaleresponse } = value;

        if (postId && !mongoose.Types.ObjectId.isValid(postId)) {
            return res.status(400).json({
                success: false,
                message: "Invalid post ID format.",
            });
        }

        let data = await Log.create({
            postId: postId,
            platform: platform,
            status: status,
            finaleresponse: finaleresponse

        })


        statuHandlerApiCall(postId, status)

        data = {
            postId: postId,
            platform: platform,
            status: status,
        }

        return res.status(200).json({
            data: data,
            message: finaleresponse
        });


    } catch (error) {

        console.error('Error logging post details:', error);
        return res.status(500).json({
            success: false,
            message: 'Failed to log post details'
        });


    }
}