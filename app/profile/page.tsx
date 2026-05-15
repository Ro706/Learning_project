"use client";

import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";

export default function Profile() {
    const [user, setUser] = useState("nothing");
    const router = useRouter();
    const Logout = async () => {
        try {
            await axios.get("/api/users/logout");
            toast.success("Logout Successfully");
            router.push("/login");
        } catch (error: any) {
            console.log(error.message);
            toast.error(error.message);
        }
    };

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

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2 p-4">
            <h1 className="text-4xl font-bold font-serif">
                Profile Page
            </h1>
            <h2 className="text-2xl font-bold font-serif mt-4">
                {user === "nothing" ? (
                    "Nothing"
                ) : (
                    <Link
                        href={`/profile/${user}`}
                        className="text-blue-500 hover:underline"
                    >
                        {user}
                    </Link>
                )}
            </h2>
            <button
                className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mt-6"
                onClick={Logout}
            >
                Logout
            </button>
            <button
                className="bg-pink-600 mt-4 hover:bg-pink-700 text-white font-bold py-2 px-4 rounded"
                onClick={getUserDetails}
            >
                Get User
            </button>
        </div>
    );
}