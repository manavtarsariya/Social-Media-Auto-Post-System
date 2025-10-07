

export const twitterHandler = async (req, res) => {

    try {

        return res.status(200).json({
            success: true,
            message: 'Post successfully posted on Twitter'
        });



    } catch (error) {
        console.error("Error in Twitter handler:", error);
        return res.status(500).json({ message: "Internal server error" });

    }

}

export const linkedinHandler = async (req, res) => {

    try {


        return res.status(200).json({
            success: true,
            message: 'Post successfully posted on linkedin'
        });


    } catch (error) {
        console.error("Error in linkedIn handler:", error);
        return res.status(500).json({ message: "Internal server error" });

    }


}

export const facebookHandler = async (req, res) => {

    try {

        return res.status(200).json({
            success: true,
            message: 'Post successfully posted on Facebook'
        });

    } catch (error) {

        console.error("Error in Facebook handler:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
}   
