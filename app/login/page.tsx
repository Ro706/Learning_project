"use client"
import Link from "next/link";
import React,  { useEffect } from "react";
import {useRouter} from "next/navigation";
import axios  from "axios";
import {toast} from "react-hot-toast";
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
            router.refresh();
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
                <div className="mt-4 text-sm flex flex-col gap-2">
                    <div>If you don't have account <Link href="/signup" className="text-black underline bold">click here</Link></div>
                    <div><Link href="/forgotpassword" className="text-black underline bold">Forgot Password?</Link></div>
                </div>
            </div>)}
        </div>
    );
};