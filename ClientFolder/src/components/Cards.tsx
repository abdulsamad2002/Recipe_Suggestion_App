import RecipeCard from "./RecipeCard"

interface post {
    RecipeId:number;
    RecipeName: string;
    ImageUrl: string;
    RecipeInstruction: string;
    RecipeDescription:string;
  }
  interface posts {
    recipes:post[];
  }
  
export default function Cards({ recipes }: posts) {
    return (
      <div className="w-full bg-amber-50 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {recipes.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {recipes.map((recipe: post, key) => (
                <RecipeCard {...recipe} key={key} />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-20">
              <div className="text-6xl mb-4">🍳</div>
              <h3 className="text-2xl font-bold text-slate-800 mb-2">
                No recipes found
              </h3>
              <p className="text-slate-600">
                Try adding some ingredients to discover delicious recipes!
              </p>
            </div>
          )}
        </div>
      </div>
    );
  }