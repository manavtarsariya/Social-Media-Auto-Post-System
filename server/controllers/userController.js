
import User from "../models/User.js";
import bcrypt from "bcryptjs";

export const registerUser = async (req, res) => {

    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({
                message: "All fields are required",
                success: false
            });
        }

        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({
                message: "User already exists with this email",
                success: false
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({
            name,
            email,
            password : hashedPassword
        });
        await newUser.save();

        res.status(201).json({
            message: "User registered successfully",
            success: true,
            newUser
        });


    } catch (error) {
        console.error("Error in registerUser:", error);
        res.status(500).json({
            message: "Server error",
            success: false
        });

    }
}


export const loginUser = async (req, res) => {

    try {
        const { email, password } = req.body;

        
        if (!email || !password) {
            return res.status(400).json({   
                message: "All fields are required",
                success: false
            });
        }   

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({
                message: "Invalid email or password",
                success: false
            });
        }   

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({
                message: "Invalid email or password",
                success: false
            });
        }
        res.status(200).json({
            message: "Login successful",
            success: true,
            user
        });
    } catch (error) {
        console.error("Error in loginUser:", error);
        res.status(500).json({
            message: "Server error",
            success: false
        });
    }
}