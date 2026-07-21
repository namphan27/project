import { GoogleGenerativeAI } from "@google/generative-ai";
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY as string);

export const aiService = {
  chat: async (message: string) => {
    try {
      const model = genAI.getGenerativeModel({
        model: "gemini-2.5-flash",
      });

      const result = await model.generateContent(message);

      const response = result.response;

      return response.text();
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.log("GEMINI ERROR:", error.message);
      } else {
        console.log("GEMINI ERROR:", error);
      }

      throw new Error("Lỗi server AI");
    }
  },
};
