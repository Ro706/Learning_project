"use client"
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import axios from "axios";
import { toast } from "react-hot-toast";

export default function ForgotPasswordPage() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [token, setToken] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [emailSent, setEmailSent] = useState(false);

    useEffect(() => {
        const urlToken = searchParams.get("token");
        setToken(urlToken || "");
    }, [searchParams]);

    const onRequestReset = async () => {
        try {
            setLoading(true);
            await axios.post("/api/users/forgotpassword/request", { email });
            toast.success("Reset link sent to your email");
            setEmailSent(true);
        } catch (error: any) {
            console.log("Request failed", error.response?.data?.error || error.message);
            toast.error(error.response?.data?.error || "Failed to send reset link");
        } finally {
            setLoading(false);
        }
    }

    const onResetPassword = async () => {
        if (password !== confirmPassword) {
            toast.error("Passwords do not match");
            return;
        }

        try {
            setLoading(true);
            await axios.post("/api/users/forgotpassword", { token, password });
            toast.success("Password reset successful");
            router.push("/login");
        } catch (error: any) {
            console.log("Reset failed", error.response?.data?.error || error.message);
            toast.error(error.response?.data?.error || "Failed to reset password");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2 p-4">
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
                <div className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-600 bg-[length:200%_200%] animate-gradient font-serif rounded-3xl text-white px-8 md:px-16 py-12 md:py-20 w-full max-w-md shadow-2xl">
                    <h1 className="text-4xl font-bold mb-8 text-center">
                        {token ? "Reset Password" : "Forgot Password"}
                    </h1>

                    {!token ? (
                        // Request Reset Form
                        <div className="space-y-6">
                            {emailSent ? (
                                <div className="text-center">
                                    <p className="text-lg mb-6">If an account exists for {email}, you will receive a password reset link shortly.</p>
                                    <Link href="/login" className="bg-white text-black px-6 py-2 rounded-lg font-bold hover:bg-gray-200 transition">
                                        Back to Login
                                    </Link>
                                </div>
                            ) : (
                                <>
                                    <div className="space-y-2">
                                        <label htmlFor="email" className="block text-sm font-medium">Email Address</label>
                                        <input 
                                            type="email" 
                                            id="email" 
                                            className="w-full p-3 rounded-xl border border-white/50 bg-white/10 text-white placeholder-gray-300 focus:outline-none focus:border-white transition"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)} 
                                            placeholder="Enter your email"
                                        />
                                    </div>
                                    <button 
                                        className="w-full bg-white hover:bg-gray-200 text-black font-bold py-3 rounded-xl transition duration-300 border-2 border-white disabled:opacity-50" 
                                        onClick={onRequestReset}
                                        disabled={!email}
                                    >
                                        Send Reset Link
                                    </button>
                                    <div className="text-center text-sm">
                                        Remember your password? <Link href="/login" className="underline font-bold">Login</Link>
                                    </div>
                                </>
                            )}
                        </div>
                    ) : (
                        // Reset Password Form
                        <div className="space-y-6">
                            <div className="space-y-2">
                                <label htmlFor="password" className="block text-sm font-medium">New Password</label>
                                <input 
                                    type="password" 
                                    id="password" 
                                    className="w-full p-3 rounded-xl border border-white/50 bg-white/10 text-white placeholder-gray-300 focus:outline-none focus:border-white transition"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)} 
                                    placeholder="Enter new password"
                                />
                            </div>
                            <div className="space-y-2">
                                <label htmlFor="confirmPassword" className="block text-sm font-medium">Confirm Password</label>
                                <input 
                                    type="password" 
                                    id="confirmPassword" 
                                    className="w-full p-3 rounded-xl border border-white/50 bg-white/10 text-white placeholder-gray-300 focus:outline-none focus:border-white transition"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)} 
                                    placeholder="Confirm new password"
                                />
                            </div>
                            <button 
                                className="w-full bg-white hover:bg-gray-200 text-black font-bold py-3 rounded-xl transition duration-300 border-2 border-white disabled:opacity-50" 
                                onClick={onResetPassword}
                                disabled={!password || !confirmPassword}
                            >
                                Reset Password
                            </button>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
