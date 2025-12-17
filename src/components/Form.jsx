import '../App.css'
import React,{useState} from 'react'
import IngredientList from './IngredientsList'
import ClaudeRecipe from './ClaudeRecipe'
import { getRecipeFromGemini } from "./ai.js";

export const Form=()=>{
    const [ingredients, setIngredients] = React.useState([])
   
    const[recipeShown,setrecipeShown]=React.useState(false);
    const [recipe, setRecipe] = React.useState("");
    const [isLoading, setIsLoading] = React.useState(false);

    function addIngredient(formData) {
        const newIngredient = formData.get("ingredient")
        setIngredients(prevIngredients => [...prevIngredients, newIngredient])
    }

    async function handlebutton(){
      const recipeMarkdown = await getRecipeFromGemini(ingredients);
      setRecipe(recipeMarkdown)
      setrecipeShown(true)

    }

    return (
        <main>
            <form action={addIngredient} className="add-ingredient-form">
                <input
                    type="text"
                    placeholder="e.g. oregano"
                    aria-label="Add ingredient"
                    name="ingredient"
                    required
                />

                <button>Add ingredient</button>

            </form >

            {ingredients.length > 0 && <IngredientList ingredients={ingredients} handlebutton={handlebutton} />}



            {recipeShown==true && <ClaudeRecipe recipe={recipe}/>}
    
  </main>

                )}