import { GoogleGenerativeAI } from "@google/generative-ai";

const SYSTEM_PROMPT = `
You are an assistant that receives a list of ingredients and suggests a recipe. 
Format your response in markdown. Use headings, bullet points for ingredients, 
and numbered steps for instructions.
`;

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);

const model = genAI.getGenerativeModel({ 
    model: "gemini-2.5-flash",
    systemInstruction: SYSTEM_PROMPT, 
});

export async function getRecipeFromGemini(ingredientsArr) {
    const ingredientsString = ingredientsArr.join(", ");
    
    try {
       
        const result = await model.generateContent(
            `I have these ingredients: ${ingredientsString}. Please suggest a recipe!`
        );
        
        const response = await result.response;
        const text = response.text();
        
        return text;
    } catch (err) {
        console.error("Gemini Error:", err);
        return "I'm sorry, I encountered an error while cooking up your recipe.";
    }
}