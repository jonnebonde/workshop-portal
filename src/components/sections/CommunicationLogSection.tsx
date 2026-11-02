import { useState, useEffect, useRef } from 'react';
import type { FormEvent } from 'react';
import { Send } from 'lucide-react';
import type { WorkshopCase } from '../../data/mockData';
import SectionWrapper from './SectionWrapper';
import ActionLogView from './ActionLogView';
import { useAuth } from '../../context/AuthContext';
import { createCaseComment, splitCaseCommunication } from '../../utils/caseCommunication';

interface CommunicationLogSectionProps {
  caseData: WorkshopCase;
  onUpdate: (data: Partial<WorkshopCase>) => void;
}

function useMarkViewed(caseId: string, field: 'lastLogViewedAt' | 'lastCommentsViewedAt', onUpdate: CommunicationLogSectionProps['onUpdate']) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    let marked = false;
    const observer = new IntersectionObserver(entries => {
      if (!marked && entries.some(entry => entry.isIntersecting)) {
        marked = true;
        onUpdate({ [field]: new Date().toISOString() });
      }
    }, { threshold: 0.2 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [caseId, field, onUpdate]);
  return ref;
}

export default function CommunicationLogSection({ caseData, onUpdate }: CommunicationLogSectionProps) {
  const { user } = useAuth();
  const [newMessage, setNewMessage] = useState('');
  const commentsRef = useMarkViewed(caseData.id, 'lastCommentsViewedAt', onUpdate);
  const activityRef = useMarkViewed(caseData.id, 'lastLogViewedAt', onUpdate);
  const { comments, activity } = splitCaseCommunication(caseData.actionLog);

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    const comment = createCaseComment(newMessage, user?.name || 'Workshop User');
    if (!comment) return;
    onUpdate({ actionLog: [...caseData.actionLog, comment] });
    setNewMessage('');
  }

  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
      <div id="comments" ref={commentsRef}>
        <SectionWrapper title="Comments" showStatusBadge={false}>
          <ActionLogView actionLog={comments} emptyMessage="No comments yet" />
          <form onSubmit={handleSubmit} className="border-t border-gray-200 pt-4">
            <div className="relative">
              <textarea aria-label="Comment" value={newMessage} onChange={event => setNewMessage(event.target.value)}
                placeholder="Type your message..." rows={2}
                className="block w-full resize-none rounded-lg border border-gray-300 px-4 py-3 pr-16 text-sm shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                onKeyDown={event => {
                  if (event.key === 'Enter' && !event.shiftKey && !event.nativeEvent.isComposing) handleSubmit(event);
                }} />
              <button type="submit" disabled={!newMessage.trim()} aria-label="Send message" title="Send message"
                className="absolute bottom-2 right-2 p-2 text-blue-600 transition-colors hover:text-blue-700 disabled:cursor-not-allowed disabled:text-gray-300">
                <Send className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>
          </form>
        </SectionWrapper>
      </div>
      <div id="communication-log" ref={activityRef}>
        <SectionWrapper title="Activity log" showStatusBadge={false}>
          <ActionLogView actionLog={activity} />
        </SectionWrapper>
      </div>
    </div>
  );
}
