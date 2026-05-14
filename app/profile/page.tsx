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