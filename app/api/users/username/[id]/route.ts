import { NextResponse } from "next/server";
import UserModel from "@/models/userModel";
import { connect } from "@/lib/dbConnect";

connect();

export async function GET(
    _: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const user_name = await UserModel.findOne({
            _id: id,
        }).select("username -_id");
        if (!user_name) {
            return NextResponse.json(
                { error: "User not found" },
                { status: 404 }
            );
        }
        return NextResponse.json({
            message: "User found",
            data: user_name,
        });
    } catch (error: any) {
        return NextResponse.json(
            { error: error.message },
            { status: 400 }
        );

    }
}