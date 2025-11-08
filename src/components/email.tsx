import { useState, useEffect } from 'react';
import { Send, AlertCircle, X, Upload, Bot } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Alert, AlertDescription } from './ui/alert';
import emailjs from '@emailjs/browser';
import { ChatMessage } from '../services/gemini/types';

interface EmailComponentProps {
  onClose: () => void;
  messages: ChatMessage[];
}

const EmailComponent = ({ onClose, messages }: EmailComponentProps) => {
  useEffect(() => {
    // Initialize EmailJS
    emailjs.init({
      publicKey: "YOUR_PUBLIC_KEY" // Replace with your actual public key
    });
  }, []);

  const [formData, setFormData] = useState({
    from_name: '',
    to_name: 'Billy Support Team',
    message: '',
    user_email: ''
  });
  const [status, setStatus] = useState<{
    type: 'success' | 'error' | null;
    message: string;
  }>({ type: null, message: '' });
  const [isLoading, setIsLoading] = useState(false);
  const [attachment, setAttachment] = useState<File | null>(null);

  const formatChatReport = () => {
    if (!messages?.length) return '';
    
    return messages
      .map(msg => {
        const time = msg.timestamp.toLocaleTimeString();
        const role = msg.role === 'assistant' ? 'Billy' : 'User';
        return `[${time}] ${role}: ${msg.content}`;
      })
      .join('\n\n');
  };

  const handleAutoFill = () => {
    const report = formatChatReport();
    setFormData(prev => ({
      ...prev,
      message: `Chat Transcript:\n\n${report}`
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const response = await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        formData,
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      );

      if (response.status === 200) {
        setStatus({
          type: 'success',
          message: 'Email sent successfully!'
        });
        onClose();
      }
    } catch (error) {
      setStatus({
        type: 'error',
        message: 'Failed to send email'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.size <= 5 * 1024 * 1024) { // 5MB limit
      setAttachment(file);
    } else {
      setStatus({
        type: 'error',
        message: 'File size should be less than 5MB'
      });
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file && file.size <= 5 * 1024 * 1024) {
      setAttachment(file);
    }
  };

  const removeAttachment = () => {
    setAttachment(null);
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="space-y-2">
        <div className="flex justify-between items-center">
          <CardTitle className="text-2xl font-bold">Contact Us</CardTitle>
          {messages && messages.length > 0 && (
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={handleAutoFill}
              className="flex items-center gap-2"
            >
              <Bot className="w-4 h-4" />
              Auto-fill Report
            </Button>
          )}
        </div>
        <p className="text-muted-foreground text-center">
          Send us a message and we'll get back to you as soon as possible.
        </p>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="from_name" className="text-sm font-medium">
              Your Name
            </label>
            <Input
              id="from_name"
              name="from_name"
              value={formData.from_name}
              onChange={handleChange}
              placeholder="Enter your name"
              required
              className="w-full"
            />
          </div>
          
          <div className="space-y-2">
            <label htmlFor="user_email" className="text-sm font-medium">
              Your Email
            </label>
            <Input
              id="user_email"
              name="user_email"
              type="email"
              value={formData.user_email}
              onChange={handleChange}
              placeholder="Enter your email"
              required
              className="w-full"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="message" className="text-sm font-medium">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Type your message here"
              required
              className="w-full min-h-[100px] p-2 border rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Attachment (optional)</label>
            <div
              className="border-2 border-dashed rounded-lg p-4 hover:border-indigo-500 transition-colors"
              onDragOver={(e) => e.preventDefault()}
              onDrop={handleDrop}
            >
              {!attachment ? (
                <div className="text-center">
                  <Upload className="w-8 h-8 mx-auto text-gray-400" />
                  <p className="mt-2 text-sm text-gray-500">
                    Drag and drop a file here, or
                    <label className="ml-1 text-indigo-600 hover:text-indigo-500 cursor-pointer">
                      browse
                      <input
                        type="file"
                        onChange={handleFileChange}
                        className="hidden"
                        accept=".pdf,.doc,.docx,.txt,.jpg,.jpeg,.png"
                      />
                    </label>
                  </p>
                  <p className="text-xs text-gray-400 mt-1">Max file size: 500kb</p>
                </div>
              ) : (
                <div className="flex items-center justify-between bg-gray-50 p-2 rounded">
                  <span className="text-sm truncate">{attachment.name}</span>
                  <button
                    type="button"
                    onClick={removeAttachment}
                    className="text-gray-500 hover:text-red-500"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>
          </div>

          {status.message && (
            <Alert variant={status.type === 'error' ? 'destructive' : 'default'}>
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{status.message}</AlertDescription>
            </Alert>
          )}

          <div className="flex justify-end space-x-2">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? (
                <>
                  <span className="animate-spin mr-2">⏳</span>
                  Sending...
                </>
              ) : (
                <>
                  <Send className="w-4 h-4 mr-2" />
                  Send Message
                </>
              )}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default EmailComponent;