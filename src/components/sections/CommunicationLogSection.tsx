import React, { useState, useEffect, useRef } from 'react';
import { Send } from 'lucide-react';
import { WorkshopCase, ActionLogEntry } from '../../data/mockData';
import SectionWrapper from './SectionWrapper';
import ActionLogView from './ActionLogView';
import { useAuth } from '../../context/AuthContext';

interface CommunicationLogSectionProps {
  caseData: WorkshopCase;
  onUpdate: (data: Partial<WorkshopCase>) => void;
  isSectionComplete?: boolean;
}

const CommunicationLogSection: React.FC<CommunicationLogSectionProps> = ({
  caseData,
  onUpdate,
  isSectionComplete = false
}) => {
  const { user } = useAuth();
  const [newMessage, setNewMessage] = useState('');
  const sectionRef = useRef<HTMLDivElement>(null);
  const [hasMarkedAsViewed, setHasMarkedAsViewed] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasMarkedAsViewed) {
            onUpdate({
              lastLogViewedAt: new Date().toISOString()
            });
            setHasMarkedAsViewed(true);
          }
        });
      },
      {
        threshold: 0.2,
        rootMargin: '0px'
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, [hasMarkedAsViewed, onUpdate]);

  useEffect(() => {
    setHasMarkedAsViewed(false);
  }, [caseData.id]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    const newEntry: ActionLogEntry = {
      id: `log-${Date.now()}`,
      actionType: 'other',
      actor: user?.name || 'Workshop User',
      actorType: 'workshop',
      description: newMessage.trim(),
      timestamp: new Date().toISOString(),
      metadata: {}
    };

    const updatedActionLog = [...caseData.actionLog, newEntry];
    onUpdate({
      actionLog: updatedActionLog
    });

    setNewMessage('');
  };

  return (
    <SectionWrapper
      title="Log"
      showStatusBadge={false}
      isSectionComplete={isSectionComplete}
    >
      <div ref={sectionRef} className="space-y-4">
        <ActionLogView actionLog={caseData.actionLog} />

        {/* Message Input */}
        <form onSubmit={handleSubmit} className="border-t border-gray-200 pt-4">
          <div className="relative">
            <textarea
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type your message..."
              rows={2}
              className="block w-full px-4 py-3 pr-24 border border-gray-300 rounded-lg shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-sm resize-none"
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSubmit(e);
                }
              }}
            />
            <div className="absolute right-2 bottom-2">
              <button
                type="submit"
                disabled={!newMessage.trim()}
                className="p-2 text-blue-600 hover:text-blue-700 disabled:text-gray-300 disabled:cursor-not-allowed transition-colors"
                title="Send message"
              >
                <Send className="h-5 w-5" />
              </button>
            </div>
          </div>
        </form>
      </div>
    </SectionWrapper>
  );
};

export default CommunicationLogSection;
