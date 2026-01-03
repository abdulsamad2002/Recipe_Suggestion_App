'use client'

import Cards from "@/components/Cards";
import SearchBar from "@/components/SearchBar";
import NavBar from "@/components/NavBar";
import { useAuth } from "@/authcontext/Authcontext";
import { ClipLoader } from "react-spinners";

export default function Home() {
  
  const auth = useAuth();

  if (!auth.posts) {
    return (
      <div className="bg-amber-50 min-h-screen w-full flex justify-center items-center">
        <ClipLoader color="#ea580c" size={60} />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-amber-50">
      <NavBar />
      
      <div className="flex flex-col items-center flex-1">
        <SearchBar />

        {auth.loading ? (
          <div className="flex flex-col justify-center items-center flex-1 gap-6 px-4">
            <ClipLoader color="#ea580c" size={50} />
            <div className="text-center max-w-md">
              <p className="text-slate-700 font-medium mb-2">
                Finding delicious recipes for you...
              </p>
              <p className="text-sm text-slate-500">
                Press the Refresh button if some recipes fail to appear!
              </p>
            </div>
          </div>
        ) : (
          <Cards {...auth.posts} />
        )}
      </div>
    </div>
  );
}