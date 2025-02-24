import React from 'react';
import { motion } from 'framer-motion';
import { Bot, User } from 'lucide-react';

interface ChatMessageProps {
  message: {
    role: 'user' | 'assistant';
    content: string;
  };
  quickReplies?: string[];
  onQuickReplyClick?: (reply: string) => void;
}

export const ChatMessage: React.FC<ChatMessageProps> = ({ 
  message, 
  quickReplies,
  onQuickReplyClick 
}) => {
  const isUser = message.role === 'user';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4`}
    >
      <div className={`flex ${isUser ? 'flex-row-reverse' : 'flex-row'} items-start max-w-[80%]`}>
        <div className={`flex-shrink-0 ${isUser ? 'ml-3' : 'mr-3'}`}>
          {isUser ? (
            <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center">
              <User className="w-5 h-5 text-white" />
            </div>
          ) : (
            <div className="w-8 h-8 rounded-full bg-purple-500 flex items-center justify-center">
              <Bot className="w-5 h-5 text-white" />
            </div>
          )}
        </div>
        <div>
          <div
            className={`rounded-2xl px-4 py-2 ${
              isUser
                ? 'bg-blue-500 text-white'
                : 'bg-gray-700 text-gray-100'
            }`}
          >
            <p className="text-sm">{message.content}</p>
          </div>
          {!isUser && quickReplies && quickReplies.length > 0 && (
            <div className="mt-2 flex flex-wrap gap-2">
              {quickReplies.map((reply) => (
                <button
                  key={reply}
                  onClick={() => onQuickReplyClick?.(reply)}
                  className="text-sm px-3 py-1 rounded-full bg-gray-700 text-gray-200 hover:bg-gray-600 transition-colors"
                >
                  {reply}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};