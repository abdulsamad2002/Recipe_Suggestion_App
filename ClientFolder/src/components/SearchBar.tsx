import { useAuth } from "@/authcontext/Authcontext";
import { MdOutlineRefresh } from "react-icons/md";

export default function SearchBar() {
  const auth = useAuth();

  const putinbasket = (
    event: React.MouseEvent<HTMLButtonElement> | React.KeyboardEvent<HTMLInputElement>,
    ingredient: string
  ): void => {
    event.preventDefault();
    if (!auth.cbingredients.includes(ingredient)) {
      auth.setcbIngredients([...auth.cbingredients, ingredient]);
    }
    auth.setInputval("");
    console.log(auth.cbingredients);
  };

  const handlekeydown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      putinbasket(event, auth.inputval);
    }
  };

  const handlecheckbox = (ingredient: string) => {
    const filteredIng = auth.cbingredients.filter((el) => el !== ingredient);
    auth.setcbIngredients(filteredIng);
  };

  const handleRecipe = () => {
    auth.setIng([...auth.cbingredients]);
    console.log("set ingredients in handleRecipe", auth.cbingredients);
    auth.setloading(true);
  };

  return (
    <div className="py-8 w-full max-w-2xl mx-auto px-4 flex flex-col gap-6">
      
      {/* Search Input */}
      <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center">
        <input
          className="flex-1 h-12 px-4 rounded-lg border-2 border-slate-200 focus:border-orange-500 focus:outline-none text-slate-700 placeholder-slate-400 transition-colors"
          type="text"
          id="ingredient"
          placeholder="What's in your fridge?"
          value={auth.inputval}
          onChange={(e) => auth.setInputval(e.target.value)}
          onKeyDown={handlekeydown}
        />
        <button
          className="h-12 px-6 bg-orange-600 text-white font-semibold rounded-lg hover:bg-orange-700 transition-colors cursor-pointer shadow-sm"
          onClick={(event) => putinbasket(event, auth.inputval)}
        >
          Add to basket
        </button>
      </div>

      {/* Ingredients Basket */}
      {auth.cbingredients.length > 0 && (
        <div className="flex gap-2 flex-wrap py-2">
          {auth.cbingredients.map((ingredient, key) => (
            <label 
              key={key} 
              className="px-4 py-2 bg-white border-2 border-slate-200 rounded-full whitespace-nowrap cursor-pointer hover:border-orange-500 transition-colors flex items-center gap-2"
            >
              <input
                type="checkbox"
                className="w-4 h-4 cursor-pointer accent-orange-600"
                checked={auth.cbingredients.includes(ingredient)}
                onChange={() => handlecheckbox(ingredient)}
              />
              <span className="text-slate-700 font-medium">{ingredient}</span>
            </label>
          ))}
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex justify-center gap-4">
        <button 
          onClick={handleRecipe} 
          className="px-8 py-3 bg-orange-600 text-white font-semibold rounded-lg hover:bg-orange-700 transition-colors cursor-pointer shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={auth.cbingredients.length === 0}
        >
          Show Recipes
        </button>
        <button
          onClick={handleRecipe}
          className="w-12 h-12 bg-slate-200 text-slate-700 rounded-lg hover:bg-slate-300 transition-colors flex justify-center items-center text-2xl cursor-pointer shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={auth.cbingredients.length === 0}
          title="Refresh recipes"
        >
          <MdOutlineRefresh />
        </button>
      </div>
    </div>
  );
}