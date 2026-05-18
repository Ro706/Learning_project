"use client";

import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";

export default function VerifyEmailPage() {
    const [token, setToken] = useState("");
    const [verified, setVerified] = useState(false);
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);

    const verifyUserEmail = async () => {
        try {
            setLoading(true);

            await axios.post("/api/users/verifyemail", { token });

            setVerified(true);
        } catch (error: any) {
            setError(true);
            console.log(error?.response?.data || error.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const urlToken = new URLSearchParams(window.location.search).get("token");

        setToken(urlToken || "");
    }, []);

    useEffect(() => {
        if (token.length > 0) {
            verifyUserEmail();
        }
    }, [token]);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-black text-white">
            <h1 className="text-4xl mb-4">Verify Email</h1>

            <h2 className="p-2 break-all">
                {token ? token : "No token found"}
            </h2>

            {loading && (
                <h2 className="text-yellow-400">Verifying...</h2>
            )}

            {verified && (
                <div className="flex flex-col items-center gap-2">
                    <h2 className="text-2xl text-green-500">
                        Email Verified
                    </h2>

                    <Link
                        href="/login"
                        className="underline text-blue-400"
                    >
                        Login
                    </Link>
                </div>
            )}

            {error && (
                <div>
                    <h2 className="text-2xl text-red-500">
                        Error verifying email
                    </h2>
                </div>
            )}
        </div>
    );
}