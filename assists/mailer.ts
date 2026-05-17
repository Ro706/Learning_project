import nodemailer from "nodemailer";
import UserModel from "@/models/userModel";
import bcrypt from "bcryptjs";

export const sendEmail = async ({
    email,
    emailType,
    userId,
}: any) => {
    try {
        const hashedToken = await bcrypt.hash(userId.toString(), 10);

        if (emailType === "VERIFY") {
            await UserModel.findByIdAndUpdate(userId, {
                verifyToken: hashedToken,
                verifyTokenExpiry: Date.now() + 3600000,
            });
        } else if (emailType === "RESET") {
            await UserModel.findByIdAndUpdate(userId, {
                forgotPasswordToken: hashedToken,
                forgotPasswordTokenExpiry: Date.now() + 3600000,
            });
        }

        const transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 587,
            secure: false,
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS,
            },
        });

        const mailOptions = {
            from: process.env.SMTP_USER,
            to: email,
            subject:
                emailType === "VERIFY"
                    ? "VERIFY YOUR EMAIL"
                    : "Reset your password",

            html: `<p>
                Click 
                <a href="${process.env.DOMAIN}/verifyemail?token=${hashedToken}">
                    here
                </a> 
                to ${
                    emailType === "VERIFY"
                        ? "verify your email"
                        : "reset your password"
                }
            </p>`,
        };

        const mailresponse = await transporter.sendMail(mailOptions);

        return mailresponse;
    } catch (error: any) {
        throw new Error(error.message);
    }
};