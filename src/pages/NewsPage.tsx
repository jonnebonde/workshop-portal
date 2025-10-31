import React from 'react';
import { Newspaper, Calendar, User, ExternalLink } from 'lucide-react';

interface NewsItem {
  id: string;
  title: string;
  summary: string;
  content: string;
  author: string;
  publishedAt: string;
  category: 'platform' | 'workshop' | 'update' | 'announcement';
  isImportant?: boolean;
  externalLink?: string;
}

const mockNews: NewsItem[] = [
  {
    id: '1',
    title: 'New Invoice Review System Released',
    summary: 'We have launched an improved invoice review system with automated OCR processing.',
    content: 'The new invoice review system includes automated OCR processing, faster approval workflows, and enhanced error detection. This will significantly reduce the time needed for invoice processing and improve accuracy.',
    author: 'Platform Team',
    publishedAt: '2024-01-15T10:00:00Z',
    category: 'platform',
    isImportant: true
  },
  {
    id: '2',
    title: 'Workshop Integration Updates',
    summary: 'Enhanced integration with workshop management systems for better case tracking.',
    content: 'We have improved our integration capabilities with various workshop management systems. This includes better real-time synchronization, enhanced data mapping, and improved error handling.',
    author: 'Development Team',
    publishedAt: '2024-01-12T14:30:00Z',
    category: 'workshop'
  },
  {
    id: '3',
    title: 'Scheduled Maintenance - January 20th',
    summary: 'System maintenance scheduled for January 20th from 02:00 to 04:00 CET.',
    content: 'We will be performing scheduled maintenance on January 20th from 02:00 to 04:00 CET. During this time, the system may be temporarily unavailable. We apologize for any inconvenience.',
    author: 'Operations Team',
    publishedAt: '2024-01-10T09:00:00Z',
    category: 'announcement',
    isImportant: true
  },
  {
    id: '4',
    title: 'New KPI Dashboard Features',
    summary: 'Added new analytics and reporting features to the KPI dashboard.',
    content: 'The KPI dashboard now includes advanced filtering options, custom date ranges, and exportable reports. These features will help workshop managers get better insights into their operations.',
    author: 'Product Team',
    publishedAt: '2024-01-08T11:15:00Z',
    category: 'update'
  },
  {
    id: '5',
    title: 'Mobile App Beta Testing',
    summary: 'Join our beta testing program for the new mobile application.',
    content: 'We are looking for workshop partners to participate in beta testing of our new mobile application. The app will allow technicians to update case status, upload images, and communicate directly from their mobile devices.',
    author: 'Mobile Team',
    publishedAt: '2024-01-05T16:45:00Z',
    category: 'announcement',
    externalLink: 'https://example.com/beta-signup'
  }
];

const NewsPage: React.FC = () => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('nb-NO', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'platform':
        return 'bg-blue-100 text-blue-800';
      case 'workshop':
        return 'bg-green-100 text-green-800';
      case 'update':
        return 'bg-purple-100 text-purple-800';
      case 'announcement':
        return 'bg-orange-100 text-orange-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getCategoryLabel = (category: string) => {
    switch (category) {
      case 'platform':
        return 'Platform';
      case 'workshop':
        return 'Workshop';
      case 'update':
        return 'Update';
      case 'announcement':
        return 'Announcement';
      default:
        return category;
    }
  };

  return (
    <div className="space-y-6 px-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">News</h1>
        <p className="text-gray-600">Latest updates and announcements related to the platform and workshop operations</p>
      </div>

      {/* News List */}
      <div className="space-y-6">
        {mockNews.map((newsItem) => (
          <article 
            key={newsItem.id} 
            className={`bg-white rounded-lg shadow-sm p-6 border border-gray-100 ${
              newsItem.isImportant ? 'ring-2 ring-orange-200 bg-orange-50' : ''
            }`}
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-2">
                  <h2 className="text-xl font-semibold text-gray-900">
                    {newsItem.title}
                  </h2>
                  {newsItem.isImportant && (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                      Important
                    </span>
                  )}
                </div>
                
                <div className="flex items-center space-x-4 text-sm text-gray-500 mb-3">
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-1" />
                    {formatDate(newsItem.publishedAt)}
                  </div>
                  <div className="flex items-center">
                    <User className="h-4 w-4 mr-1" />
                    {newsItem.author}
                  </div>
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getCategoryColor(newsItem.category)}`}>
                    {getCategoryLabel(newsItem.category)}
                  </span>
                </div>
              </div>
              
              <Newspaper className="h-6 w-6 text-gray-400 flex-shrink-0 ml-4" />
            </div>

            <div className="space-y-3">
              <p className="text-gray-700 font-medium">
                {newsItem.summary}
              </p>
              
              <p className="text-gray-600 leading-relaxed">
                {newsItem.content}
              </p>

              {newsItem.externalLink && (
                <div className="pt-3 border-t border-gray-200">
                  <a 
                    href={newsItem.externalLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-blue-600 hover:text-blue-800 text-sm font-medium"
                  >
                    Learn more
                    <ExternalLink className="h-4 w-4 ml-1" />
                  </a>
                </div>
              )}
            </div>
          </article>
        ))}
      </div>

      {/* Empty State (if no news) */}
      {mockNews.length === 0 && (
        <div className="text-center py-12">
          <Newspaper className="h-12 w-12 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No news available</h3>
          <p className="text-gray-500">Check back later for updates and announcements.</p>
        </div>
      )}
    </div>
  );
};

export default NewsPage;