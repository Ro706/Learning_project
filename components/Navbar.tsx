"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useRouter, usePathname } from "next/navigation";

export default function Navbar() {

  const router = useRouter();
  const pathname = usePathname();

  const [user, setUser] = useState("");

  const getUserDetails = async () => {
    try {

      const res = await axios.get("/api/users/userdata");

      console.log(res.data);

      setUser(res.data.data._id);

      console.log("User data set successfully");

    } catch (error: any) {

      console.log(error.message);

      setUser("");

      // Optional
      // toast.error(error.response?.data?.error || "Something went wrong");
    }
  };

  useEffect(() => {

    getUserDetails();

  }, [pathname]);

  const logout = async () => {
    try {

      await axios.get("/api/users/logout");

      toast.success("Logout Successfully");

      setUser("");

      router.push("/login");

    } catch (error: any) {

      console.log(error.message);

      toast.error(error.response?.data?.error || "Logout failed");
    }
  };

  return (
    <nav className="bg-black text-white px-6 py-4 shadow-md">

      <div className="max-w-7xl mx-auto flex items-center justify-between">

        {/* Logo */}
        <h1 className="text-2xl font-bold">MyApp</h1>

        {/* Nav Links */}
        <ul className="flex gap-6 text-lg items-center">

          <li>
            <Link
              href="/"
              className="hover:text-gray-300 transition duration-200"
            >
              Home
            </Link>
          </li>

          <li>
            <Link
              href="/about"
              className="hover:text-gray-300 transition duration-200"
            >
              About
            </Link>
          </li>

          <li>
            <Link
              href="/profile"
              className="hover:text-gray-300 transition duration-200"
            >
              Profile
            </Link>
          </li>

          <li>
            {user ? (
              <button
                className="bg-red-600 hover:bg-red-700 text-white py-1 px-3 font-bold rounded focus:outline-none focus:ring-4 focus:ring-red-300"
                onClick={logout}
              >
                Logout
              </button>
            ) : (
              <Link
                href="/login"
                className="hover:text-gray-300 transition duration-200"
              >
                User
              </Link>
            )}
          </li>

        </ul>
      </div>
    </nav>
  );
}