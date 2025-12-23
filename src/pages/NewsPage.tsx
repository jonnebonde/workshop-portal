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

    publishedAt: '2024-01-15T10:00:00Z',


  },
  {
    id: '2',
    title: 'Workshop Integration Updates',
    summary: 'Enhanced integration with workshop management systems for better case tracking.',
    content: 'We have improved our integration capabilities with various workshop management systems. This includes better real-time synchronization, enhanced data mapping, and improved error handling.',
  
    publishedAt: '2024-01-12T14:30:00Z',

  },
  {
    id: '3',
    title: 'Scheduled Maintenance - January 20th',
    summary: 'System maintenance scheduled for January 20th from 02:00 to 04:00 CET.',
    content: 'We will be performing scheduled maintenance on January 20th from 02:00 to 04:00 CET. During this time, the system may be temporarily unavailable. We apologize for any inconvenience.',
  
    publishedAt: '2024-01-10T09:00:00Z',


  },
  {
    id: '4',
    title: 'New KPI Dashboard Features',
    summary: 'Added new analytics and reporting features to the KPI dashboard.',
    content: 'The KPI dashboard now includes advanced filtering options, custom date ranges, and exportable reports. These features will help workshop managers get better insights into their operations.',
 
    publishedAt: '2024-01-08T11:15:00Z',
  },
  {
    id: '5',
    title: 'Mobile App Beta Testing',
    summary: 'Join our beta testing program for the new mobile application.',
    content: 'We are looking for workshop partners to participate in beta testing of our new mobile application. The app will allow technicians to update case status, upload images, and communicate directly from their mobile devices.',

    publishedAt: '2024-01-05T16:45:00Z',

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

  return (
    <div className="space-y-8 px-6 py-6 bg-background">
      {/* Header */}
      <div className="space-y-2">
       
        <h1 className="text-3xl font-bold text-brand-dark">News</h1>
        <p className="text-gray-700 max-w-3xl">Latest updates and announcements related to the platform and workshop operations</p>
      </div>

      {/* News List */}
      <div className="space-y-6">
        {mockNews.map((newsItem) => (
          <article
            key={newsItem.id}
            className="border-blue-500 bg-white shadow-sm hover:shadow-md p-6 rounded-lg" >
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-2">
                  <h2 className="text-xl font-semibold text-brand-dark">
                    {newsItem.title}
                  </h2>
               
                </div>

                <div className="flex items-center space-x-4 text-sm text-gray-600 mb-3">
                  <div className="flex items-center">
                    Published: {formatDate(newsItem.publishedAt)}
                  </div>
                
                </div>
              </div>
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
                    className="inline-flex items-center text-brand-primary hover:text-blue-700 text-sm font-semibold"
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
          <h3 className="text-lg font-medium text-brand-dark mb-2">No news available</h3>
          <p className="text-gray-500">Check back later for updates and announcements.</p>
        </div>
      )}
    </div>
  );
};

export default NewsPage;
