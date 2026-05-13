import {connect} from "@/lib/dbConnect";
import UserModel from "@/models/userModel";
import { NextRequest,NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken"; 

connect()
const secret = process.env.TOKEN_SECRET!;
export async function POST(request: NextRequest){
    try{
        const reqBody = await request.json()
        const {email,password} = reqBody

        console.log(reqBody);
        //check if user exists or not
        const user = await UserModel.findOne({email})
        if(! user){
            return NextResponse.json({error: "User does not exists"},
                {status: 400}
            )
        }
        //validPassword
        const validPassword= await bcrypt.compare(password, user.password)
        if (!validPassword){
            return NextResponse.json(
                {error: "Invalid password"},
                {status: 400}
            )
        }
        // create token data
        const tokenData = {
            id:user._id,
            username: user.username,
            email: user.email
        }
        //create token
        const token = jwt.sign(tokenData,secret, { expiresIn: "1h" });
        const response = NextResponse.json({
            message: "Login successfull",
            success: true,
        }) 
        response.cookies.set("token",token,{
            httpOnly: true,
        })
        return response;

    }catch(error: any){
        return NextResponse.json({error: error.message},
            {status: 500}
        )
    }
}