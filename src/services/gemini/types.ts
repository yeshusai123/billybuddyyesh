export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  imageUrl?: string;
}

export interface ChatResponse {
  message: string;
  error?: string;
}

export interface ChatHistory {
  messages: ChatMessage[];
  sessionId: string;
}

export interface ImageProcessingResult {
  text: string;
  confidence?: number;
}

export interface FileValidationError {
  code: string;
  message: string;
}