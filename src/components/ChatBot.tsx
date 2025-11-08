import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, Paperclip, X, Mail, Download } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useChat } from '../hooks/useChat';
import { ImageProcessingService } from '../services/gemini/imageProcessing';
import { db } from '../services/gemini/config';
import { doc, setDoc } from 'firebase/firestore';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import EmailComponent from './email';



const ChatBot = () => {
  const [input, setInput] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [showNameModal, setShowNameModal] = useState(true);
  const [userName, setUserName] = useState<string>('');
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [showEmailModal, setShowEmailModal] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { messages, isLoading, error, sendMessage } = useChat();
  const imageProcessingService = ImageProcessingService.getInstance();

  useEffect(() => {
    if (selectedFile) {
      const objectUrl = URL.createObjectURL(selectedFile);
      setPreview(objectUrl);
      return () => URL.revokeObjectURL(objectUrl);
    }
  }, [selectedFile]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;
    
    const message = input;
    setInput('');
    await sendMessage(message);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      try {
        setSelectedFile(file);
        const extractedText = await imageProcessingService.extractTextFromImage(file);
        setInput(extractedText);
      } catch (error) {
        console.error('Error processing image:', error);
      }
    }
  };

  const removeImage = () => {
    setSelectedFile(null);
    setPreview(null);
  };

  const handleNameSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const userId = isAnonymous ? 
        `anon-${Date.now()}` : 
        userName.toLowerCase().replace(/\s+/g, '-');
        
      await setDoc(doc(db, 'users', userId), {
        name: isAnonymous ? 'Anonymous' : userName,
        isAnonymous,
        createdAt: new Date().toISOString()
      });

      setShowNameModal(false);
    } catch (error) {
      console.error('Error saving user:', error);
    }
  };

  const handleEmailOpen = () => {
    setShowEmailModal(true);
  };

  const downloadReport = () => {
    if (!messages.length) return;

    const report = messages
      .map(msg => {
        const time = msg.timestamp.toLocaleTimeString();
        return `[${time}] ${msg.role === 'user' ? 'User' : 'Assistant'}: ${msg.content}`;
      })
      .join('\n\n');

    const blob = new Blob([report], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `chat-report-${new Date().toISOString().split('T')[0]}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <>
      <AnimatePresence>
        {showNameModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
          >
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              className="bg-white p-6 rounded-xl shadow-xl w-[90%] max-w-md"
            >
              <h3 className="text-xl font-semibold mb-4">Welcome to Billy</h3>
              <form onSubmit={handleNameSubmit}>
                {!isAnonymous && (
                  <input
                    type="text"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    placeholder="Enter your name"
                    className="w-full p-2 border rounded-lg mb-4"
                  />
                )}
                <div className="flex items-center mb-4">
                  <input
                    type="checkbox"
                    id="anonymous"
                    checked={isAnonymous}
                    onChange={() => setIsAnonymous(!isAnonymous)}
                    className="mr-2"
                  />
                  <label htmlFor="anonymous">Stay Anonymous</label>
                </div>
                <button
                  type="submit"
                  className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700"
                >
                  Start Chat
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex flex-col h-[600px] bg-white rounded-2xl shadow-xl border border-indigo-100">
        <div className="p-4 border-b bg-gradient-to-r from-indigo-600 to-indigo-800 rounded-t-2xl">
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
              <Bot className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-white">Billy</h2>
              <p className="text-xs text-indigo-200">
                {isAnonymous ? 'Anonymous User' : userName || 'Select your name to begin'}
              </p>
            </div>
          </div>
        </div>

        <div className="flex-1 p-4 overflow-y-auto bg-gradient-to-b from-indigo-50/30 to-white">
          <AnimatePresence mode="wait">
            {messages.map((message) => (
              <motion.div
                key={`${message.role}-${message.timestamp.getTime()}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'} mb-4`}
              >
                {message.role === 'assistant' && (
                  <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center mr-2">
                    <Bot className="w-5 h-5 text-indigo-600" />
                  </div>
                )}
                <div
                  className={`max-w-[70%] p-3 rounded-2xl ${
                    message.role === 'user'
                      ? 'bg-gradient-to-r from-indigo-600 to-indigo-700 text-white rounded-br-none'
                      : 'bg-white border border-indigo-100 text-gray-800 rounded-bl-none shadow-sm'
                  }`}
                >
                  {message.content}
                  <div className={`text-xs mt-1 ${message.role === 'user' ? 'text-indigo-200' : 'text-gray-400'}`}>
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
          
          {isLoading && (
            <motion.div
              key="loading"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center space-x-2 text-gray-500"
            >
              <Bot className="w-5 h-5" />
              <div className="typing-indicator">
                <span></span>
                <span></span>
                <span></span>
              </div>
            </motion.div>
          )}
          
          {error && (
            <motion.div
              key="error"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-red-500 text-sm text-center my-2"
            >
              {error}
            </motion.div>
          )}
          
          <div ref={messagesEndRef} />
        </div>

        <div className="border-t p-4 bg-white rounded-b-2xl">
          {preview && (
            <div className="relative mb-2">
              <img 
                src={preview} 
                alt="Preview" 
                className="h-20 rounded-lg object-cover"
              />
              <button
                onClick={removeImage}
                className="absolute -top-2 -right-2 p-1 bg-red-500 rounded-full text-white hover:bg-red-600"
              >
                <X size={16} />
              </button>
            </div>
          )}
          <div className="flex space-x-2">
            <label className="p-2 text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors cursor-pointer">
              <input
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
                className="hidden"
              />
              <Paperclip className="w-5 h-5" />
            </label>
            
            {/* Add Email Button */}
            <button
              onClick={handleEmailOpen}
              className="p-2 text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
            >
              <Mail className="w-5 h-5" />
            </button>

            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type your message or upload an image..."
              className="flex-1 border rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              disabled={isLoading}
            />
            <button
              onClick={() => {
                sendMessage(input, selectedFile ?? undefined);
                setInput('');
                setSelectedFile(null);
                setPreview(null);
              }}
              disabled={!input.trim() && !selectedFile}
              className={`bg-gradient-to-r from-indigo-600 to-indigo-700 text-white rounded-xl px-4 py-2 transition-all duration-200 shadow-md ${
                isLoading || !input.trim()
                  ? 'opacity-50 cursor-not-allowed'
                  : 'hover:from-indigo-700 hover:to-indigo-800 hover:shadow-lg'
              }`}
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Add Email Modal */}
      <Dialog open={showEmailModal} onOpenChange={setShowEmailModal}>
        <DialogContent>
          <DialogHeader className="flex justify-between items-center">
            <DialogTitle>Send Email</DialogTitle>
            <button
              onClick={downloadReport}
              className="flex items-center gap-2 p-2 text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
            >
              <Download className="w-4 h-4" />
              Download Chat
            </button>
          </DialogHeader>
          <EmailComponent 
            onClose={() => setShowEmailModal(false)} 
            messages={messages}
          />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ChatBot;