import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, Send, Paperclip, User, Wrench, Settings } from 'lucide-react';
import { WorkshopCase, addChatMessage } from '../../data/mockData';
import { useAuth } from '../../context/AuthContext';
import SectionWrapper from './SectionWrapper';

interface ChatLogSectionProps {
  caseData: WorkshopCase;
  onUpdate: (data: Partial<WorkshopCase>) => void;
  isSectionComplete?: boolean;
}

const ChatLogSection: React.FC<ChatLogSectionProps> = ({
  caseData,
  onUpdate,
  isSectionComplete = false
}) => {
  const { user } = useAuth();
  const [newMessage, setNewMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isChatLogActive, setIsChatLogActive] = useState(caseData.isChatLogEnabled || false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  // Sync local state with case data when it changes
  useEffect(() => {
    setIsChatLogActive(caseData.isChatLogEnabled || false);
  }, [caseData.isChatLogEnabled]);

  // Calculate if there are new messages (messages from non-workshop users when chat is disabled)
  const hasNewMessages = !isChatLogActive && 
    caseData.chatLog.length > 0 && 
    caseData.chatLog.some(message => message.senderType !== 'workshop');

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInHours = (now.getTime() - date.getTime()) / (1000 * 60 * 60);

    if (diffInHours < 24) {
      return date.toLocaleTimeString('nb-NO', {
        hour: '2-digit',
        minute: '2-digit'
      });
    } else if (diffInHours < 168) { // Less than a week
      return date.toLocaleDateString('nb-NO', {
        weekday: 'short',
        hour: '2-digit',
        minute: '2-digit'
      });
    } else {
      return date.toLocaleDateString('nb-NO', {
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    }
  };

  const getSenderIcon = (senderType: string) => {
    switch (senderType) {
      case 'agent':
        return <User className="h-4 w-4" />;
      case 'workshop':
        return <Wrench className="h-4 w-4" />;
      case 'system':
        return <Settings className="h-4 w-4" />;
      default:
        return <User className="h-4 w-4" />;
    }
  };

  const getSenderColor = (senderType: string) => {
    switch (senderType) {
      case 'agent':
        return 'bg-blue-500 text-white';
      case 'workshop':
        return 'bg-green-500 text-white';
      case 'system':
        return 'bg-gray-500 text-white';
      default:
        return 'bg-gray-500 text-white';
    }
  };

  const getMessageAlignment = (senderType: string) => {
    // Messages from current user (workshop) align right, others align left
    return senderType === 'workshop' ? 'justify-end' : 'justify-start';
  };

  const getMessageBubbleColor = (senderType: string) => {
    switch (senderType) {
      case 'workshop':
        return 'bg-blue-600 text-white';
      case 'agent':
        return 'bg-gray-100 text-gray-900';
      case 'system':
        return 'bg-yellow-50 text-yellow-800 border border-yellow-200';
      default:
        return 'bg-gray-100 text-gray-900';
    }
  };

  const handleChatLogToggle = (enabled: boolean) => {
    setIsChatLogActive(enabled);
    onUpdate({
      isChatLogEnabled: enabled
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || isSubmitting) return;

    setIsSubmitting(true);
    
    try {
      // Add the message to the chat log
      const message = addChatMessage(
        caseData.id,
        newMessage.trim(),
        user?.name || 'Verkstedbruker',
        'workshop'
      );

      if (message) {
        // Update the local state
        const updatedChatLog = [...caseData.chatLog, message];
        onUpdate({
          chatLog: updatedChatLog
        });
      }

      setNewMessage('');
    } catch (error) {
      console.error('Failed to send message:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <SectionWrapper
      title="Communication Log"
      showStatusBadge={false}
      isSectionComplete={isSectionComplete}
    >
      <div className="space-y-4">
        {/* Chat Log Enable/Disable Checkbox */}
        <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
          <input
            type="checkbox"
            id="enableChatLog"
            checked={isChatLogActive}
            onChange={(e) => handleChatLogToggle(e.target.checked)}
            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
          />
          <label htmlFor="enableChatLog" className="text-sm font-medium text-gray-700">
             Show communication log
          </label>
          
          {/* New Message Notification */}
          {hasNewMessages && (
            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
              <span className="w-2 h-2 bg-red-500 rounded-full mr-1 animate-pulse"></span>
              New
            </span>
          )}
        </div>

        {/* Chat Content - Only show when active */}
        {isChatLogActive && (
          <>
            {/* Chat Messages Container */}
            <div 
              ref={chatContainerRef}
              className="h-96 overflow-y-auto border border-gray-200 rounded-lg p-4 bg-gray-50 space-y-4"
            >
              {caseData.chatLog.length === 0 ? (
                <div className="flex items-center justify-center h-full">
                  <div className="text-center">
                    <MessageSquare className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500">No messages yet. Start the conversation!</p>
                  </div>
                </div>
              ) : (
                <>
                  {caseData.chatLog.map((message) => (
                    <div key={message.id} className={`flex ${getMessageAlignment(message.senderType)}`}>
                      <div className="max-w-xs lg:max-w-md">
                        {/* Sender Info */}
                        <div className={`flex items-center mb-1 ${message.senderType === 'workshop' ? 'justify-end' : 'justify-start'}`}>
                          <div className={`flex items-center space-x-1 ${message.senderType === 'workshop' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                            <div className={`p-1 rounded-full ${getSenderColor(message.senderType)}`}>
                              {getSenderIcon(message.senderType)}
                            </div>
                            <span className="text-xs text-gray-600 font-medium">{message.sender}</span>
                            <span className="text-xs text-gray-400">{formatTimestamp(message.timestamp)}</span>
                          </div>
                        </div>
                        
                        {/* Message Bubble */}
                        <div className={`p-3 rounded-lg ${getMessageBubbleColor(message.senderType)} ${
                          message.senderType === 'workshop' ? 'rounded-br-sm' : 'rounded-bl-sm'
                        }`}>
                          <p className="text-sm whitespace-pre-wrap">{message.message}</p>
                          
                          {/* Attachments */}
                          {message.attachments && message.attachments.length > 0 && (
                            <div className="mt-2 space-y-1">
                              {message.attachments.map((attachment) => (
                                
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                  <div ref={messagesEndRef} />
                </>
              )}
            </div>

            {/* Message Input */}
            <form onSubmit={handleSubmit} className="flex space-x-2">
              <div className="flex-1">
                <textarea
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Type your message..."
                  rows={2}
                  className="block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:border-transparent focus:ring-2 focus:ring-blue-500 sm:text-sm resize-none"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      handleSubmit(e);
                    }
                  }}
                />
              </div> 
              
              <div className="flex flex-col space-y-2">
          
                
                <button
                  type="submit"
                  disabled={!newMessage.trim() || isSubmitting}
                  className="inline-flex items-center p-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-gray-300 disabled:cursor-not-allowed"
                >
                  <Send className="h-4 w-4" />
                </button>
              </div>
            </form>

         
           
          </>
        )}
      </div>
    </SectionWrapper>
  );
};

export default ChatLogSection;