import { connect } from "@/lib/dbConnect";
import { NextRequest, NextResponse } from "next/server";
import UserModel from "@/models/userModel";
import { sendEmail } from "@/assists/mailer";

connect();

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const { email } = reqBody;

        if (!email) {
            return NextResponse.json(
                { error: "Email is required" },
                { status: 400 }
            );
        }

        const user = await UserModel.findOne({ email });

        if (!user) {
            return NextResponse.json(
                { error: "User not found" },
                { status: 404 }
            );
        }

        // Send reset email
        await sendEmail({ email, emailType: "RESET", userId: user._id });

        return NextResponse.json({
            message: "Password reset link sent to your email",
            success: true,
        });

    } catch (error: any) {
        return NextResponse.json(
            { error: error.message },
            { status: 500 }
        );
    }
}
