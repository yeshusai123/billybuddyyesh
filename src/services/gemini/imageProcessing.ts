import { GoogleGenerativeAI } from '@google/generative-ai';
import { fileToGenerativePart } from './utils';

const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

if (!GEMINI_API_KEY) {
  throw new Error('GEMINI_API_KEY environment variable is not defined');
}

const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);

export class ImageProcessingService {
  private static instance: ImageProcessingService;
  private model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  private constructor() {}

  public static getInstance(): ImageProcessingService {
    if (!ImageProcessingService.instance) {
      ImageProcessingService.instance = new ImageProcessingService();
    }
    return ImageProcessingService.instance;
  }

  public async extractTextFromImage(file: File): Promise<string> {
    if (!this.validateImageFile(file)) {
      throw new Error('Invalid image file');
    }

    try {
      const imagePart = await fileToGenerativePart(file);
      const result = await this.model.generateContent([
        "Extract and return only the text content from this image.",
        imagePart
      ]);
      const response = await result.response;
      return response.text();
    } catch (error) {
      console.error('Error processing image:', error);
      throw error;
    }
  }

  private validateImageFile(file: File): boolean {
    const validTypes = ['image/jpeg', 'image/png', 'image/webp'];
    const maxSize = 10 * 1024 * 1024; // 10MB
    return validTypes.includes(file.type) && file.size <= maxSize;
  }
}