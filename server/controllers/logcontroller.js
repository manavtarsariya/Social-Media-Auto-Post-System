import Log from "../models/Log.js"



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

        const { postId, status, platform, finaleresponse } = req.body;

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