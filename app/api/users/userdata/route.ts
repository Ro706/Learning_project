import { getDataFromToken } from "@/assists/getDataFromToken";
import { NextRequest, NextResponse } from "next/server";
import UserModel from "@/models/userModel";
import { connect } from "@/lib/dbConnect";

connect();

export async function GET(request: NextRequest) {
    try {
        const token = request.cookies.get("token")?.value;
        
        if (!token) {
            return NextResponse.json({
                message: "Not authenticated",
                data: null
            });
        }

        const user_ID = getDataFromToken(request);
        const user = await UserModel.findOne({
            _id: user_ID,
        }).select("-password");

        if (!user) {
            return NextResponse.json({
                message: "User not found",
                data: null
            });
        }

        return NextResponse.json({
            message: "User found",
            data: user,
        });
    } catch (error: any) {
        return NextResponse.json(
            { error: error.message },
            { status: 500 }
        );
    }
}