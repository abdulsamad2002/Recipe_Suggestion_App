'use client';

import { useAuth } from '@/authcontext/Authcontext';
import NavBar from '@/components/NavBar';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { ClipLoader } from 'react-spinners';

interface recipeprops {
  RecipeId: number;
  RecipeName: string;
  ImageUrl: string;
  RecipeInstruction: string;
  RecipeDescription: string;
  Like: number;
}

export default function Page() {
  const params = useParams();
  const auth = useAuth();
  const id = params?.id;

  const [dish, setDish] = useState<recipeprops | undefined>(undefined);
  const [instructions, setInstructions] = useState<string | undefined>("");
  const [loadinginstructinos, setloadinginstructions] = useState<boolean | undefined>(false);

  useEffect(() => {
    if (!id || !auth.posts) return;

    const numericId = parseInt(id as string);
    const foundDish = auth.posts.recipes.find((ob) => ob.RecipeId === numericId);
    setDish(foundDish);
  }, [id, auth.posts]);

  const instructionshandler = async () => {
    if (!dish) return;
    try {
      console.log(dish.RecipeName);
      setloadinginstructions(true);
      const res = await fetch(`https://recipe-suggestion-app-vtq8.onrender.com/instructions?name=${dish.RecipeName}&id=${dish.RecipeId}`, {
        method: "GET",
        credentials: "include",
      });
      const data = await res.json();
      const instructions = data.instructions;
      if (instructions) {
        setInstructions(instructions);
        setloadinginstructions(false);
      }
    } catch (err) {
      console.error("error fetching instructions in frontend", err);
    }
  };

  useEffect(() => {
    if (dish) {
      instructionshandler();
    }
  }, [dish]);

  if (!dish) {
    return (
      <>
        <NavBar />
        <div className="flex flex-col items-center justify-center h-screen bg-amber-50">
          <ClipLoader color="#ea580c" size={50} />
          <p className="text-slate-600 mt-4">Loading recipe...</p>
        </div>
      </>
    );
  }

  return (
    <div className="h-screen flex flex-col bg-amber-50">
      <NavBar />
      
      <div className="flex-1 flex items-center justify-center p-4 md:p-8 overflow-hidden">
        <div className="bg-white rounded-xl shadow-md border border-slate-200 flex flex-col md:flex-row max-w-6xl w-full h-full max-h-[calc(100vh-120px)]">
          
          {/* Left side: Image and Info */}
          <div className="md:w-5/12 flex flex-col p-6 border-r border-slate-200">
            <div className="w-full h-48 md:h-64 mb-4 flex-shrink-0">
              <img
                src={dish.ImageUrl}
                alt={dish.RecipeName}
                className="w-full h-full object-cover rounded-lg"
              />
            </div>
            
            <div className="flex items-center gap-2 mb-4">
              <span className="text-2xl">❤️</span>
              <span className="text-lg font-semibold text-red-600">{dish.Like}</span>
            </div>
            
            <h1 className="text-2xl md:text-3xl font-bold text-slate-800 mb-4">
              {dish.RecipeName}
            </h1>
            
            <p className="text-slate-600 leading-relaxed overflow-y-auto flex-1">
              {dish.RecipeDescription}
            </p>
          </div>

          {/* Right side: Instructions */}
          <div className="md:w-7/12 flex flex-col p-6 md:p-8 overflow-hidden">
            <h2 className="text-2xl font-bold text-slate-800 mb-4 flex items-center gap-2 flex-shrink-0">
              <span>📝</span>
              Instructions
            </h2>
            
            <div className="flex-1 overflow-y-auto pr-2">
              {loadinginstructinos ? (
                <div className="flex flex-col items-center justify-center h-full">
                  <ClipLoader color="#ea580c" size={40} />
                  <p className="text-slate-600 mt-4">Loading instructions...</p>
                </div>
              ) : (
                <p className="whitespace-pre-line text-slate-700 leading-relaxed">
                  {instructions}
                </p>
              )}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}