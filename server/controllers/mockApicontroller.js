

export const twitterHandler = async (req, res) => {

    try {
        const { content } = req.body;

        if (content) {

            console.log('Twitter Post Data:', content);

            return res.status(200).json({
                success: true,
                message: 'Post successfully scheduled on Twitter'
            });
        } else {
            // Simulate failure
            return res.status(200).json({
                status: false,
                message: 'Post content is missing'
            });
        }


    } catch (error) {
        console.error("Error in Twitter handler:", error);
        return res.status(500).json({ message: "Internal server error" });

    }

}

export const linkedinHandler = async (req, res) => {

    try {
        const { content } = req.body;

        if (content) {

            console.log('linkedIn Post Data:', content);
            return res.status(200).json({
                success: true,
                message: 'Post successfully scheduled on linkedin'
            });
        } else {

            return res.status(200).json({
                status: false,
                message: 'Post content is missing'
            });
        }


    } catch (error) {
        console.error("Error in linkedIn handler:", error);
        return res.status(500).json({ message: "Internal server error" });

    }


}

export const facebookHandler = async (req, res) => {

    try {
        const { content } = req.body;

        if (content) {
            console.log('Facebook Post Data:', content);
            return res.status(200).json({
                success: true,
                message: 'Post successfully scheduled on Facebook'
            });
        } else {

            return res.status(200).json({
                success: false,
                message: 'Post content is missing'
            });
        }
    } catch (error) {

        console.error("Error in Facebook handler:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
}   
