import { genAI, MODEL_NAME } from "./config";
import { CHAT_PROMPTS } from "./prompts";
import { ChatResponse } from "./types";

export class ChatService {
  private static instance: ChatService;
  private model = genAI.getGenerativeModel({ model: MODEL_NAME });
  private chat = this.createChatSession();

  // Private constructor to ensure singleton
  private constructor() {}

  /**
   * Singleton instance getter
   */
  public static getInstance(): ChatService {
    if (!ChatService.instance) {
      ChatService.instance = new ChatService();
    }
    return ChatService.instance;
  }

  /**
   * Creates a new chat session with initial context
   */
  private createChatSession() {
    return this.model.startChat({
      history: [
        {
          role: "user",
          parts: CHAT_PROMPTS.INITIAL_CONTEXT,
        },
      ],
    });
  }

  /**
   * Sends a message to the Gemini model and returns a chat response
   */
  public async sendMessage(message: string): Promise<ChatResponse> {
    try {
      const result = await this.chat.sendMessage(message);
      const response = await result.response;
      const text = response.text();

      // If Gemini returned nothing
      if (!text || text.trim() === "") {
        throw new Error("Empty response from Gemini model");
      }

      return { message: text };
    } catch (error) {
      console.error("❌ Error in ChatService:", error);

      // Try restarting chat session if it failed
      this.chat = this.createChatSession();

      return {
        message:
          "I’m having trouble understanding your message right now. Could you please try again?",
        error: error instanceof Error ? error.message : "Unknown error occurred",
      };
    }
  }

  /**
   * Analyzes a message for distress or negativity on a scale of 1–10
   */
  public async analyzeMessageSentiment(message: string): Promise<number> {
    try {
      const prompt = `
        Analyze the emotional tone of the following message on a scale of 1 to 10.
        1 = calm/neutral, 10 = severe distress or urgency.
        Only return the number.
        Message: "${message}"
      `;

      const result = await this.model.generateContent(prompt);
      const response = await result.response;
      const sentiment = parseInt(response.text().trim(), 10);

      // Ensure number validity
      if (isNaN(sentiment) || sentiment < 1 || sentiment > 10) {
        console.warn("⚠️ Invalid sentiment value from model:", response.text());
        return 5; // neutral fallback
      }

      return sentiment;
    } catch (error) {
      console.error("❌ Error analyzing sentiment:", error);
      return 5;
    }
  }
}
