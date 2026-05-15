import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";
import { Types } from "mongoose";

interface UserDataSchema {
    id: Types.ObjectId;
    username: string;
    email: string;
}

export const getDataFromToken = (request: NextRequest) => {
    try {
        const token = request.cookies.get("token")?.value;
        if (!token) {
            throw new Error("No token found");
        }
        const decodedToken = jwt.verify(
            token,
            process.env.TOKEN_SECRET!
        ) as UserDataSchema;
        return decodedToken.id;
    } catch (error: any) {
        throw new Error(error.message);
    }
};