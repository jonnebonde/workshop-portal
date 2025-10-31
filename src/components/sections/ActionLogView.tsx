import React from 'react';
import {
  Settings,
  User,
  CheckCircle2
} from 'lucide-react';
import { ActionLogEntry } from '../../data/mockData';

interface ActionLogViewProps {
  actionLog: ActionLogEntry[];
}

const ActionLogView: React.FC<ActionLogViewProps> = ({ actionLog }) => {
  const getActorIcon = (actorType: ActionLogEntry['actorType']) => {
    switch (actorType) {
      case 'system':
        return <Settings className="h-4 w-4" />;
      case 'agent':
        return <User className="h-4 w-4" />;
      case 'workshop':
        return <CheckCircle2 className="h-5 w-5" />;
      default:
        return <User className="h-4 w-4" />;
    }
  };

  const getActorIconColor = (actorType: ActionLogEntry['actorType']) => {
    switch (actorType) {
      case 'system':
        return 'bg-gray-400 text-white';
      case 'agent':
        return 'bg-blue-500 text-white';
      case 'workshop':
        return 'bg-green-500 text-white';
      default:
        return 'bg-gray-400 text-white';
    }
  };

  const getMessageBubbleColor = (actorType: ActionLogEntry['actorType']) => {
    switch (actorType) {
      case 'system':
        return 'bg-yellow-50 text-yellow-900 border border-yellow-200';
      case 'agent':
        return 'bg-gray-100 text-gray-900';
      case 'workshop':
        return 'bg-blue-600 text-white';
      default:
        return 'bg-gray-100 text-gray-900';
    }
  };

  const getMessageAlignment = (actorType: ActionLogEntry['actorType']) => {
    return actorType === 'workshop' ? 'justify-end' : 'justify-start';
  };

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    const day = date.getDate();
    const month = date.toLocaleDateString('nb-NO', { month: 'short' });
    const time = date.toLocaleTimeString('nb-NO', {
      hour: '2-digit',
      minute: '2-digit'
    });

    return `${day}. ${month}, ${time}`;
  };

  if (actionLog.length === 0) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <Settings className="h-12 w-12 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500">No activity logged yet</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-96 overflow-y-auto bg-white p-4 space-y-4">
      {actionLog.map((entry) => (
        <div
          key={entry.id}
          className={`flex ${getMessageAlignment(entry.actorType)}`}
        >
          <div className="max-w-2xl">
            {/* Sender Info */}
            <div className={`flex items-center mb-1 gap-2 ${entry.actorType === 'workshop' ? 'justify-end' : 'justify-start'}`}>
              <div className={`p-1.5 rounded-full ${getActorIconColor(entry.actorType)}`}>
                {getActorIcon(entry.actorType)}
              </div>
              <span className="text-sm text-gray-700 font-medium">{entry.actor}</span>
              <span className="text-xs text-gray-500">{formatTimestamp(entry.timestamp)}</span>
            </div>

            {/* Message Bubble */}
            <div className={`px-4 py-2.5 rounded-lg ${getMessageBubbleColor(entry.actorType)}`}>
              <p className="text-sm">{entry.description}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ActionLogView;
