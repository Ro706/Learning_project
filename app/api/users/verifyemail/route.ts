import {connect} from "@/lib/dbConnect";
import { NextRequest,NextResponse } from "next/server";
import  User from "@/models/userModel";

connect()

export async function POST(request: NextRequest){
    try{
        
    }catch(error: any){
        return NextResponse.json({
            error:  error.message
        },{
            status: 500
        })
    }
}