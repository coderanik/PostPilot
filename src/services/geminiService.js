import { GoogleGenerativeAI } from "@google/generative-ai";

const API_KEY = import.meta.env.VITE_GENERATIVE_AI_API_KEY;

if (!API_KEY) {
  throw new Error("Missing GENERATIVE_AI_API_KEY in environment variables.");
}

const genAI = new GoogleGenerativeAI(API_KEY);

export async function generateContent({ title, companyName, productName, idealUser, email }) {
  try {
    console.log("Generating content with inputs:", { title, companyName, productName, idealUser, email });
    
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });

    const prompt = `
      Generate engaging marketing content for ${companyName || "N/A"} promoting ${productName || "N/A"}. The target audience is ${idealUser || "N/A"}, and the extracted title is ${title || "N/A"}. The content should highlight the unique value, features, and benefits of the product in an engaging way.

        Content Types:
        Instagram Post:

        Eye-catching caption (with emojis)
        Call-to-action (CTA)
        Relevant hashtags
        Twitter (X) Post:

        Concise, engaging tweet
        CTA and relevant hashtags
        Blog Post:

        Compelling introduction
        Detailed product insights
        Benefits for the ideal user
        Strong CTA at the end
        Ensure the content aligns with the brands voice and encourages engagement.
    `;

    console.log("Sending prompt to Gemini:", prompt);

    
    try {
     
      const result = await model.generateContentStream(prompt);
      let text = '';
      
      for await (const chunk of result.stream) {
        const chunkText = chunk.text();
        console.log("Received chunk:", chunkText);
        text += chunkText;
      }
      
      console.log("Complete generated content:", text);
      return text || "No content generated.";
    } catch (apiError) {
      console.error("Gemini API specific error:", apiError);
      console.error("Full error object:", JSON.stringify(apiError, null, 2));
      throw apiError;
    }
  } catch (error) {
    console.error("❌ Error generating content:", error);
    throw new Error("Error generating content: " + error.message);
  }
}