
import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken"
import dotenv from "dotenv"
dotenv.config()
import Joi from "joi";

// Register validation
const registerValidationSchema = Joi.object({
    username: Joi.string()
        .trim()
        .min(2)
        .max(50)
        .required()
        .pattern(/^\S+$/)
        .messages({
            "string.empty": "userame is required",
            "string.min": "username must be at least 2 characters",
            "string.max": "username must be less than 50 characters",
            "string.pattern.base": "Username should not contain spaces",
        }),
    email: Joi.string()
        .email()
        .required()
        .messages({
            "string.empty": "Email is required",
            "string.email": "Email must be a valid email address",
        }),
    password: Joi.string()
        .min(6)
        .required()
        .messages({
            "string.empty": "Password is required",
            "string.min": "Password must be at least 6 characters",
        }),
});

export const registerUser = async (req, res) => {

    try {

        const { error, value } = registerValidationSchema.validate(req.body);
        if (error) {
            return res.status(400).json({
                success: false,
                message: error.details[0].message,
            });
        }

        const { username, email, password } = value;

        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({
                message: "User already exists with this email",
                success: false
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({
            username,
            email,
            password: hashedPassword
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


const loginValidationSchema = Joi.object({
    email: Joi.string()
        .email()
        .required()
        .messages({
            "string.empty": "Email is required",
            "string.email": "Email must be a valid email address",
        }),
    password: Joi.string()
        .required()
        .messages({
            "string.empty": "Password is required",
        }),
});


export const loginUser = async (req, res) => {

    try {
        const { error, value } = loginValidationSchema.validate(req.body);
        if (error) {
            return res.status(400).json({
                success: false,
                message: error.details[0].message,
            });
        }

        const { email, password } = value;

        let user = await User.findOne({ email });
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

        const tokenData = {
            userId: user._id,
        };

        const token = jwt.sign(tokenData, process.env.JWT_SECRET, {
            expiresIn: process.env.JWT_EXPIRES_IN,
        });

        user = {
            id: user._id,
            username: user.username,
            email: user.email,
        };



        res.cookie("token", token, {
            maxAge: 24 * 60 * 60 * 1000, // 1 day
            httpOnly: true,
            sameSite: 'strict',
        });

        return res.status(200).json({
            message: `Welcome back ${user.username}`,
            user,
            success: true,
        });

    } catch (error) {
        console.error("Error in loginUser:", error);
        res.status(500).json({
            message: "Server error",
            success: false
        });
    }
}

export const logout = async (req, res) => {
    try {
        return res.status(200)
            .cookie("token", "", {
                maxAge: 0, // Immediately expires the cookie
                httpOnly: true,
                sameSite: 'strict',
            })
            .json({
                message: "Logged out successfully.",
                success: true,
            });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "An error occurred during logout.",
            success: false,
        });
    }
};