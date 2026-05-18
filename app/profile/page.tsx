"use client";

import axios from "axios";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function Profile() {
    const [user, setUser] = useState("nothing");

    const getUserDetails = async () => {
        try {
            const res = await axios.get("/api/users/userdata");
            console.log(res.data);
            setUser(res.data.data._id);
        } catch (error: any) {
            console.log(error.message);
            toast.error(error.response?.data?.error || "Something went wrong");
        }
    };

    useEffect(()=>{
        getUserDetails()
    }) // This is like a trigger it run automatically once page is load

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2 p-4">
            <h1 className="text-4xl font-bold font-serif">
                Profile Page
            </h1>
            <h2 className="text-2xl font-bold font-serif mt-4">
            <Link
                        href={`/profile/${user}`}
                        className="text-blue-500 hover:underline"
                    >
                        Click here
                    </Link>
            </h2>
        </div>
    );
}