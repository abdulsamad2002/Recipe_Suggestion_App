import React from 'react'
import Link from 'next/link'
import { useAuth } from '@/authcontext/Authcontext'

const NavBar = () => {
  const auth = useAuth();

  const loggouthandler = async () => {
    try {
      const res = await fetch("https://recipe-suggestion-app-vtq8.onrender.com/loggout", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });
      console.log(await res.json());
      auth.setUser(null);
    } catch (err) {
      console.log("error logging out", err);
    }
  };

  return (
    <nav className="w-full bg-white shadow-sm border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-6 py-5 flex justify-between items-center">
        
        {/* Logo/Brand */}
        <Link href="/" className="text-2xl font-bold text-orange-600 hover:text-orange-700 cursor-pointer transition-colors">
          Recipe Hub
        </Link>

        {/* Navigation Links */}
        <div className="flex items-center gap-8">
          <Link 
            href="/recipes" 
            className="text-slate-700 font-medium hover:text-orange-600 cursor-pointer transition-colors"
          >
            Recipes
          </Link>

          {/* Auth Links */}
          {!auth.user ? (
            <>
              <Link 
                href="/login" 
                className="text-slate-700 font-medium hover:text-orange-600 cursor-pointer transition-colors"
              >
                Login
              </Link>
              <Link 
                href="/signup" 
                className="px-6 py-2 bg-orange-600 text-white font-semibold rounded-full hover:bg-orange-700 cursor-pointer transition-colors shadow-sm"
              >
                Sign Up
              </Link>
            </>
          ) : (
            <button
              onClick={loggouthandler}
              className="px-6 py-2 bg-slate-700 text-white font-semibold rounded-full hover:bg-slate-800 cursor-pointer transition-colors shadow-sm"
            >
              Logout
            </button>
          )}
        </div>
      </div>
    </nav>
  )
}

export default NavBar;