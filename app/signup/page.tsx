"use client"
import Link from "next/link";
import React from "react";
import {useRouter} from "next/navigation";
import { axios } from "axios";

export default function Signup() {
    const [user,setUser]=React.useState({
        email:"",
        password:"",
        username:"",
    })
    const onSignup=async ()=>{

    }
    return(
        <div className="flex flex-col items-center justify-center min-h-screen py-2 p-4" >
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
                    Sign Up
                </button> <br/>
                <div className="mt-4 text-sm">If you are already login <Link href="/login" className="text-black underline bold">click here</Link></div>
            </div>
        </div>
    );
};