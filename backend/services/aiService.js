import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";

dotenv.config();
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const generateContent = async (type, metadata) => {
    let prompt = "";

    switch (type) {
        case "blog":
            prompt = `Write a blog post about "${metadata.title}" with the following description: "${metadata.description}"`;
            break;
        case "instagram":
            prompt = `Create an engaging Instagram caption for "${metadata.title}". Include hashtags.`;
            break;
        case "twitter":
            prompt = `Generate a short and catchy Twitter post about "${metadata.title}".`;
            break;
        default:
            throw new Error("Invalid content type");
    }

    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    const response = await model.generateContent(prompt);
    return response.response.text();
};

export default generateContent;
