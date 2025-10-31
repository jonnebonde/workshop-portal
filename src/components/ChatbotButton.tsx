import React from 'react';
import { MessageCircle, X } from 'lucide-react';

interface ChatbotButtonProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const ChatbotButton: React.FC<ChatbotButtonProps> = ({ isOpen, setIsOpen }) => {

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {isOpen && (
        <div className="absolute bottom-16 right-0 w-96 bg-white rounded-lg shadow-xl border border-gray-200 overflow-hidden">
          <div className="p-4 bg-blue-600 text-white flex justify-between items-center">
            <h3 className="font-medium">Ira</h3>
            <button 
              onClick={() => setIsOpen(false)}
              className="text-white hover:text-gray-200"
            >
              <X size={20} />
            </button>
          </div>
          <div className="h-96 p-4 bg-gray-50">
            <div className="flex flex-col space-y-4">
              <div className="flex items-start">
                <div className="bg-blue-600 text-white rounded-lg py-2 px-4 max-w-xs">
                  Hello! How can I help you today?
                </div>
              </div>
            </div>
          </div>
          <div className="p-4 border-t border-gray-200">
            <div className="flex space-x-2">
              <input
                type="text"
                placeholder="Type your message..."
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                Send
              </button>
            </div>
          </div>
        </div>
      )}
      
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-blue-600 text-white rounded-full p-3 shadow-lg hover:bg-blue-700 transition-colors"
      >
        <div className="flex">
             <MessageCircle size={24} /><span>IRA Support</span>
        </div>
   
      </button>
    </div>
  );
};

export default ChatbotButton;