import mongoose, { Schema, Document } from "mongoose";

// Defining the Schema
export interface User extends Document {
    username: String,
    email: String,
    password: String,
    isVerified: boolean,
    IsAdmin: boolean,
    forgotPasswordToken: string,
    forgotPasswordTokenExpiry: Date,
    verifyToken: string,
    verifyTokenExpiry: Date,
}

const userSchema: Schema<User> = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "Please provide a username"],
        unique: true,
    },
    email: {
        type: String,
        required: [true, "Please provide a email"],
        unique: true,
    },
    password: {
        type: String,
        required: [true, "Please provide a password"],
    },
    isVerified: {
        type: Boolean,
        default: false,
    },
    IsAdmin: {
        type: Boolean,
        default: false,
    },
    forgotPasswordToken: String,
    forgotPasswordTokenExpiry: Date,
    verifyToken: String,
    verifyTokenExpiry: Date,
});

const UserModel =
    mongoose.models.Users ||
    mongoose.model<User>("Users", userSchema);

export default UserModel;