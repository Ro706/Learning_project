"use client";

import axios from "axios";
import { useEffect, useState } from "react";

export default function Userprofile({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const [id, setId] = useState("");
    const [username, setUsername] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const resolvedParams = await params;
                setId(resolvedParams.id);
                const res = await axios.get(
                    `/api/users/username/${resolvedParams.id}`
                );
                console.log(res.data);
                setUsername(res.data.data.username);
            } catch (error: any) {
                console.log(error.message);
            } finally {
                setLoading(false);
            }
        };
        fetchUser();

    }, [params]);
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-black">

            <h1 className="text-4xl font-bold font-serif text-white">
                Profile
            </h1>
            <p className="text-2xl text-white mt-4">
                ID: {id}
            </p>
            <p className="text-2xl text-yellow-400 mt-4">
                {
                    loading
                        ? "Loading..."
                        : `Username: ${username}`
                }
            </p>

        </div>
    );
}