export default function About() {
  const db_connection = `
import mongoose from 'mongoose';

export async function connect() {
    try {
        if (mongoose.connection.readyState >= 1) {
            return;
        }

        await mongoose.connect(process.env.MONGODB_URI!);

        const connection = mongoose.connection;

        connection.on('connected', () => {
            console.log('MongoDB connected successfully');
        });

        connection.on('error', (err) => {
            console.error('MongoDB connection error: ' + err);
            process.exit();
        });

    } catch (error) {
        console.error("Something went wrong!");
        console.error(error);
    }
}
`;

  const model_code = `
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
`;
    const login_route=`
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
    `
    const signup_code=`
import {connect} from "@/lib/dbConnect";
import UserModel from "@/models/userModel";
import { NextRequest,NextResponse } from "next/server";
import bcrypt from "bcryptjs";

connect()
export async function POST(request: NextRequest){
    try{
        const reqBody = await request.json()
        const {username,email,password} = reqBody

        console.log(reqBody);
        //check if user already exists
        const user = await UserModel.findOne({email})
        if(user){
            return NextResponse.json({error: "User already exists"},
                {status: 400}
            )
        }
        //hash password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password,salt)
        const newUser = new UserModel({
            username,
            email,
            password: hashedPassword
        })
        const savedUser = await newUser.save() 
        console.log(savedUser);
        return NextResponse.json({
            message: "User created successfully",
            success: true,
            savedUser
        })   
    }catch(error: any){
        return NextResponse.json({error: error.message},
            {status: 500}
        )
    }
}
    `
    const logout_code=`
    import { NextResponse } from "next/server";
    
    export async function GET(){
        try{
            const response = NextResponse.json({
                message: "Logout successfull",
                success: true,
            })
            response.cookies.set("token","",{
                httpOnly: true, 
                expires:new Date(0)
            })
            return response;
        }catch(error: any){
            return NextResponse.json({error: error.message},
                {status: 500}
            );
        }
    }
    `
    const signup_code_page=`
    "use client"
import Link from "next/link";
import React, { useEffect } from "react";
import {useRouter} from "next/navigation";
import axios  from "axios";
import {Toaster,toast} from "react-hot-toast";

export default function Signup() {
    const router = useRouter();
    const [user,setUser]=React.useState({
        email:"",
        password:"",
        username:"",
    })
    const [buttonDisabled,setButtonDisabled]=React.useState(false);
    const [loading, setLoading] = React.useState(false);
    const onSignup=async ()=>{
        try{
            setLoading(true);
            const response = await axios.post("/api/users/signup",user)
            console.log("Signup success", response.data);
            router.push("/login");

        }catch(error: any){
            console.log("Signup failed", error.message); 
            toast.error(error.message)
        }finally{
            setLoading(false);
        }
    }
    useEffect(()=>{
        if(user.email.length > 0 && user.password.length > 0 && user.username.length > 0){
            setButtonDisabled(false);
        }else{
            setButtonDisabled(true);
        }
    },[user]);

    return(
        <div className="flex flex-col items-center justify-center min-h-screen py-2 p-4" >
            {loading ? (
                <div className="loader">
                <div className="text"><span>Loading</span></div>
                <div className="text"><span>Loading</span></div>
                <div className="text"><span>Loading</span></div>
                <div className="text"><span>Loading</span></div>
                <div className="text"><span>Loading</span></div>
                <div className="text"><span>Loading</span></div>
                <div className="text"><span>Loading</span></div>
                <div className="text"><span>Loading</span></div>
                <div className="text"><span>Loading</span></div>
                <div className="line"></div>
                </div>

            ) : (
            <div className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-600 bg-[length:200%_200%] animate-gradient font-serif rounded-3xl text-white px-35 py-25">
                <h1 className="text-5xl py-9 bold-2 font-bold">Sign up</h1>
                <label htmlFor="username" className="flex flex-col items-left text-left text-sm py-2">username: </label>
                <input type="text" 
                id="username" 
                className="w-full p-3 rounded-xl border border-white/50 bg-white/10 text-white placeholder-gray-300 focus:outline-none focus:border-white"
                value={user.username}
                onChange={(e)=>setUser({...user,username: e.target.value})} 
                placeholder="username"
                />
                <label htmlFor="email" className="flex flex-col items-left text-left text-sm py-2">Eamil: </label>
                <input type="text" 
                id="email" 
                className="w-full p-3 rounded-xl border border-white/50 bg-white/10 text-white placeholder-gray-300 focus:outline-none focus:border-white"
                value={user.email}
                onChange={(e)=>setUser({...user,email: e.target.value})} 
                placeholder="email"
                />
                <label htmlFor="password" className="flex flex-col items-left text-left text-sm py-2">password: </label>
                <input type="password" 
                id="password" 
                className="w-full p-3 rounded-xl border border-white/50 bg-white/10 text-white placeholder-gray-300 focus:outline-none focus:border-white"
                value={user.password}
                onChange={(e)=>setUser({...user,password: e.target.value})} 
                placeholder="password"
                />
                <button className="bg-white hover:bg-gray-200 text-black mt-4 px-4 py-2 rounded-lg transition border-2 border-white" 
                onClick={onSignup} 
                >
                    {buttonDisabled ? "No Signup" : "Signup"}
                </button> <br/>
                <div className="mt-4 text-sm">If you are already login <Link href="/login" className="text-black underline bold">click here</Link></div>
            </div>)}
        </div>
    );
};
    `
    const login_code_page=`
    "use client"
    import Link from "next/link";
    import React,  { useEffect } from "react";
    import {useRouter} from "next/navigation";
    import axios  from "axios";
    import {Toaster,toast} from "react-hot-toast";
    export default function Login() {
        const router = useRouter();
        const [buttonDisabled,setButtonDisabled]=React.useState(false);
        const [loading, setLoading] = React.useState(false);
        const [user,setUser]=React.useState({
            email:"",
            password:"",
        })
        const onLogin=async ()=>{
            try{
                setLoading(true);
                const response = await axios.post("/api/users/login",user)
                console.log("Login success", response.data);
                toast.success("Login success");
                router.push('/profile');
    
            }catch(error: any){
                console.log("login failed", error.message); 
                toast.error(error.message)
            }finally{
                setLoading(false);
            }
        }
        useEffect(()=>{
                if(user.email.length > 0 && user.password.length > 0){
                    setButtonDisabled(false);
                }else{
                    setButtonDisabled(true);
                }
            },[user]);
        return(
            <div className="flex flex-col items-center justify-center min-h-screen py-2 p-4" >
                {loading ? (
                    <div className="loader">
                    <div className="text"><span>Loading</span></div>
                    <div className="text"><span>Loading</span></div>
                    <div className="text"><span>Loading</span></div>
                    <div className="text"><span>Loading</span></div>
                    <div className="text"><span>Loading</span></div>
                    <div className="text"><span>Loading</span></div>
                    <div className="text"><span>Loading</span></div>
                    <div className="text"><span>Loading</span></div>
                    <div className="text"><span>Loading</span></div>
                    <div className="line"></div>
                    </div>
    
                ) : (
                <div className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-600 bg-[length:200%_200%] animate-gradient font-serif rounded-3xl text-white px-35 py-25">
                    <h1 className="text-5xl py-9 bold-2 font-bold">Login</h1>
                    <label htmlFor="email" className="flex flex-col items-left text-left text-sm py-2">Eamil: </label>
                    <input type="text" 
                    id="email" 
                    className="w-full p-3 rounded-xl border border-white/50 bg-white/10 text-white placeholder-gray-300 focus:outline-none focus:border-white"
                    value={user.email}
                    onChange={(e)=>setUser({...user,email: e.target.value})} 
                    placeholder="email"
                    />
                    <label htmlFor="password" className="flex flex-col items-left text-left text-sm py-2">password: </label>
                    <input type="password" 
                    id="password" 
                    className="w-full p-3 rounded-xl border border-white/50 bg-white/10 text-white placeholder-gray-300 focus:outline-none focus:border-white"
                    value={user.password}
                    onChange={(e)=>setUser({...user,password: e.target.value})} 
                    placeholder="password"
                    />
                    <button className="bg-white hover:bg-gray-200 text-black mt-4 px-4 py-2 rounded-lg transition border-2 border-white" 
                    onClick={onLogin} 
                    >
                        {buttonDisabled ? "No Login" : "Login"}
                    </button> <br/>
                    <div className="mt-4 text-sm">If you don't have account <Link href="/signup" className="text-black underline bold">click here</Link></div>
                </div>)}
            </div>
        );
    };
    `
    const profile_page=`
"use client"
import axios from "axios";
import tost from "react-hot-toast";
import { useRouter } from "next/navigation";
export default function profile(){
    const router = useRouter();
    const Logout = async () =>{
        try{
            await axios.get("/api/users/logout");
            tost.success('Logout Successfully');
            router.push('/login')
        }catch(error : any){
            console.log(error.message);
            tost.error(error.message);
        }
    }
    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2 p-4">
            <h1 className="text-4xl bold font-serif">Profile Page</h1>
            <button className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-4 focus:ring-red-300" onClick={Logout}>Logout</button>
        </div>
    )
}
    `
  return (
    <div className="min-h-screen p-4 bg-black text-white">
      
      <h1 className="text-4xl font-bold font-serif text-center">
        About this App
      </h1>

      <p className="text-left mt-6 px-4 py-4">
        This is a Next.js app.
      </p>

      <ul className="text-left mt-6 px-10 space-y-8">
        
        <li>
          <p>
            How to create page in Next.js: 
            <span className="text-yellow-400">
              {" "}app/page_name/page.tsx
            </span>
          </p>

          <p>
            By this method we can create a page in web application.
          </p>
        </li>

        <li>
          <p>
            How to connect DB in Next.js:
            <span className="text-yellow-400">
              {" "}lib/connect_db.ts
            </span>
          </p>

          <pre className="bg-gray-900 p-4 rounded-lg overflow-x-auto text-sm mt-4">
            <code>{db_connection}</code>
          </pre>
        </li>

        <li>
          <p>
            How to define models in Next.js:
            <span className="text-yellow-400">
              {" "}model/userModel.ts
            </span>
          </p>

          <pre className="bg-gray-900 p-4 rounded-lg overflow-x-auto text-sm mt-4">
            <code>{model_code}</code>
          </pre>
        </li>
        <li>
            <p>
                How to define routes in Next.js:
                <span className="text-yellow-400">
              {" "}api/users/featurename/route.ts <br/>
            </span>
            Login :<br/>
            <pre className="bg-gray-900 p-4 rounded-lg overflow-x-auto text-sm mt-4">
                <code>{login_route}</code>
            </pre>
            <br/>
            Signup :<br/>
            <pre className="bg-gray-900 p-4 rounded-lg overflow-x-auto text-sm mt-4">
                <code>{signup_code}</code>
            </pre>
            <br/>
            Logout :<br/>
            <pre className="bg-gray-900 p-4 rounded-lg overflow-x-auto text-sm mt-4">
                <code>{logout_code}</code>
            </pre>
            <br/>
            </p>
        </li>
        <li>
            <p>
                how to integrate this in page.tsx:<br/>
                <span className="text-yellow-400">
                    {" "}app/signup/page.tsx <br/>
                </span>
            <pre className="bg-gray-900 p-4 rounded-lg overflow-x-auto text-sm mt-4">
                <code>{signup_code_page}</code>
            </pre>
            <br/>
            <span className="text-yellow-400">
                    {" "}app/login/page.tsx <br/>
            </span>
            <pre className="bg-gray-900 p-4 rounded-lg overflow-x-auto text-sm mt-4">
                <code>{login_code_page}</code>
            </pre>
            <br/>
            <span className="text-yellow-400">
                    {" "}app/profile/page.tsx <br/>
            </span>
            <pre className="bg-gray-900 p-4 rounded-lg overflow-x-auto text-sm mt-4">
                <code>{profile_page}</code>
            </pre>
            </p>
            
        </li>

      </ul>
    </div>
  );
}