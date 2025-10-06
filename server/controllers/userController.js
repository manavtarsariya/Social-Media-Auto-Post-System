
import User from "../models/User.js";
import bcrypt from "bcryptjs";
import Joi from "joi";

// Register validation
const registerValidationSchema = Joi.object({
    name: Joi.string()
        .trim()
        .min(2)
        .max(50)
        .required()
        .messages({
            "string.empty": "Name is required",
            "string.min": "Name must be at least 2 characters",
            "string.max": "Name must be less than 50 characters",
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

        const { name, email, password } = value;

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