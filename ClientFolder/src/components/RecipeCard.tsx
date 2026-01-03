import Image from "next/image";
import LikeButton from "./LikeButton";
import { useRouter } from "next/navigation";

interface recipeprops {
  RecipeId: number;
  RecipeName: string;
  ImageUrl: string;
  RecipeInstruction: string;
  RecipeDescription: string;
}

export default function RecipeCard({
    RecipeId,
    RecipeName,
    ImageUrl,
    RecipeDescription,
  }: recipeprops) {
    const router = useRouter();
  
    const navigationhandler = () => {
      router.push(`/recipeinfo/${RecipeId}`);
    };
  
    return (
      <div className="flex flex-col bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden border border-slate-200 w-full max-w-sm">
        
        {/* Image Section */}
        <div className="relative w-full h-48 overflow-hidden cursor-pointer group" onClick={navigationhandler}>
          <Image
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            src={ImageUrl || "https://img.spoonacular.com/recipes/665188-312x231.jpg"}
            alt={RecipeName}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>

        {/* Content Section */}
        <div className="flex flex-col gap-3 p-5">
          
          {/* Title */}
          <h2
            onClick={navigationhandler}
            className="text-xl font-bold text-slate-800 cursor-pointer hover:text-orange-600 transition-colors line-clamp-2 leading-tight"
            title={RecipeName}
          >
            {RecipeName}
          </h2>

          {/* Description */}
          <p className="text-sm text-slate-600 leading-relaxed line-clamp-3">
            {RecipeDescription?.length > 120
              ? `${RecipeDescription.substring(0, 120)}...`
              : RecipeDescription}
          </p>

          {/* Actions */}
          <div className="flex items-center justify-between mt-2 pt-3 border-t border-slate-100">
            <button
              onClick={navigationhandler}
              className="text-orange-600 font-semibold text-sm hover:text-orange-700 transition-colors cursor-pointer"
            >
              View Recipe →
            </button>
            
            <LikeButton RecipeId={RecipeId} />
          </div>
        </div>
      </div>
    );
  }