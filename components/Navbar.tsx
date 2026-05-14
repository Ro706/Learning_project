// components/Navbar.tsx

"use client";

import Link from "next/link";
import axios from "axios";
import tost from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function Navbar() {
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
    <nav className="bg-black text-white px-6 py-4 shadow-md">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        
        {/* Logo */}
        <h1 className="text-2xl font-bold">MyApp</h1>

        {/* Nav Links */}
        <ul className="flex gap-6 text-lg">
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
            <button className="bg-red-600 hover:bg-red-700 text-white py-1 px-2 font-bold rounded focus:outline-none focus:ring-4 focus:ring-red-300" onClick={Logout}>Logout</button>
          </li>
        </ul>
      </div>
    </nav>
  );
}